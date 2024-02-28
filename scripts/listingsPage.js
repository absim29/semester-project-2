import { LISTINGS_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { checkUserLogin } from "./utils/checkUserLogin.js"
import { displayListings } from "./utils/allListings.js";
import { filterPostHandler } from "./utils/searchUtil.js"

let listings = [];
let offset = 0;
const limit = 100;

const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', () => {
    displayListings(listings, filterPostHandler);
});

async function loadMoreListings() {
    offset += limit;
    const newlistings = await fetchData(`${LISTINGS_API_URL}?sort=created&limit=${limit}&offset=${offset}`, { method: 'GET' }, true);
    listings = listings.concat(newlistings);
    displayListings(listings, filterPostHandler);
}

async function main() {
    const isLoggedIn = checkUserLogin();

    if (isLoggedIn) {
        listings = await fetchData(`${LISTINGS_API_URL}?sort=created&limit=${limit}&offset=${offset}`, { method: 'GET' }, true);
        displayListings(listings, filterPostHandler);
    } else {
        console.log('Not logged in');
    }
}
main();

const loadMoreButton = document.querySelector('#loadMoreButton');
loadMoreButton.addEventListener('click', loadMoreListings);