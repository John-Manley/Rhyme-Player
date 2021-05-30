const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const spawn = require("child_process").spawn;

let packageManager;
let script;

prompt({
  type: "list",
  name: "script",
  defalut: "Dev",
  message: "What Script should I run: ",
  choices: ["Dev", "Build", "Format", "Format-Check"],
}).then((result) => {
  script = result.script.toLowerCase();
  prompt({
    type: "list",
    name: "packageManager",
    defalut: "Male",
    message: "Choose your package manager: ",
    choices: ["Yarn", "NPM"],
  }).then((result) => {
    packageManager = result.packageManager.toLowerCase();
    let args = packageManager === "npm" ? ["run", script] : [script];

    let scriptRunner = spawn(packageManager, args);

    scriptRunner.stdout.on("data", function (data) {
      console.log(data.toString());
    });

    scriptRunner.stderr.on("data", function (data) {
      console.log(data.toString());
    });

    scriptRunner.on("exit", function (code) {
      console.log("child process exited with code " + code.toString());
    });

    // var server = exec("npm run dev", function (err, stdout, stderr) {
    // if (err) {
    // handle error
    // }
    // console.log(stdout);
    // });
    // server/.on("message", (message) => console.log(message));
  });
});
