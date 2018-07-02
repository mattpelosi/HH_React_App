const request = require("request");
const cheerio = require("cheerio");
const Nightmare = require("nightmare");
// const nightmare = Nightmare({ show: true });
const nightmare = Nightmare();
const mongodb = require("./mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
  colorScraper: colorScraper,
  insert: insert,
  read: read
};

const colorNames = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Brown",
  "Gray"
];

function colorScraper() {
  return new Promise((resolve, reject) => {
    let url = "https://www.w3schools.com/colors/colors_picker.asp";
    nightmare
      .goto(url)
      .evaluate(function(colorNames) {
        //--------------- Select and Store ----------------------
        return colorNames.reduce(function(colorGroup, color) {
          document.getElementById("entercolorDIV").children[0].value = color;
          document.getElementById("entercolorDIV").children[1].click();
          const colorTable = document.querySelector("#lumtopcontainer tbody")
            .children;
          colorArr = Array.from(colorTable);
          //-------------- Reduce Color Table to object  ----------------
          const colorObj = colorArr.reduce(function(list, shade) {
            if (shade.firstChild.innerText !== "") {
              list.push({
                lightness: shade.firstChild.innerText,
                hexCode: shade.lastChild.innerText
              });
            }
            return list;
          }, []);
          //---------------------------------------------------
          colorGroup[color] = colorObj;
          return colorGroup;
        }, {});
      }, colorNames) 
      .then(result => {
        return resolve(result);
      });
  });
}

function insert(data) {
  return conn
    .db()
    .collection("colors")
    .insert(data)
    .then(result => result.insertedIds[0].toString());
}

function read() {
  return conn
    .db()
    .collection("colors")
    .find()
    .next()
    .then(result => result);
}
