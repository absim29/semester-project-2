import { getSinglePost, singlePostId } from "./utils/singleListing.js";
import { generateSinglePostHtml } from "./utils/generateSinglePostHTML.js";
import { ifAuthor } from "./utils/checkAuthor.js";

const listingContainer = document.querySelector('#listing-display');

async function displaySinglePost(post) {
    listingContainer.textContent = '';

    // Fetch the result from ifAuthor asynchronously
    const { post: singlePost, isAuthor } = await ifAuthor();

    const currentPost = generateSinglePostHtml(singlePost);

    if (isAuthor) {
        // Create edit and delete buttons only if the current user is the author
        const extraButtons = document.createElement('div');
        extraButtons.classList.add('row', 'd-flex', 'flex-row', 'flex-nowrap', 'justify-content-center', 'gap-2');

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-lg', 'bg-warning', 'mt-5', 'px-5', 'text-white', 'w-50', 'mx-auto');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            // Handle edit functionality
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-lg', 'bg-warning', 'mt-5', 'px-5', 'text-white', 'w-50', 'mx-auto');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            // Handle delete functionality
        });

        extraButtons.append(editButton, deleteButton);
        currentPost.appendChild(extraButtons);
    }

    listingContainer.appendChild(currentPost);
}


async function main() {
    const postId = singlePostId();
    const post = await getSinglePost(postId);
    displaySinglePost([post]);
}

main();