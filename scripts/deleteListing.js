import { LISTINGS_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { singlePostId } from "./utils/singleListing.js";


async function deletePost() {

    try {
        const postId = singlePostId();
        const response = await fetchData(`${LISTINGS_API_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        }, true);
        return { success: true, response }
    }
    catch (error) {
        return { success: false, error }
    }
}

export { deletePost };
