import { LISTINGS_API_URL } from "../constants.js";
import { fetchData } from "../fetchData.js";
import { singlePostId } from "./singleListing.js";
import { getFromLocalStorage } from "./localStorage.js";


const checkAuthor = (userEmail, postUserEmail) => userEmail === postUserEmail;
const userEmail = getFromLocalStorage('userEmail');


async function ifAuthor() {

    try {
        const postId = singlePostId();

        const url = `${LISTINGS_API_URL}/${postId}?_seller=true`;

        const post = await fetchData(url, { method: 'GET' }, true);

        const isAuthor = checkAuthor(userEmail, post.seller.email);
        return { post, isAuthor };

    }
    catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

export { ifAuthor };
