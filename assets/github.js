const owner = 'Ultimate15k';
const repo = 'FrihedenAddon';

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

async function fetchReleaseData() {
    try {
        const response = await fetch(apiUrl);
        const releases = await response.json();

        if (releases.length > 0) {
            displayChangelog(releases);
        } else {
            displayError("No releases found.");
        }
    } catch (error) {
        displayError("Error fetching data from GitHub API.");
    }
}

async function fetchLatestReleaseData() {
    try {
        const response = await fetch(apiUrl);
        const releases = await response.json();

        if (releases.length > 0) {
            const assetUrl = releases[0].assets[0].browser_download_url;

            const downloadLink = document.createElement("a");
            downloadLink.href = assetUrl;
            downloadLink.download = "FrihedenAddon-release.jar";
            document.body.appendChild(downloadLink);

            downloadLink.click();

            document.body.removeChild(downloadLink);

            setTimeout(() => {
                window.location.href = "thanks";
            }, 2000);
        } else {
            console.error("No releases found.");
        }
    } catch (error) {
        console.error("Error fetching data from GitHub API.", error);
    }
}

function displayChangelog(releases) {
    const changelogContainer = document.getElementById('changelog-container');
    const converter = new showdown.Converter();
    let allReleaseNotesHTML = ''; // To store all the release notes

    for (const release of releases) {
        const releaseTag = release.tag_name;
        let releaseNote = release.body;

        // Find occurrences of "Don't download!" and wrap them in a <span> with a CSS class
        releaseNote = releaseNote.replace(/(Don't download!)/gi, '<span class="highlighted">$1</span>');

        const releaseTagElement = `<h2>Release Tag: ${releaseTag}</h2>`;
        const releaseNoteHTML = converter.makeHtml(releaseNote);
        allReleaseNotesHTML += `<div class="release">${releaseTagElement}<div class="release-note-text">${releaseNoteHTML}</div></div>`;
    }

    // Append all the release notes to the changelog container
    changelogContainer.innerHTML = allReleaseNotesHTML;
}

function displayError(message) {
    const changelogContainer = document.getElementById('changelog-container');
    const errorElement = document.createElement('p');
    errorElement.textContent = `Error: ${message}`;
    changelogContainer.appendChild(errorElement);
}

fetchReleaseData();
