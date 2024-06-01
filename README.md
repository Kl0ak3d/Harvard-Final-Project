Introduction:
The provided Node.js script offers a comprehensive solution for efficiently downloading media files, such as images and videos, from a specified webpage URL. 
With its intuitive interface and robust functionality, the script caters to users' diverse needs, whether for personal projects, research purposes, or 
professional endeavors. By leveraging the power of Node.js and popular libraries like Axios and Cheerio, it simplifies the process of collecting media 
content from webpages, enhancing productivity and convenience for users.

Core Components:

    Module Dependencies:
    The script relies on a range of essential Node.js modules to execute its tasks seamlessly:
        axios: Enables asynchronous HTTP requests, facilitating the retrieval of webpage content 
        and media files.fs: Provides utilities for performing file system operations,essential for downloading and saving media files locally.
        readline: Offers an interactive command-line interface for user input, enhancing the script's usability.
        cheerio: Facilitates the parsing and manipulation of HTML content, allowing for efficient extraction of media URLs from webpages.

    Dynamic Import of Open Module:
    Demonstrating modern JavaScript features, the script utilizes dynamic import to asynchronously import the open module. This module plays a crucial
    role in enhancing user experience by allowing them to preview the provided webpage URL in their default browser before initiating the download process.
    This feature provides users with valuable context and ensures they can verify the content they intend to download.

    Interactive Prompt Function:
    The script incorporates an interactive prompt function, powered by the readline module, to engage users and solicit input via the command-line interface.
    This function enhances the script's user-friendliness by guiding users through the download process, prompting them for necessary information such as the
    webpage URL and download directory.

    Media URL Retrieval (getAllMediaUrls Function):
    The getAllMediaUrls function serves as the backbone for retrieving all image and video URLs from the provided webpage URL. Leveraging Axios for fetching 
    the HTML content of the webpage and Cheerio for parsing the DOM structure, this function efficiently identifies and extracts media URLs. By supporting
    multiple media formats and intelligently filtering URLs, it ensures comprehensive coverage of available media content.

    Total Download Size Calculation (getTotalDownloadSize Function):
    An essential aspect of the script's functionality is the calculation of the total download size of all media files. The getTotalDownloadSize function 
    employs asynchronous HEAD requests to each media URL, extracting the content length from the response headers. By aggregating the sizes of individual 
    files, it provides users with valuable insight into the overall download requirements, enabling informed decision-making.

    Download Directory Prompt (promptDownloadDirectory Function):
    Recognizing the importance of user flexibility, the script incorporates the promptDownloadDirectory function to allow users to specify their preferred 
    download directory. This function empowers users to customize their download experience, whether by selecting a specific directory for organizational 
    purposes or utilizing the default browser download directory for convenience.

    Main Function (main):
    At the heart of the script lies the main function, which orchestrates the execution of the download process. This function serves as the entry point for 
    users, guiding them through the sequential steps required to download media files from the provided webpage URL. From prompting users for input to initiating
    file downloads, it ensures a smooth and intuitive user experience.

    Download Process Execution:
    Upon user confirmation to download files, the script seamlessly executes the download process. It iterates through each media URL retrieved from the webpage,
    fetching the corresponding file using Axios with a stream response. By leveraging asynchronous operations and stream-based downloading, the script optimizes
    resource utilization and ensures efficient transfer of media files to the specified download directory.

Conclusion:
In conclusion, the provided Node.js script represents a versatile and powerful tool for downloading media files from webpages. By combining the capabilities 
of Node.js with intuitive user interaction and robust functionality, it caters to users' diverse needs with ease. Whether for personal projects requiring media
aggregation, academic research necessitating data collection, or professional endeavors demanding content acquisition, this script serves as a valuable asset. 
With its emphasis on user-friendliness, flexibility, and efficiency, it exemplifies the potential of modern web scraping techniques in streamlining workflows 
and enhancing productivity.
