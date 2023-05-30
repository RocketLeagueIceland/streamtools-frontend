# Streamtools - Frontend (React)

Used in production for RLÍS streams (Rocket League Ísland). The resources created can be imported as browser sources into your streaming tool.

## Description

This project should include everything that is needed for an RLÍS broadcast, apart from what should be in the backend **LINK TO BACKEND GITHUB**. You may notice that we use a lot of images instead of CSS to create the visualization. This is because we are always streaming in the same resolution, so responsiveness is not an issue. It also makes it easier to create or update some graphics in Photoshop and replace them here.

Here is a list of its current features:

  - Control panel (StreamInterface)
  - Countdown
  - Ingame Overlay
    - Teams name/logos
    - Current score 
    - Ingame Clock
    - Boost status (Boostinformation overlay)
    - Player Images
  - Current Standing
  - Double elimination graphic (6 teams)
  - Single elimination graphic (6 teams)
  - Games on Stream
  - Post Game Screen
  - Team logos
  - TV screen graphics
  - Twitch polling

There are some unfinished features, that might just be deleted later:

  - Replay Stinger
    - Was supposed to be a dynamic stinger that showed who scored, and perhaps also contained some of the sponsors for the team. Having team sponsors visible can help the esports teams grow, which in turn makes RLÍS a more desire-able esports competition platform.
  - NextGame
    - I had not completely finished the idea here, but basicly I wanted to be able to set up what the next game in a singular spot, so Tv-NextGame would be updated among other things in a central place.
  - Matchup
    - I honestly dont remember what this was supposed to be. Will probably just be deleted.

The Ingame Overlay is a bit scattered, and can be combined or structured better in the project.

I do apologize for the chaos and bad/inconsistant naming. That happens when you are working alone on a project and everything is basicly a prototype :D . Hopefully I fix it before stopping development

## How to Run It

### Prerequisites

To run the project you need `Node.js` and `npm`. Here is a link to download Node.js and npm should come with it.

 - https://nodejs.org/en

The version I am using right is `v16.11.1` but I dont think future version should break the project. A future project would be to dockerize this project for full version control, but more on that later.

#### Bakkesmod & SOS
You need to have `BakkesMod` installed along with the `SOS-plugin`. You also have to have the `SOS-WS-RELAY` running, which is a node project.

Bakkesmod can be installed from here
 - https://bakkesplugins.com/

Everything SOS related can be installed from here
 - https://gitlab.com/bakkesplugins/sos

I collected some events from the `SOS-WS-RELAY` and they can be found in `sos-documentation.txt`.

### Installation & Run

If all the prerequisites are there you must simply run 

```sh
npm install
```

To install all the node modules. Then to run the Streamtools front end just run

```sh
npm start
```

## Future Improvements

A dream would be to recreate the backend and frontend of the streamtools with next.js and combining them together. I am in favor of Separation Of Concerns, a well known software engineering rule, but in this case the frontend and backend are so highly coupled anyways.

I would also like to use streams, instead of polling the backend like I am doing now.

Thirdly having everything dockerized would simplify alot. It would be easier for beginners to start running everything up, because all the prerequisites can be set up in the docker file, or run in another docker container.

I also wonder if it would have been smarter to connect the backend to the WS relay, and only fetch all the information once, and then send relevant data for each frontend component