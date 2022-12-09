const fs = require("fs");

// số cot
const cols = 5;
//số chữ trong hàng
const length = 5;

// 1 ~ 200Mb, 5 ~ 1Gb, 0,01 ~ 2Mb
const capacity = 1;

// dấu phân cột
const characters = String.fromCharCode(9);

const items = ["a", "b", "c", "e", "t", "h", "w"];
const itemsss = [
  "Long",
  "established",
  "fact",
  "that",
  "asss",
  "reader",
  "will",
  "Bee",
  "Distracted",
  "Ly",
  "The",
  "Readable",
  "Content",
  "Ofsss",
  "aAAA",
  "Page",
  "When",
  "Looking",
  "Pt",
  "AAts",
  "Layout",
];

function randomName() {
  // itemsss.split(" ");
  return itemsss[Math.floor(Math.random() * itemsss.length)];
}

function randomChar() {
  return String.fromCharCode(Math.floor(Math.random() * (123 - 33) + 33));
}

function randomCharInList() {
  return items[Math.floor(Math.random() * items.length)];
}

function randomChar() {
  return String.fromCharCode(Math.floor(Math.random() * (123 - 33) + 33));
}

function randomDate(start, end) {
  console.log(start, end)
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomInRange(min = 5000, max = 10000) {
  return Math.random() < 0.5
    ? (1 - Math.random()) * (max - min) + min
    : Math.random() * (max - min) + min;
}

function randomDateAAA(date1, date2){
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    if( date1>date2){
        return new Date(randomValueBetween(date2,date1)).toLocaleDateString()   
    } else{
        return new Date(randomValueBetween(date1, date2)).toLocaleDateString()  

    }
}

function time() {
  hrs = Math.round(Math.random() * 24);
  mins = Math.round(Math.random() * 60);    
  var hFormat = (hrs<10 ? "0" : "");
  var mFormat = (mins<10 ? "0" : "");
  var amPm = (hrs<12 ? "AM" : "PM");
  var is12 = (hrs % 12 === 0);

  return amPm === "AM" && !is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
                : "AM" && is12  ? String(12 + ":" +mFormat+mins+ " " +amPm)
                : is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
                : String(hFormat+(hrs-12)+ ":" +mFormat+mins+ " " +amPm);

}

// random string
// function randomString (length) {
//   let string = '';
//   for (let i = 0; i < length; i++) {
//     string += randomCharInList();
//   }
//   return string;
// }

function randomString(length) {
  let string = "";
  if (length == 0) {
    return (string = randomName());
  }
  if (length == 1) {
    return (string = Math.floor(Math.random() * 101));
  }
  if (length == 2) {
    return (string = time());
  }
  if (length == 3) {
    return (string = randomInRange());
  }
  if (length == 4) {
    return (string = randomDateAAA('02/13/2013', '01/01/2000'));
  }
  if (length == 5) {
    return (string = 10000);
  }
}

function randomRow() {
  const cells = [];
  for (let i = 0; i < cols; i++) {
    cells.push(randomString(i));
  }
  return cells.join(",") + "\n";
}

async function writeRow(stream) {
  return new Promise((resolve, reject) => {
    stream.write(randomRow(), "utf8", () => resolve());
  });
}

async function createCSVs(sizes) {
  const stream = fs.createWriteStream(`dummy${Date.now()}.csv`);
  for (let i = 0; i < sizes; i++) {
    await writeRow(stream);
  }
  stream.end();
}

createCSVs(capacity * 10);

// node genthcsv.js
