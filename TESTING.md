# Testing

> [!NOTE]
> Return back to the [README.md](README.md) file.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Directory | File | URL | Screenshot | Notes |
| --- | --- | --- | --- | --- |
|  | [404.html](https://github.com/twitch10126/memorise-this/blob/main/404.html) | [HTML Validator](https://validator.w3.org/nu/?doc=https://twitch10126.github.io/memorise-this/404.html) | ![screenshot](documentation/validation/404-validation.png) | No errors found |
|  | [index.html](https://github.com/twitch10126/memorise-this/blob/main/index.html) | [HTML Validator](https://validator.w3.org/nu/?doc=https://twitch10126.github.io/memorise-this/index.html) | ![screenshot](documentation/validation/index-validation.png) | No errors found |


### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| Directory | File | URL | Screenshot | Notes |
| --- | --- | --- | --- | --- |
| assets | [style.css](https://github.com/twitch10126/memorise-this/blob/main/assets/css/style.css) | [CSS Validator](https://jigsaw.w3.org/css-validator/validator?uri=https://twitch10126.github.io/memorise-this) | ![screenshot](documentation/validation/css-validation.png) | No errors found |


### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.

| Directory | File | URL | Screenshot | Notes |
| --- | --- | --- | --- | --- |
| scripts | [404.js](https://github.com/twitch10126/memorise-this/blob/main/scripts/js/404.js) | N/A | ![screenshot](documentation/validation/404-js-validation.png) | No errors found |
| scripts | [script.js](https://github.com/twitch10126/memorise-this/blob/main/scripts/js/script.js) | N/A | ![screenshot](documentation/validation/script-js-validation.png) | No errors found |
| scripts | [script.test.js](https://github.com/twitch10126/memorise-this/blob/main/scripts/js/script.test.js) | N/A | ![screenshot](documentation/validation/js-scripts-script.test.png) | Notes (if applicable) |


## Responsiveness

I've tested my deployed project to check for responsiveness issues.

| Page | Mobile | Tablet | Desktop | Notes |
| --- | --- | --- | --- | --- |
| Home | ![screenshot](documentation/responsiveness/mobile-home.png) | ![screenshot](documentation/responsiveness/tablet-home.png) | ![screenshot](documentation/responsiveness/desktop-home.png) | Works as expected |
| Game | ![screenshot](documentation/responsiveness/mobile-game.png) | ![screenshot](documentation/responsiveness/tablet-game.png) | ![screenshot](documentation/responsiveness/desktop-game.png) | Works as expected |
| 404 | ![screenshot](documentation/responsiveness/mobile-404.png) | ![screenshot](documentation/responsiveness/tablet-404.png) | ![screenshot](documentation/responsiveness/desktop-404.png) | Works as expected |

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Page | Chrome | Firefox | Edge | Notes |
| --- | --- | --- | --- | --- |
| Home | ![screenshot](documentation/browsers/chrome-home.png) | ![screenshot](documentation/browsers/firefox-home.png) | ![screenshot](documentation/browsers/edge-home.png) | Works as expected |
| Game | ![screenshot](documentation/browsers/chrome-game.png) | ![screenshot](documentation/browsers/firefox-game.png) | ![screenshot](documentation/browsers/edge-game.png) | Works as expected |
| 404 | ![screenshot](documentation/browsers/chrome-404.png) | ![screenshot](documentation/browsers/firefox-404.png) | ![screenshot](documentation/browsers/edge-404.png) | Works as expected |

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues. Some warnings are outside of my control, and mobile results tend to be lower than desktop.

| Page | Mobile | Desktop |
| --- | --- | --- |
| Home | ![screenshot](documentation/lighthouse/mobile-home.png) | ![screenshot](documentation/lighthouse/desktop-home.png) |
| 404 | ![screenshot](documentation/lighthouse/mobile-404.png) | ![screenshot](documentation/lighthouse/desktop-404.png) |

## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

| Page/Feature | Expectation | Test | Result | Screenshot |
| --- | --- | --- | --- | --- |
| Button Press | Only valid game buttons should be clickable | Click outside game buttons | Game ignores invalid clicks. | ![screenshot](documentation/defensive/before-start.png) |
| | Coloured buttons (red, blue, green, purple) should only be clickable once the game has started | Clicked the game buttons before the start button was pressed,   | Coloured buttons are disabled before start button is pressed. | ![screenshot](documentation/defensive/before-start.png) |
| | Coloured buttons (red, blue, green, purple) should only be clickable when the start audio has ended. | Click game buttons while the start audio is playing | Buttons are disabled during start audio. | ![screenshot](documentation/defensive/after-start.png) |
| | Coloured buttons (red, blue, green, purple) should not be clickable during the AI's turn. | Click the coloured buttons while the AI sequence is playing | Buttons are disabled during AI turn. | ![screenshot](documentation/defensive/ai-turn.png) |
| | Reset button should reset local storage. | Update leaderboard with some scores then click reset. | Leaderboard reset as expect to default "player" "Score". | ![screenshot](documentation/defensive/reset.png) |
| | Restart button should reset the game to its initial state. |Start a game, get a score, click restart. | Game reset to it's initial state. |![screenshot](documentation/defensive/restart.png) |
| Social Media Icons | Social media Links should open to the correct pages in a new tab. | Click each link to verify its path | Links work as expected | 
| Sequence Tracking | Game should only proceed if user input matches the correct sequence | Enter wrong sequence. | Game ends, save modal appears. | ![screenshot](documentation/defensive/modal.png) |
| Name input | Input field of modal should require a name to save score, otherwise it throws an error. | Try to submit with no name added to input field. | A error is thrown ("please enter a valid name") | ![screenshot](documentation/defensive/invalid-name.png) |
| Round Tracker | Feature is expected to track the current round a user is on. | Play multiple game to ensure round count is increasing. | Round updated as expected. | ![screenshot](documentation/defensive/round-tracking.png) |
| 404 Error Page | Feature is expected to display a 404 error page for non-existent pages. | Navigated to an invalid URL (e.g., `/test`) to test error handling. | A custom 404 error page was displayed as expected. | ![screenshot](documentation/defensive/404.png) |
| Page is expected to redirect the user back to index.html after 5 seconds. | Navigated to an invalid URL (e.g., `/test`). | The countdown appeard and i was navigated back to index.html once the countdown had finished. | ![screenshot](documentation/defensive/countdown.png) |

## User Story Testing

| Target | Expectation | Outcome | Screenshot |
| --- | --- | --- | --- |
| As a player | I want to see a clear start button on the screen | so that I can begin the game. | ![screenshot](documentation/features/start.png) |
| As a player |  I want to understand the rules of the game before starting | so that I know how to play. | ![screenshot](documentation/features/rules.png) |
| As a player | I want the game to display a sequence of coloured lights | so that I can memorize and repeat it. | ![screenshot](documentation/features/ai-turn.png) |
| As a player |  I want to press the correct sequence of coloured buttons | so that I can advance to the next round. | ![screenshot](documentation/features/user-input.png) |
| As a player |  I want the sequence to increase in difficulty as I progress | so that the game remains challenging. | ![screenshot](documentation/features/difficulty.png) |
| As a player | I want the game to provide instant feedback when I press a button | so that I know if my input was correct or incorrect. | ![screenshot](documentation/features/ai-turn.png) |
| As a player | I want the game to show my score after each round | so that I can track my progress. | ![screenshot](documentation/features/round.png) |
| As a player | I want the option to restart the game after losing | so that I can try again. | ![screenshot](documentation/features/restart.png) |
| As a player | I want my highest score to be saved | so that I can challenge myself to beat it. | ![screenshot](documentation/features/leaderboard.png) |

