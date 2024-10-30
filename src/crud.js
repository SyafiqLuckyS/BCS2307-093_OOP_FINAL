const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

// Get references to buttons and input fields
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var btnDelete = document.getElementById('btnDelete');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var fileTable = document.getElementById('fileTable').getElementsByTagName('tbody')[0];

// Define the path for storing files
let pathName = path.join(__dirname, 'Files');

// Create the "Files" folder if it doesn't exist
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName, { recursive: true });
}

// Function to load existing files into the table
function loadFiles() {
    fs.readdir(pathName, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }
        fileTable.innerHTML = ''; // Clear the table before populating
        files.forEach(file => {
            if (file.endsWith('.txt')) {
                var row = fileTable.insertRow();
                var cellName = row.insertCell(0);
                var cellAction = row.insertCell(1);
                cellName.textContent = file; // Display file name
                cellAction.innerHTML = `<button class="btn btn-default" onclick="readFile('${file}')">Read</button>
                                        <button class="btn btn-default" onclick="deleteFile('${file}')">Delete</button>`;
            }
        });
    });
}

// Event listener for creating a text file
btnCreate.addEventListener('click', function() {
    const name = fileName.value.trim();
    if (!name) {
        alert('Please enter a file name.');
        return;
    }

    let file = path.join(pathName, name + '.txt'); // Ensure .txt extension
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err) {
        if (err) {
            console.error(`Error writing file: ${err}`);
            return alert('Error creating file: ' + err.message);
        }
        alert(name + " text file was created");
        fileContents.value = ''; // Clear contents after creation
        fileName.value = ''; // Clear filename field
        loadFiles(); // Refresh the file list
    });
});

// Function to read a file and populate input fields
function readFile(name) {
    let file = path.join(pathName, name);
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return alert('Error reading file: ' + err.message);
        }
        fileContents.value = data; // Populate textarea with file contents
        fileName.value = name.replace('.txt', ''); // Set filename without .txt
    });
}

// Event listener for updating a text file
btnUpdate.addEventListener('click', function() {
    const name = fileName.value.trim() + '.txt'; // Get the filename
    if (!name) {
        alert('Please enter a file name to update.');
        return;
    }

    let file = path.join(pathName, name);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err) {
        if (err) {
            console.error(`Error updating file: ${err}`);
            return alert('Error updating file: ' + err.message);
        }
        alert(name + " text file was updated");
        fileContents.value = ''; // Clear contents after update
        fileName.value = ''; // Clear filename field
        loadFiles(); // Refresh the file list
    });
});

// Function to delete a file
function deleteFile(name) {
    let file = path.join(pathName, name);
    fs.unlink(file, function(err) {
        if (err) {
            console.error(`Error deleting file: ${err}`);
            return alert('Error deleting file: ' + err.message);
        }
        alert(name + " text file was deleted");
        loadFiles(); // Refresh the file list after deletion
    });
}

// Load existing files when the application starts
loadFiles();
