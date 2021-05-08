# Song Ballot

See the [demo version](https://pedrokohler.github.io/song-ballot)

Have fun with your friends with Song Ballot, a real project based on a game that I had with a group of friends.
Initially we used google forms, google sheets and 2 whatsapp groups to play. Given the complications that came about with this method, I decided to create a simple application to solve this issue.

The game is simple:

1- Every week each participant registers a song

2- Each participant evaluates all but his own songs with a number ranging from 1 to 100

3- The best scoring song wins. The person who sent the song can send an extra song the next week

## Installation

Clone the repository and install the dependencies
```
git clone https://github.com/pedrokohler/song-ballot.git
cd ./song-ballot
yarn install
```
After that, install the dependencies inside the functions folder. Note that you must use node version 10.10. Also, install firebase-tools globally.
```
cd ./functions
nvm use 10.10
yarn install
yarn global add firebase-tools@8.8.1
```

To deploy firebase functions, first add the youtube.key and the telegram.bot.key variables
```
firebase functions:config:set youtube.key="YOUR_YOUTUBE_API_KEY" telegram.bot.key="YOUR_TELEGRAM_BOT_KEY"
```
Remember to change back the node version to the latest if you go back to the project root.

Before starting the app you should create your .env and .env.development files in the root folder, filling it up with the following keys

```
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_APP_ID=
```

## Usage

### Development server

```bash
yarn start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

```bash
npm i -g http-server
```

You can view the deploy by creating a server in `dist`.

```bash
cd dist && http-server
```

### Deploy

```
yarn deploy
```

Will deploy the application commiting the gh-pages and pushing it to origin.
