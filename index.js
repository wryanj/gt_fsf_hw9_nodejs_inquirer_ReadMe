// Up front dependencies, global variale definitions & conversions

    // Include packages needed for this application
    const inquirer = require("inquirer"); 
    const fs = require("fs"); 
    const util = require("util"); 

    // Define global variables to set value to later
    let licenceBadge;
    let licenceLink;
        
    // Use promisify to convert fs.writefile method so that it returns response in a promise object rather than using a callback function
    const writeFileAsync = util.promisify(fs.writeFile);

// Define Function to utilize inquirer to get needed information for writing a Readme file with the responses
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
                name: "licences",
                message: "What liscences does should this project have?",
                choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
            },
        ])    
    }

// Define Function to render a liscence badge based on inquirer input...
    const renderLicenseBadge = (x) => {
        
        if (x === "Apache 2.0") {
            licenceBadge = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
        }
      
        else if (x === "MIT") {
            licenceBadge = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
        }
      
        else if (x === "GPL 3.0") {
            licenceBadge = "![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)";
        }
      
        else if (x === "BSD 3") {
            licenceBadge = "![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)";
        }
      
        else if (x === "None") {
            licenceBadge = "";
        }
      }

// Define function to render a licence link based on inquirer input..
    const renderLicenseLink = (x) => {
        
        if (x === "Apache 2.0") {
            licenceLink = "https://opensource.org/licenses/Apache-2.0";
        }
    
        else if (x === "MIT") {
            licenceLink = "https://opensource.org/licenses/MIT";
        }
    
        else if (x === "GPL 3.0") {
            licenceLink = "http://www.gnu.org/licenses/gpl-3.0";
        }
    
        else if (x === "BSD 3") {
            licenceLink = "https://opensource.org/licenses/BSD-3-Clause";
        }
    
        else if (x === "None") {
            licenceLink = "";
        }
    }

// Define function that takes in an inquirer response and generates some content for a readme...
// Arrow function syntax says function is called generate Readme, takes in inquirer response as parameter and is using "function paramater desstructuring" to destruction the param...
const generateReadMeContent = ({title,description, installation, usage, contributing, tests, email, github, licences}) => { 
// Get Liscence badge
renderLicenseBadge(licences);
// Get Liscence link
renderLicenseLink(licences);
// And return this content into a new (or existing) readme file in this directory (RESEARCH OUTDENT SO I CAN CODE CLEAR BUT NOT HAVE SPACING IN CONTENT)...
return `
# ${title}
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
## Licenses
${licenceBadge}  
${licenceLink}
## Questions
Email me at ${email} for more information.
You can also find me on github with the user name ${github}. 
Check my profile out here: https://github.com/wryanj
`
}

// Define a function that kicks off the question / answer / do something sequence using functions defined above....
const init = () => {

    // Upon Call of init, Run the prompt user function...
    promptUser()

        // Then, when the function is completed....(whats it doing with response...)
        .then(response => {

            // Define a variable that holds the content I want to write to a readme file, which is generated via invoking the variable holding the function I defined to do this...
            const readMeContent = generateReadMeContent(response)
           
            // Then call the promisified fs.writeFile method to create (or write content to) the file ReadMe.md (in this directory), including the readMeContent I defined..
            writeFileAsync("ReadMe.md", readMeContent) 

        // Then, when the writeFileAsync is completed, if no error console log "success"
        .then(() => console.log("Success"))

        // If after writeFileAsyc completes, an error is detected.. console log the error
        .catch(err => console.error(err));
    })
}
 
// Call Init Function to start the chain of asking questions, getting answers, then writing a new file (everything I declared above)...
init();


