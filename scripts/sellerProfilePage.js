import { PROFILES_API_URL } from "./constants.js";
import { getFromLocalStorage } from "./utils/localStorage.js";
import { userProfileHTML } from "./utils/profileHTML.js";
import { generatePostHtml } from "./utils/generateHTML.js"
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const name = params.get("name");

const sellerAPI = PROFILES_API_URL + `/` + name;

async function sellerUser() {
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.textContent = '';
    try {

        const accessToken = getFromLocalStorage('accessToken');
        // Fetch user profile
        const response = await fetch(sellerAPI, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        }, true);

        const profileData = await response.json();

        // Fetch user listings
        const listingsResponse = await fetch(sellerAPI + `/listings`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const listingsData = await listingsResponse.json();

        // Render profile HTML
        const profile = userProfileHTML(profileData);
        profileContainer.appendChild(profile);

        // Render listings HTML
        const listingsContainer = document.getElementById('listingsContainer');
        listingsContainer.innerHTML = '';

        listingsData.forEach(listing => {
            const listingElement = generatePostHtml(listing);
            listingsContainer.appendChild(listingElement);
        });

    } catch (error) {
        console.error('Error fetching profile:', error);
        profileContainer.innerHTML = '<p>Error fetching profile data.</p>';
    }
};

sellerUser();

