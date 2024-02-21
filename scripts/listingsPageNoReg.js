import { LISTINGS_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { displayListings } from "./utils/allListings.js";
import { filerPostHandler } from "./utils/searchUtil.js"

let listings = [];
let offset = 0;
const limit = 100;

const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', () => {
    displayListings(listings, filerPostHandler);
});

async function loadMoreListings() {
    offset += limit;
    const newlistings = await fetchData(`${LISTINGS_API_URL}?sort=created&limit=${limit}&offset=${offset}`, { method: 'GET' }, true);
    listings = listings.concat(newlistings);
    displayListings(listings, filerPostHandler);
}

async function main() {
    listings = await fetchData(`${LISTINGS_API_URL}?sort=created&limit=${limit}&offset=${offset}`, { method: 'GET' }, true);
    displayListings(listings, filerPostHandler);
}
main();

const loadMoreButton = document.querySelector('#loadMoreButton');
loadMoreButton.addEventListener('click', loadMoreListings);