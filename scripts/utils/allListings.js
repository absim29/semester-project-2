import { generatePostHtml } from "./generateHTML.js";

const listingsContainer = document.querySelector('#listing-display');

async function displayListings(listings, filterCallback) {
    listingsContainer.textContent = '';

    listings.filter(filterCallback).forEach((post) => {
        const currentPost = generatePostHtml(post);
        listingsContainer.appendChild(currentPost);
    });

}

export { displayListings };