// Include packages needed for this application
const inquirer = require("inquirer"); 
const fs = require("fs"); 
const util = require("util"); 
    
// Use promisitfy to convert fs.writefile method so that it returns response in a promise object rather than using a callback function
const writeFileAsync = util.promisify(fs.writeFile);

// Define Function to utilize inquirer to get needed information for writing a Readme file with the responses
    const promptUser = () => {
        console.log("Prompt User Function Started Using Inquirer prompt method")
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
const generateReadMeContent = ({title,description, installation, usage, contributing, tests, email, github, liscences}) => { //How does it know these are tied to the response object??? where does it pic this up?
console.log("Generate Readme Content Started");
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

// Define a function that kicks off the question / answer / do something with answer chain of events....
const init = () => {
    console.log("Init function invoked, process started")

    // Upon Call of init, Run the prompt user function...
    promptUser()

        // Then, when the function is completed....
        .then(response => {
            console.log("Prompt User function complete. Recorded response is - " + JSON.stringify(response));

            // Define a variable that holds the content I want to write to a readme file, which is generated with the function I put in it's value...
            const readMeContent = generateReadMeContent(response)
           
            // Then call the promisified fs.writeFile method to create (or write content to) the file ReadMe.md (in this directory), including the readMeContent I defined..
            console.log("Generate Readme Content Complted, Moving to WriteFileAsync");
            console.log("readMEContent recorded as : " + JSON.stringify(readMeContent));
            writeFileAsync("ReadMe.md", readMeContent) 

                // Then, when the writeFileAsync is completed, if no error console log "success"
                .then(() => console.log("Success"))

                // If after writeFileAsyc completes, an error is detected.. console log the error
                .catch(err => console.error(err));
    })
}
 
// Call Init Function to start the chain of asking questions, getting answers, then writing a new file (everything I declared above)...
init();


