# Gary, a word game

<img src="images/screenshot.png" align="right" width="250" height="400">

Gary is an alliterative word game for 2 or more players.

## Quick Start
* Go to [keiranking.com/gary](http://www.keiranking.com/gary/).
* Start playing.

### Rules
* Each round, players write answers that fit the categories, starting with the key letter, within the allotted time.
* Each unique answer is worth 1 point. Alliterative answers are worth 1 point per word (eg. Daffy Duck, 2 pts).
* Answers can only be used in one category per round. Player with the most points after all rounds are completed wins.

## Localization
To localize Gary for another country:
1. Fork and clone the repo.
1. In `categories.js`, add a new country key in the `LOCAL_CATEGORIES` dictionary and supply categories as strings in an array.
   ```
   'France': [
     "French breads",
     "French politicians",
     "Nice things",
     "Wineries"
   ],
   ```
1. Run the app locally. For example, if you run `python3 -m http.server`,
   navigate to `localhost:8000`.
1. Select your new country from the localization menu.

## Contributions
Have a cool feature or more great categories? Submit an issue.

## License
Licensed under [the Apache License, v2.0](http://www.apache.org/licenses/LICENSE-2.0) (the 'License').

Unless required by law or agreed in writing, software distributed under the License
is distributed on an **'as is' basis, without warranties or conditions**, express or implied.
See the [License](LICENSE.txt) for the specific language governing permissions and limitations.

&copy; Keiran King
