import { LISTINGS_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { getSinglePost, singlePostId } from "./utils/singleListing.js";

const title = document.querySelector('#edit-post-title');
const description = document.querySelector('#edit-post-description');
const tags = document.querySelector('#edit-post-tags');
const media = document.querySelector('#edit-post-media');
const endsAt = document.querySelector('#edit-deadline');

async function editPost() {
    const post = {
        title: title.value,
        description: description.value || "",
        tags: tags.value ? tags.value.split(' ') : [],
        media: media.value ? [media.value] : [],
        endsAt: endsAt.value,
    };
    const response = await fetchData(`${LISTINGS_API_URL}/${singlePostId()}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(post),
    }, true);
    console.log(response);
}

// Get a reference to the input field
var descriptionInput = document.getElementById("edit-post-description");

// Get a reference to the character count element
var charCount = document.getElementById("char-count");

// Function to update character count display
function updateCharCount() {
    var remainingChars = 280 - descriptionInput.value.length; // Calculate remaining characters
    charCount.textContent = "Characters remaining: " + remainingChars; // Update character count display
}

// Add an event listener to the input field to track changes
descriptionInput.addEventListener("input", updateCharCount);

// Get a reference to the modal
var modal = document.getElementById('editPostModal');

// Manually trigger the event listener once the modal is fully shown
modal.addEventListener('shown.bs.modal', function () {
    updateCharCount();
});



function currentPostData(post) {
    title.value = post.title;
    description.value = post.description;
    tags.value = post.tags;
    media.value = post.media;
    endsAt.value = post.endsAt;
}


async function main() {
    const postId = singlePostId();
    const post = await getSinglePost(postId);
    currentPostData(post);
}
main();

export { editPost };