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

// CONSTANTS
const DEFAULT_START_TIME = 180;
const DEFAULT_CATEGORY_NUMBER = 12;
const ALPHABET = "ABCDEFGHIJKLMNOPRSTW";
const CATEGORIES = STANDARD_CATEGORIES.slice(0).concat(GARY_CATEGORIES.slice(0));
let audio = document.getElementById("audio");
let timer = document.getElementById("timer");

// DATA TYPE METHODS
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
  // console.log("Plucked item", index, "of", this.length);
  const selection = this[index];
  this.splice(index, 1);
  return selection;
}

// CLASSES
class Countdown {
  constructor(seconds = DEFAULT_START_TIME) {
    this.secs = seconds;
    this.id;
    timer.innerHTML = this.secs.toTimeString();
  }

  start() {
    clearInterval(this.id);
    this.secs = 3;
    this.id = setInterval(this.tick, 1000);
  }

  tick() {
    this.secs--;
    if (this.secs < 0) {
      clearInterval(this.id);
      return;
    }
    if (this.secs == 0) {
      audio.play();
    }
    timer.innerHTML = this.secs.toTimeString();
  }
}

class Categories {
  constructor() {
    this.all = CATEGORIES.slice(0);
    console.log("Created Categories object with " + this.all.length + " categories.")
  }

  select(n = DEFAULT_CATEGORY_NUMBER) {
    if (n > this.all.length) {
      n = this.all.length;
    }
    let master = this.all.slice(0);
    let list = [];
    for (let i = 0; i < n; i++) {
      list.push(master.pluck());
    }
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

// FUNCTIONS
let secs = DEFAULT_START_TIME;
let id;
timer.innerHTML = secs.toTimeString();

function start() {
  clearInterval(id);
  secs = DEFAULT_START_TIME;
  id = setInterval(tick, 1000);
}

function tick() {
  secs--;
  if (secs < 0) {
     clearInterval(id);
     return;
  }
  if (secs == 0) {
    audio.play();
  }
  timer.innerHTML = secs.toTimeString();
}

// UI FUNCTIONS
function generateLetter() {
  document.getElementById("letter").innerHTML = ALPHABET.random();
}

function generateCategories() {
  new Categories().publish();
}

function startTimer() {
  new Countdown().start();
}

// MAIN
generateLetter();
generateCategories();
