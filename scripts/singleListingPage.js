import { getSinglePost, singlePostId } from "./utils/singleListing.js";
import { generateSinglePostHtml } from "./utils/generateSinglePostHTML.js";
import { ifAuthor } from "./utils/checkAuthor.js";
import { deletePost } from "./deleteListing.js";
import { editPost } from "./editListing.js";

const listingContainer = document.querySelector('#listing-display');
const postForm = document.querySelector('#editPostForm');

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
        editButton.id = 'edit-button';
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#editPostModal');
        editButton.textContent = 'Edit';

        postForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await editPost(post);
            console.log('Post edited successfully.');
            window.location.reload();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-lg', 'bg-warning', 'mt-5', 'px-5', 'text-white', 'w-50', 'mx-auto');
        deleteButton.id = 'delete-button';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await deletePost(post);
            console.log('Post deleted successfully.');
            window.location.href = '/profile';
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