const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

// Function to prompt user for input
function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Function to download a file from a URL
async function downloadFile(url, destinationPath) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });
        const writer = fs.createWriteStream(destinationPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}

// Main function to handle file downloading
async function main() {
    try {
        // Prompt user for URL
        const url = await prompt('Enter the URL of the file you want to download: ');

        // Prompt user for destination path
        const destinationPath = await prompt('Enter the destination path where you want to save the file (e.g., /path/to/save/file.txt): ');

        // Download the file
        console.log('Downloading file...');
        await downloadFile(url, destinationPath);
        console.log('File downloaded successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the main function
main();
