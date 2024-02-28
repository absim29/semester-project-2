import { getSinglePost, singlePostId } from "./utils/singleListing.js";
import { generateSinglePostHtml } from "./utils/generateSinglePostHTML.js";
import { ifAuthor } from "./utils/checkAuthor.js";


const listingContainer = document.querySelector('#listing-display');

async function displaySinglePost() {
    listingContainer.textContent = '';

    // Fetch the result from ifAuthor asynchronously
    const { post: singlePost } = await ifAuthor();

    const currentPost = generateSinglePostHtml(singlePost);

    listingContainer.appendChild(currentPost);
}


async function main() {
    const postId = singlePostId();
    const post = await getSinglePost(postId);
    displaySinglePost([post]);
}

main();