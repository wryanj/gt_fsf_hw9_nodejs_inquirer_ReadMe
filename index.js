// Include packages needed for this application
    const inquirer = require("inquirer"); // Not included with node- installed with npm
    const fs = require("fs"); // Included with node
    const util = require("util"); // Included with node

// Utilize inquirer to get needed information for writing a Readme file with content
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

    promptUser().then(response => {
        //Do something with the response ex...
        console.log(response.title);
        console.log(response.description);
    })

// TODO: Create a function to write README file
//function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
//function init() {}

// Function call to initialize app
//init();
