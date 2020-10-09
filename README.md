# Song Ballot

See the [demo version](https://pedrokohler.github.io/song-ballot)

Have fun with your friends with Song Ballot, a real project based on a game that I had with a group of friends.
Initially we used google forms, google sheets and 2 whatsapp groups to play. Given the complications that came about with this method, I decided to create a simple application to solve this issue.

The game is simple:

1- Every week each participant registers a song

2- Each participant evaluates all but his songs with 1 to 10 points

3- The best scoring song wins. The person who sent the song can send an extra song the next week

## Installation

Clone the repository and install the dependencies
```
git clone https://github.com/pedrokohler/song-ballot.git
yarn install
```
Go into the project's folder and create a dist folder
```
cd song-ballot
mkdir dist
```
Create and configure the gh-pages branch
```
# Create an orphan branch named gh-pages
git checkout --orphan gh-pages

# Remove all files from staging
git rm -rf .

# Create an empty commit so that you will be able to push on the branch next
git commit --allow-empty -m "Init empty branch"

# Push the branch
git push origin gh-pages

# Come back to master
git checkout master

git worktree add dist gh-pages
```

If your source controll changes are full of wrong updates updates, just restart your IDE and it'll work fine.

To deploy firebase functions, first add the youtube.key variable
```
cd ./functions
firebase functions:config:set youtube.key="YOUR_KEY"
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
yarn deploy "message here"
```

Will deploy the application commiting the gh-pages and pushing it to origin with the message you insert.