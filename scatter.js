// Gary
// ------------------------------------------------------------------------
// Copyright 2017 Keiran King

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// (https://www.apache.org/licenses/LICENSE-2.0)

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ------------------------------------------------------------------------

// let count;
// let counter;
const DEFAULT_START_TIME = 180;
const DEFAULT_CATEGORY_NUMBER = 12;
const ALPHABET = "ABCDEFGHIJKLMNOPRSTW";
let audio = document.getElementById("audio");
const CATEGORIES = [
  "A boy's name",
  "Jamaican towns/cities",
  "Things that are cold",
  "School supplies",
  "Pro sports teams",
  "Insects",
  "Breakfast foods",
  "Furniture",
  "TV shows",
  "Things found in the ocean",
  "Jamaican personalities",
  "Product names",

  "Vegetables",
  "States",
  "Things you throw away",
  "Occupations",
  "Appliances",
  "Cartoon characters",
  "Types of drink",
  "Musical groups",
  "Store names",
  "Things at a cricket game",
  "Trees",
  "Personality traits",

  "Articles of clothing",
  "Desserts",
  "Car parts",
  "Things found on a map",
  "Athletes",
  "4-letter words",
  "Items in a refrigerator",
  "Farm animals",
  "Street names",
  "Things at the beach",
  "Colors",
  "Tools",

  "Things at a basketball game",
  "Things at a football game",
  "3-letter words",
  "9-letter words",
  "Wild animals",
  "American cities"
];

Number.prototype.toTimeString = function() {
  let time = parseInt(this, 10);
  let m = Math.floor(time / 60);
  let ss = time - (m * 60);
  ss = ss < 10 ? "0" + ss : ss;
  return m + ":" + ss;
}

String.prototype.random = function() { // returns random character
  return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.pluck = function() { // returns random item, which is deleted from array
  const index = Math.floor(Math.random() * this.length);
  console.log("Plucked item", index, "of", this.length);
  const selection = this[index];
  this.splice(index, 1);
  return selection;
}

class Countdown {
  constructor(time = DEFAULT_START_TIME) {
    this.time = time;
    this.counter;
    console.log("Created " + this.time + "s countdown.");
  }

  start() {
    clearInterval(this.counter);
    // this.time = DEFAULT_START_TIME;
    console.log("alpha", this.time, this.counter);
    this.counter = setInterval(this.timer, 1000);
    console.log("bravo", this.time, this.counter);
  }

  timer() {
    console.log("charlie", this.time, this.counter);
    this.time--;
    console.log("delta", this.time, this.counter);
    if (this.time < 0) {
      clearInterval(this.counter);
      return;
    }
    if (this.time == 0) {
      audio.play();
    }
    document.getElementById("timer").innerHTML = this.time.toTimeString();
  }
}

c = new Countdown();

function start() {
  c.start();
}

class Categories {
  constructor() {
    this.all = CATEGORIES;
  }

  select(n = DEFAULT_CATEGORY_NUMBER) {
    if (n > this.all.length) {
      n = this.all.length;
    }
    let master = this.all;
    let list = [];
    for (let i = 0; i < n; i++) {
      list.push(master.pluck());
    }
    // console.log("Categories:", list);
    return list;
  }

  publish(n = DEFAULT_CATEGORY_NUMBER) {
    let catDiv = document.getElementById("categories");
    catDiv.innerHTML = "";
    const cats = this.select(n);
    let ol = document.createElement("OL");
    for(let i = 0; i < n; i++) {
      let li = document.createElement("LI");
      li.innerHTML = cats[i];
      ol.appendChild(li);
    }
    catDiv.appendChild(ol);
  }
}

l = new Categories();
l.publish();

// function start() {
//   clearInterval(counter);
//   count = 3;
//   counter = setInterval(timer, 1000);
// }
//
// function timer()
// {
//   count--;
//   if (count < 0)
//   {
//      clearInterval(counter);
//      return;
//   }
//   if (count == 0) {
//     audio.play();
//   }
//   document.getElementById("timer").innerHTML = count.toTime();
// }

function generateLetter() {
  document.getElementById("letter").innerHTML = ALPHABET.random();
}
