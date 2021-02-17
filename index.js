//-------------------------------------------------------------------------------------------------------------
// DECLARE DEPENDENCIES, GLOBAL VARIABLES AND INITIAL CONVERSIONS
//-------------------------------------------------------------------------------------------------------------

    // Include packages needed for this application
    const inquirer = require("inquirer"); 
    const fs = require("fs"); 
    const util = require("util"); 

    // Define global variables that will have values established in later functions
    let licenceBadge;
    let licenceLink;
        
    // Use promisify to convert fs.writefile method so that it returns response in a promise object 
    const writeFileAsync = util.promisify(fs.writeFile);

//---------------------------------------------------------------------------------------------------------------
// FUNCTIONAL PROGRAM LOGIC TO BE EXEUCUTED UPON INVOKATION OF INIT() FUNCTION AT BOTTOM OF SCRIPT
//---------------------------------------------------------------------------------------------------------------

    // When the applicatoin starts, collect information via prompts using inquirer....
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

    // Determine what badge to display based on license type selected during the prompt...
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

    // Determine what license link to display based on license type selected during the prompt...
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

    // Generate content to write to a ReadMe.md file using information collected in the prompt session....
    const generateReadMeContent = ({title,description, installation, usage, contributing, tests, email, github, licences}) => { 

        // Get Liscence badge and assign it to a global variable...
        renderLicenseBadge(licences);

        // Get Liscence link and assign it to a global variable...
        renderLicenseLink(licences);

        // Use the destructured response object properties and additional text to generate the content for the ReadMe...

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

//--------------------------------------------------------------------------------------------------------------------------------
//DEFINE SEQUENCE FOR ASYNCHRONOUS LOGIC EXECUTION
//--------------------------------------------------------------------------------------------------------------------------------

    // Wrap sequence in a single function to be declaritive...
    const init = () => {

        // Upon Call of init, prompt the user for inputs
        promptUser()

            // Then, when the function is completed take the result (the prompt response)...
            .then(response => {

                // And pass it as a parameter to the generate readme content so I can generate content to write to a file...
                const readMeContent = generateReadMeContent(response)
            
                // Once conetent is generated, write the file using promisified fs.writeFile method....
                writeFileAsync("./generated_test_files/ReadMe.md", readMeContent) 

            // Then, when the writeFileAsync is completed, if no error console log "success"...
            .then(() => console.log("Success"))

            // If at any time in the chain there is a failure, console log an error and stop the sequence..
            .catch(err => console.error(err));
        })
    }

//-----------------------------------------------------------------------------------------------------------------------------------
//START PROGRAM
//-----------------------------------------------------------------------------------------------------------------------------------
 
    // Invoke the init functoin to run the program...
    init();


