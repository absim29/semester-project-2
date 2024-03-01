
import { fetchData } from "../fetchData.js";
import { singlePostId } from "./singleListing.js";
import { LISTINGS_API_URL } from "../constants.js";


async function bidAmounts() {
    try {
        const BID_API_URL = `${LISTINGS_API_URL}/${singlePostId()}/?_bids=true`;
        const response = await fetchData(BID_API_URL, {
            method: 'GET',
        }, true)
        const bids = response.bids;
        bids.forEach(bid => {
            const bidAmount = bid.amount;
            console.log('Bid Amount:', bidAmount);
        });
        return bids;
    } catch (error) {
        console.error('Error fetching bid amounts:', error);
        throw error;
    }

}

export { bidAmounts };
