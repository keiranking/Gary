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
const START_TIME = 180;
const ALPHABET = "ABCDEFGHIJKLMNOPRSTW";
let audio = document.getElementById("audio");
const CATEGORIES = [
  "Things at the beach",
  "Jamaican towns and cities",
  "Items in a fridge",
  "Types of drinks",
  "Foreign cities"
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
  console.log(this.length);
  const index = Math.floor(Math.random() * this.length);
  console.log(index);
  const selection = this[index];
  delete this[index];
  return selection;
}

class Countdown {
  constructor(time = START_TIME) {
    this.time = time;
    this.counter;
    console.log("Created " + this.time + "s countdown.");
  }

  start() {
    clearInterval(this.counter);
    // this.time = START_TIME;
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

  select(n = 12) {
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
}

l = new Categories();
console.log(l.select(2));

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
