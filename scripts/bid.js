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

        window.location.reload();
    }
    catch (error) {
        console.error('Error creating bid:', error.message);
        document.querySelector('#error-div').innerHTML = '<div class="reg-error pb-2">Your bid must be higher than the current bid.</div>';
    }
}

export { bidOnListing };
