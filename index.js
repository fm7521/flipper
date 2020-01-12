const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const config = require("./lang.json");

function getCommands(lang) {
    if (!fs.existsSync(path.join(__dirname, config[lang]))) {
        throw new Error(`File Missing! ${config[lang]}`);
    }
    const fileContents = fs.readFileSync(config[lang]);
    const commandStrings = JSON.parse(fileContents);
    const commands = {};
    for (const [commandName, commandTemplate] of Object.entries(commandStrings.commands)) {
        commands[commandName] = Handlebars.compile(commandTemplate.template);
    }
    return commands;
}



const commands = getCommands("en");

console.log(commands.ping({ msLatency: 42 }));
console.log(commands.blockUser({ username: "Rhubarb" }));
