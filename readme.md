# Gary, a word game

<img src="images/screenshot.png" align="right" width="250" height="400">

Gary is an alliterative word game for 2 or more players.

## Quick Start
* Go to [keiranking.com/gary](http://www.keiranking.com/gary/).
* Start playing.

## Rules
* Each round, players write answers that fit the categories, starting with the key letter, within the allotted time.
* Each unique answer is worth 1 point. Alliterative answers are worth 1 point per word (eg. Daffy Duck, 2 pts).
* Answers can only be used in one category. Player with the most points after all rounds are completed wins.

## Localization
To localize Gary for another country:
1. Open `categories.js`.
2. Add a country as a new key in the `LOCAL_CATEGORIES` dictionary, with an empty array as the value.
   ```
   'France': [],
   ```
3. Add local categories as strings in that array.
   ```
   'France': [
     "French breads",
     "French politicians",
     "Nice things",
     "Wineries"
   ],
   ```
4. Reload `index.html`.
5. Select your new country from the localization menu.

## License
Licensed under [the Apache License, v2.0](http://www.apache.org/licenses/LICENSE-2.0) (the 'License').

Unless required by law or agreed in writing, software distributed under the License
is distributed on an **'as is' basis, without warranties or conditions**, express or implied.
See the [License](LICENSE.txt) for the specific language governing permissions and limitations.

&copy; Keiran King
