import { LISTINGS_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { singlePostId } from "./utils/singleListing.js";
import { getFromLocalStorage } from "./utils/localStorage.js";


async function bidOnListing(bidAmount) {
    try {
        const BID_API_URL = `${LISTINGS_API_URL}/${singlePostId()}/bids`;
        const accessToken = getFromLocalStorage('accessToken');
        const response = await fetchData(BID_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                amount: bidAmount
            }),
        }, true)
        console.log(response);
    }
    catch (error) {
        console.error('Error creating bid:', error.message);
    }
}

export { bidOnListing };
