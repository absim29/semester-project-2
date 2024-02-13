import { getSinglePost, singlePostId } from "./utils/singleListing.js";
import { generateSinglePostHtml } from "./utils/generateSinglePostHTML.js";

const listingContainer = document.querySelector('#listing-display');

async function displaySinglePost(listing) {
    listingContainer.textContent = '';

    listing.forEach((post) => {
        const currentPost = generateSinglePostHtml(post);
        listingContainer.appendChild(currentPost);
    });
}

async function main() {
    const postId = singlePostId();
    const post = await getSinglePost(postId);
    displaySinglePost([post]);
}

main();