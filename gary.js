// Gary
// Copyright 2017 Keiran King

// LICENSE --------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// (https://www.apache.org/licenses/LICENSE-2.0)

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// GLOBAL CONSTANTS -----------------------------------------------------------
const ROUND_DURATION = 180;
const WARNING_TIME = 15;
const RESET_DELAY = 3;
const NO_OF_CATEGORIES = 12;
const ALPHABET = "ABCDEFGHIJKLMNOPRSTW";
const CATEGORIES = STANDARD_CATEGORIES.concat(NEW_CATEGORIES);

// GLOBAL DOM VARIABLES -------------------------------------------------------
let audio = document.getElementById("audio");
let timer = document.getElementById("timer");
let categories = document.getElementById("categories");
let card = document.getElementById("card");
let letter = document.getElementById("letter");
let note = null;

// DATA TYPE FUNCTIONS --------------------------------------------------------
Number.prototype.toTimeString = function() { // converts seconds to MM:SS string
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

// CLASSES --------------------------------------------------------------------
class Card {
  constructor() {
    this.letter = ALPHABET.random();
    this.list = this.select();
    console.log("New card.");
  }

  select(n = NO_OF_CATEGORIES) {
    if (n > CATEGORIES.length) {
      n = CATEGORIES.length;
    }
    let master = CATEGORIES.slice(0);
    let list = [];
    for (let i = 0; i < n; i++) {
      list.push(master.pluck());
    }
    return list;
  }

  publish() {
    categories.innerHTML = "";
    let ol = document.createElement("OL");
    for (let i = 0; i < this.list.length; i++) {
      let li = document.createElement("LI");
      li.innerHTML = this.list[i];
      if (i == this.list.length - 1) {
        li.classList.add("last");
      }
      ol.appendChild(li);
    }
    categories.appendChild(ol);
    if (card.classList.contains("tilt-left")) {
      card.classList.remove("tilt-left");
      card.classList.add("tilt-right");
    } else {
      card.classList.remove("tilt-right");
      card.classList.add("tilt-left");
    }
    letter.innerHTML = this.letter;
    // console.log("Card published.");
  }
}

class Timer {
  constructor(seconds = ROUND_DURATION) {
    this.secs = seconds;
    this.id = null;
  }

  toggle() {
    clearInterval(this.id);
    if (this.id) {
      console.log("Timer paused.");
      this.id = null;
      return;
    }
    console.log("Timer on.");
    this.id = setInterval(this.tick.bind(this), 1000); // setInterval inside a class needs .bind(this) to work
  }

  reset(delay = RESET_DELAY) {
    clearInterval(this.id);
    setTimeout(function() { // setTimeout inside a class needs .bind(this) to work
      this.id = null;
      this.secs = ROUND_DURATION;
      this.publish();
      console.log("Timer reset.");
  }.bind(this), delay * 1000);
  }

  tick() {
    this.secs--;
    if (this.secs < 0) {
      this.reset();
      return;
    }
    if (this.secs == 0) {
      audio.play();
    }
    this.publish();
  }

  publish() {
    if (this.secs <= WARNING_TIME) {
      timer.classList.add("warning");
    } else {
      timer.classList.remove("warning");
    }
    timer.innerHTML = this.secs.toTimeString();
  }
}

class Notification {
  constructor(message, lifetime = undefined) {
    this.message = message;
    this.id = String(Math.floor(Math.random() * 100000) + 1);
    this.post();
    if (lifetime) {
      this.dismiss(lifetime);
    }
  }

  post() {
    let div = document.createElement("DIV");
    div.setAttribute("id", this.id);
    div.setAttribute("class", "notification");
    div.innerHTML = this.message;
    div.addEventListener('click', this.dismiss);
    document.getElementById("notebar").appendChild(div);
  }

  update(message) {
    document.getElementById(this.id).innerHTML = message;
  }

  dismiss(seconds = 0) {
    let div = document.getElementById(this.id);
    // seconds = (seconds === true) ? 10 : seconds;
    setTimeout(function() { div.remove(); }, seconds * 1000);
  }
}

// FUNCTIONS ------------------------------------------------------------------
function generateCard() {
  new Card().publish();
  c.reset(0);
}

function startNewRound() {
  new Card().publish();
  c.reset(0);
  c.toggle();
}

function toggleTimer() {
  c.toggle();
}

function resetTimer() {
  c.reset(0);
}

function show(content) {
  if (note) {
    note.dismiss();
  }
  note = new Notification(document.getElementById(content).innerHTML);
}

// MAIN -----------------------------------------------------------------------
console.log(CATEGORIES.length + " categories in use.");
c = new Timer();
generateCard();
