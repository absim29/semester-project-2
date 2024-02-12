import { LISTINGS_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { checkUserLogin } from "./utils/checkUserLogin.js"
import { displayListings } from "./utils/allListings.js";
import { filerPostHandler } from "./utils/searchUtil.js"

let listings = [];

const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', () => {
    displayListings(listings, filerPostHandler);
});

// searchInput.addEventListener('input', () => {
//     const searchTerm = searchInput.value.trim();
//     displayListings(listings, (post) => filerPostHandler(post, searchTerm));
// });

async function main() {
    const isLoggedIn = checkUserLogin();

    if (isLoggedIn) {
        listings = await fetchData(LISTINGS_API_URL, { method: 'GET' }, true);
        displayListings(listings, filerPostHandler);
    } else {
        console.log('Not logged in');
    }

    // try {
    //     listings = await fetchData(LISTINGS_API_URL, { method: 'GET' }, true);
    //     displayListings(listings, filerPostHandler);
    // } catch (error) {
    //     console.error('Error fetching listings:', error);
    // }

}
main();