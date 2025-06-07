# [memorise-this](https://twitch10126.github.io/memorise-this)

Developer: Emma Bough ([twitch10126](https://www.github.com/twitch10126))

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/twitch10126/memorise-this)](https://www.github.com/twitch10126/memorise-this/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/twitch10126/memorise-this)](https://www.github.com/twitch10126/memorise-this/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/twitch10126/memorise-this)](https://www.github.com/twitch10126/memorise-this)

**Overview**

"Memorise This" is an interactive memory game designed to test the players skills and quick reflexes. The game presents users with an increasingly complex sequence of colors and sounds that they must recall and repeat. As players progress, the difficulty increases, requiring more focus and stronger memorization abilities. It is designed to increase in difficulty, so players of all levels can participate whether they are beginners looking for a little entertainment or experienced players looking for a mental workout.

**Site Mockups**
![screenshot](documentation/mockups/mockup.png)

source: [memorise-this amiresponsive](https://ui.dev/amiresponsive?url=https://twitch10126.github.io/memorise-this)

## UX

### The 5 Planes of UX

#### 1. Strategy

**Purpose**

- Provide users with a fun and accessible way to improve cognitive function.
- Deliver instant feedback to improve usability.
- Support accessibility and user-friendly interactions.

**Primary User Needs**

- Recall correct patterns to progress through the game.
- Increase difficulty gradually for a gradual learning curve
- Track performance to motivate self-improvement.

**Business Goals**

- Encourage users to engage with the app for fun and educational purposes.
- Showcase a well-designed, accessible tool that supports learning.
- Create an engaging and rewarding experience that encourages repeated play.

#### 2. Scope

**[Features](#features)** (see below)

**Content Requirements**

- Clear labels and instructions for game buttons (e.g., "Start", "rules", "leaderboard").
- Visual and audio cues for correct/incorrect inputs.
- Progress tracking to display scores.

#### 3. Structure

**Information Architecture**

- **Header Area**:
- Mute button: Allows the user to toggle game sound on/off.
- Leaderboard: Displays users inputted name and score.

- **Main Interface**:
  - Rules Button: Provides quick access to the game rules before the game starts.
  - Game Area: The gameplay screen where sequences are presented and user interactions take place.
  - Feedback System: Success indicators after each successful sequence or Immediate alert on incorrect input.
  - Progress Tracking: Shows current round to motivate continued play.



**User Flow**

1. User opens the game → sees leaderboard and mute button in the header.
2. Reads rules (optional) → presses the "Start" button.
3. Game plays a pattern → user repeats it using the coloured game buttons.
4. User receives feedback (success or failure).
5. If successful → the next level begins with a longer pattern.
6. User tracks round through on screen indicator.
7. If incorrect → the game resets and a message appears with option to input your name and save score to the leaderboard.


#### 4. Skeleton

**[Wireframes](#wireframes)** (see below)

#### 5. Surface

**Visual Design Elements**

- **[Colours](#colour-scheme)** (see below)
- **[Typography](#typography)** (see below)

### Colour Scheme

I used [coolors.co](https://coolors.co/050514-03030c-2a133f-808080-b8900d-ff0000-0000ff-941494-008000-ffebcd) to generate my color palette.

- `#050514` background-color.
- `#2a133f` gradient-color1.
- `#03030c` gradient-color2.
- `#808080` highlight.
- `#ff0000` button1.
- `#0000ff` button2.
- `#941494` button3.
- `#008000` button4.
- `#008000` gold-highlight.
- `#ffebcd` rules.

![screenshot](documentation/palette/coolors.png)

### Typography

- [Cutive Mono](https://fonts.google.com/specimen/Cutive+Mono) was used for the headings inside the game interface.
- [Lora](https://fonts.google.com/specimen/Lora) was used for the leaderboard and 404 titles.
- [Font Awesome](https://fontawesome.com) icons were used throughout the site, such as the mute button in the header and the social media icons in the footer.

## Wireframes

To follow best practice, wireframes were developed for mobile, tablet, and desktop sizes.
I've used [Balsamiq](https://balsamiq.com/wireframes) to design my site wireframes.

| Page | Mobile | Tablet | Desktop |
| --- | --- | --- | --- |
| Home | ![screenshot](documentation/wireframes/mobile.png) | ![screenshot](documentation/wireframes/tablet.png) | ![screenshot](documentation/wireframes/desktop.png) |
| 404 | ![screenshot](documentation/wireframes/mobile-404.png) | ![screenshot](documentation/wireframes/tablet-404.png) | ![screenshot](documentation/wireframes/desktop-404.png) |

## User Stories

| Target | Expectation | Outcome |
| --- | --- | --- |
| As a player | I want to see a clear start button on the screen | so that I can begin the game. |
| As a player | I want to understand the rules of the game before starting | so that I know how to play. |
| As a player |  I want the game to display a sequence of coloured lights | so that I can memorize and repeat it. |
| As a player |  I want to press the correct sequence of coloured buttons | so that I can advance to the next round. |
| As a player | I want the sequence to increase in difficulty as I progress | so that the game remains challenging. |
| As a player |  I want the game to provide instant feedback when I press a button | so that I know if my input was correct or incorrect. |
| As a player | I want the game to show my score after each round | so that I can track my progress. |
| As a player |  I want the option to restart the game after losing | so that I can try again. |
| As a player |  I want my highest score to be saved | so that I can challenge myself to beat it. |

## Features

### Existing Features

| Feature | Notes | Screenshot |
| --- | --- | --- |
| Coloured buttons | The coloured buttons (`red`, `blue`, `green`, `purple`) are large and colorful to allow users to easily input the correct sequence set by the AI. Each coloured button has its own unique sound and flashes for easy identification. | ![screenshot](documentation/features/game-interface.png) |
| Header/Leaderboard | This section visibly displays the mute button the players inputted name, score and reset button. The leaderboard displays only the top 10 scores and will only update if the score is greater than or equal to 1 | ![screenshot](documentation/features/leaderboard.png) |
| Mute button | This button allows users to toggle the game sound on and off. On page load the volume is muted by default. | ![screenshot](documentation/features/mute-button.png) |
| Restart button | The restart button resets the game to its initial state waiting for the user to start the next game. | ![screenshot](documentation/features/restart.png) |
| Alert | Once the user enters the wrong sequence, an alert pops up prompting the user to enter their name. This showcases if they got it correct, or if they've gotten it incorrect, therefore also showing the correct answer. | ![screenshot](documentation/features/modal.png) |
| 404 | The 404 error page will indicate when a user has somehow navigated to a page that doesn't exist. This replaces the default GitHub Pages 404 page, and ties-in with the look and feel of the *Memorise this* site by using the standard navbar game interface and footer. | ![screenshot](documentation/features/404.png) |

