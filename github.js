// Replace with your GitHub repository information
const owner = 'Ultimate15k';
const repo = 'FrihedenAddon';

// GitHub API URL for releases
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

// Function to fetch data from GitHub API
async function fetchReleaseData() {
    try {
        const response = await fetch(apiUrl);
        const releases = await response.json();

        // Assuming releases are sorted in descending order of release date
        if (releases.length > 0) {
            displayChangelog(releases);
        } else {
            displayError("No releases found.");
        }
    } catch (error) {
        displayError("Error fetching data from GitHub API.");
    }
}

// Function to display the changelog on the page
function displayChangelog(releases) {
    const changelogContainer = document.getElementById('changelog-container');
    const converter = new showdown.Converter();
    let allReleaseNotesHTML = ''; // To store all the release notes

    for (const release of releases) {
        const releaseTag = release.tag_name;
        const releaseNote = release.body;

        const releaseTagElement = `<h2>Release Tag: ${releaseTag}</h2>`;
        const releaseNoteHTML = converter.makeHtml(releaseNote);
        allReleaseNotesHTML += `<div class="release">${releaseTagElement}<div class="release-note-text">${releaseNoteHTML}</div></div>`;
    }

    // Append all the release notes to the changelog container
    changelogContainer.innerHTML = allReleaseNotesHTML;
}

// Function to display an error message on the page
function displayError(message) {
    const changelogContainer = document.getElementById('changelog-container');
    const errorElement = document.createElement('p');
    errorElement.textContent = `Error: ${message}`;
    changelogContainer.appendChild(errorElement);
}

// Fetch the release data when the page loads
fetchReleaseData();
