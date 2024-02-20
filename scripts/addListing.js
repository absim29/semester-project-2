import { LISTINGS_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { getFromLocalStorage } from "./utils/localStorage.js";

const newPost = document.querySelector('#newPostForm');

const title = document.querySelector('#post-title');
const description = document.querySelector('#post-description');
const tags = document.querySelector('#post-tags');
const media = document.querySelector('#post-media');
const endsAt = document.querySelector('#deadline');

async function addNewPost() {
    const post = {
        title: title.value, // Required
        description: description.value || "", // Optional, if description is not provided, an empty string is used
        tags: tags.value ? tags.value.split(' ') : [], // Optional, if tags are not provided, an empty array is used
        media: media.value ? [media.value] : [], // Optional, if media is not provided, an empty array is used
        endsAt: endsAt.value, // Required - Convert deadline value to a Date object and then to ISO string
    };
    console.log(post);
    const accessToken = getFromLocalStorage('accessToken');
    const response = await fetchData(LISTINGS_API_URL, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }, true);
    console.log(response);
}

newPost.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await addNewPost();
        console.log(response);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.href = '/listings';
    } catch (error) {
        console.error('Error adding post:', error);
        document.querySelector('#post-error').innerHTML = '<div class="reg-error pb-2">Could not add new listing.</div>';

    }
});