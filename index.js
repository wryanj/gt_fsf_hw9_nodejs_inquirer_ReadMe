// Include packages needed for this application
    const inquirer = require("inquirer"); // Not included with node- installed with npm
    const fs = require("fs"); // Included with node
    const util = require("util"); // Included with node


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

// Define function that takes in an inquirer response and generates some content for a readme...

    // Arrow function syntax says function is called generate Readme, takes in inquirer response as parameter...
    const generateReadMe = inquirerResponse => {

        // And returns some readme content that I will use template literals to fill in...
        return `
        some readme content..
        `
    }

// Define a function for doing something with the Response I get....
    promptUser().then(response => {
        const readMeContent = generateReadMe(response)
        console.log(readMeContent);
    })


//function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
//function init() {}

// Function call to initialize app
//init();
