const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const cheerio = require('cheerio');
import('open').then(open => {
    // Use open here
}).catch(err => {
    console.error('Error occurred while importing open:', err);
});

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

// Function to get all image and video URLs from a webpage
async function getAllMediaUrls(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const mediaUrls = [];
        $('img, video').each((index, element) => {
            const src = $(element).attr('src');
            if (src) {
                const extension = src.split('.').pop().toLowerCase();
                // Add additional image and video formats as needed
                if (['jpg', 'jpeg', 'png', 'gif', 'mp4', 'avi', 'mov'].includes(extension)) {
                    mediaUrls.push(src);
                }
            }
        });
        return mediaUrls;
    } catch (error) {
        console.error('Error getting media URLs:', error);
        throw error;
    }
}

// Function to calculate total download size
async function getTotalDownloadSize(urls) {
    try {
        let totalSize = 0;
        for (const url of urls) {
            const response = await axios.head(url);
            totalSize += parseInt(response.headers['content-length'], 10);
        }
        return totalSize;
    } catch (error) {
        console.error('Error getting download size:', error);
        throw error;
    }
}

// Function to prompt user for download directory
async function promptDownloadDirectory() {
    const downloadDirectory = await prompt('Enter the directory where you want to save the files (default is browser\'s download directory): ');
    return downloadDirectory.trim() !== '' ? downloadDirectory.trim() : null;
}

// Main function to handle file downloading
async function main() {
    try {
        // Prompt user for URL
        const url = await prompt('Enter the URL of the webpage you want to download media from: ');

        // Open the provided URL in default browser
        await open(url);

        // Get all image and video URLs from the webpage
        const mediaUrls = await getAllMediaUrls(url);

        // Calculate total download size
        const totalSize = await getTotalDownloadSize(mediaUrls);
        console.log(`Total download size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);

        // Prompt user if they want to download all files
        const confirmation = await prompt('Do you want to download all files? (yes/no): ');

        if (confirmation.toLowerCase() === 'yes') {
            // Prompt user for download directory
            let downloadDirectory = await promptDownloadDirectory();

            // Default download path determined by the browser if no directory provided
            if (!downloadDirectory) {
                downloadDirectory = '/path/to/default/download/directory';
            }

            // Download all files to the specified directory
            console.log('Downloading files...');
            for (const [index, mediaUrl] of mediaUrls.entries()) {
                const extension = mediaUrl.split('.').pop();
                const destinationPath = `${downloadDirectory}/file${index}.${extension}`;
                const response = await axios({
                    method: 'GET',
                    url: mediaUrl,
                    responseType: 'stream'
                });
                const writer = fs.createWriteStream(destinationPath);
                response.data.pipe(writer);
                console.log(`Downloaded file ${index + 1}/${mediaUrls.length}`);
            }
            console.log('All files downloaded successfully!');
        } else {
            console.log('Download aborted by user.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the main function.
main();
