// Include packages needed for this application
    const inquirer = require("inquirer"); // Not included with node- installed with npm
    const fs = require("fs"); // Included with node
    const util = require("util"); // Included with node
const Choices = require("inquirer/lib/objects/choices");

//WHT AM I DOING HERE
const writeFileAsync = util.promisify(fs.writeFile);

// Define Function to utilize inquirer to get needed information for writing a Readme file with content
    const promptUser = () => {
        return inquirer.prompt ([
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
                message: "What installations are needed to install this application (e.x node librairies)"
            },
            {
                type: "input",
                name: "usage",
                message: "How should this application be used?"
            },
            {
                type: "input",
                name: "contributing",
                message: "What are the contribution guidelines for this project?"
            },
            {
                type: "input",
                name: "tests",
                message: "What command should be run to run tests?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your email address?"
            },
            {
                type: "input",
                name: "github",
                message: "What is your github profile name?"
            },
            {
                type: "list",
                name: "liscences",
                message: "What liscences does should this project have?",
                choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
            },
            
        ])    
    }

// Define function that takes in an inquirer response and generates some content for a readme...
// Arrow function syntax says function is called generate Readme, takes in inquirer response as parameter...
const generateReadMe = ({title,description, installation, usage, contributing, tests, email, github, liscences}) => { //How does it know these are tied to the response object??? where does it pic this up?

// And returns some readme content that I will use template literals to fill in (RESEARCH OUTDENT SO I CAN CODE CLEAR BUT NOT HAVE SPACING IN CONTENT)...
return `
# Title ${title}

## Table of Contents
1. [Description](#Description)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [Contributing](#Contributing);
5. [Tests](#Tests)
## Description
${description}
## Installation
${installation}
## Usage
${usage}
## Contribution Guidelines
${contributing}
## Tests
${tests}
## Liscences
${liscences}

## Questions
Email me at ${email} for more information.
You can also find me on github with the user name ${github}. 
Check my profile out here: https://github.com/wryanj
`
}

// Define a function for doing something with the Response I get and wrap it within an init function....
const init = () => {
    promptUser().then(response => {
        const readMeContent = generateReadMe(response) // I dont totally get why I put response here and inquirere response on 46... I dont get response where it comes from vinquirer response
        writeFileAsync("ReadMe.md", readMeContent) // Dont get this part, why there is another.then within a .then. Is .then a method of something?
        .then(() => console.log("Success"))
        .catch(err => console.error(err));
    })
}
 
// Call Init Function (Why does doing this make code more declaritive...)
init();


