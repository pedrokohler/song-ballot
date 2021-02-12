/* eslint-disable no-console */
const { exec } = require("child_process");

const message = process.argv[2];

if (!message) {
  console.log("Insert a message for your deploy");
  process.exit(1);
}

exec(
  `yarn build && cd dist && git add . && git commit -m "${message}" && git push`,
  (err, stdout, stderr) => {
    if (err) {
      // some err occurred
      console.error(err);
    } else {
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  },
);
