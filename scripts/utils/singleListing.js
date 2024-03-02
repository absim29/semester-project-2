import { LISTINGS_API_URL } from "../constants.js";
import { fetchData } from "../fetchData.js";


function singlePostId() {

    const postId = new URLSearchParams(window.location.search).get('id');
    return postId;
}


async function getSinglePost(id) {

    const singlePostApi = `${LISTINGS_API_URL}/${id}`;
    const currentPost = await fetchData(singlePostApi, {
        method: 'GET',
    }, true);
    return currentPost;
}

export { singlePostId, getSinglePost }