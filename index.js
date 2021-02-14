// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// Utilize inquirer to get needed information for writing a Readme file with content
function promptUser () {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your ReadME?"
        },
        {
            type: "input",
            name: "description",
            message: "What is the description of this application?"
        },
        {
            type: "input",
            name: "installation",
            message: "What is needed to install this application?"
        },
        {
            type: "input",
            name: "usage",
            message: "How should this application be used?"
        },
        {
            type: "input",
            name: "contributing",
            message: "Who contributed to this application"
        },
        {
            type: "input",
            name: "tests",
            message: "What information is availible to help with testing this application?"
        },
    ])
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
