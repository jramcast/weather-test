const fs = require('fs');
const moment = require('moment');
const download = require('download');

// Example: We need to download from:
// https://archive.panoramablick.com/archive/29296/2016/07/01/00/00.jpg
// to
// https://archive.panoramablick.com/archive/29296/2016/07/16/16/10.jpg

const moments = generateMomentsFromBeginingOfMonth();
for (eachMoment of moments) {
  downloadImageFor(eachMoment);
}

function *generateMomentsFromBeginingOfMonth() {
  const now = moment();
  const nowIsGreaterThan = date => now.diff(date) > 0;
  const firstMomentOfMonth = moment().date(1).hour(00).minutes(00);
  const currentMoment = firstMomentOfMonth;
  while (nowIsGreaterThan(currentMoment)) {
    yield currentMoment.clone();
    currentMoment.add(10, 'minutes');
  }
}

function downloadImageFor(momentDate) {
  const path = momentDate.format('YYYY/MM/DD/HH/mm.jpg');
  const url = `https://archive.panoramablick.com/archive/29296/${path}`;
  download(url).then(data => {
    const destination = `images/${path.replace(/\//g,'-')}`;
    fs.writeFileSync(destination, data);
    console.log('Downloaded' + destination);
  });
}
