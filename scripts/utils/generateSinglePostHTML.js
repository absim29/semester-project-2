import { ifAuthor } from "./checkAuthor.js";
import { bidOnListing } from "../bid.js";
import { checkUserLogin } from "./checkUserLogin.js";
const { isAuthor } = await ifAuthor();
const isLoggedIn = checkUserLogin();

function generateSinglePostHtml(post) {

    const { title, description, media, endsAt, _count, seller } = post;
    const { bids } = _count;

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('col', 'd-flex', 'flex-column', 'align-items-center');

    const cardOne = document.createElement('div');
    cardOne.classList.add('col', 'd-flex', 'flex-lg-row', 'flex-md-row', 'flex-column', 'gap-3');

    const image = document.createElement('img');
    image.classList.add('single-img', 'img-fluid');
    image.addEventListener('error', function () {
        // Set src attribute to fallback image path if the original image fails to load
        image.src = '../../images/logo.png';
    });
    if (media) {
        image.src = media;
    } else {
        image.src = '../../images/logo.png';
    }
    image.alt = title;

    const titleElement = document.createElement('h3');
    titleElement.classList.add('text-center');
    titleElement.textContent = title;

    const bidInfo = document.createElement('div');
    bidInfo.id = "bidInfo";

    if (isLoggedIn) {
        const bidCount = document.createElement('p');
        bidCount.classList.add('h5');
        bidCount.textContent = `Number of Bids: ${bids}`;
        bidInfo.appendChild(bidCount);
    }

    const deadline = document.createElement('p');
    deadline.classList.add('h5');

    // Parse the date string and create a Date object
    const endDate = new Date(endsAt);

    // Format the date string in a user-friendly format
    const formattedEndDate = endDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    // Set the text content of the deadline paragraph element
    deadline.textContent = `Ends At: ${formattedEndDate}`;

    const cardTwo = document.createElement('div');
    cardTwo.classList.add('col', 'd-flex', 'gap-3');

    const listingInfo = document.createElement('div');
    listingInfo.classList.add('col', 'single-text', 'd-flex', 'flex-column', 'align-items-start');

    const line = document.createElement('hr');
    line.classList.add('hr', 'hr-blurry');

    const text = document.createElement('p');
    text.textContent = description;

    // Conditionally create the "Bid" button based on whether the current user is the author
    if (isLoggedIn && !isAuthor) {
        const bidForm = document.createElement('form');
        bidForm.id = "bidForm";

        // Create a label for the number input
        const label = document.createElement('label');
        label.setAttribute('for', 'bidAmount');
        label.textContent = 'Bid amount (1-100):';

        // Create the number input form
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = 'bidAmount';
        numberInput.name = 'bidAmount';
        numberInput.setAttribute('min', '1');
        numberInput.setAttribute('max', '100');
        numberInput.classList.add('form-control');

        const viewButton = document.createElement('button');
        viewButton.textContent = "Bid";
        viewButton.id = "bidButton";
        viewButton.classList.add('btn', 'btn-lg', 'bg-info', 'mt-5', 'px-5', 'text-white', 'w-80', 'mx-auto', 'd-flex');

        bidForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            let bidAmount = numberInput.value.trim();
            bidAmount = parseFloat(bidAmount);

            if (isNaN(bidAmount) || bidAmount < 1 || bidAmount > 100) {
                alert('Bid amount must be a number between 1 and 100.');
                return; // Prevent further execution of the function
            }
            console.log('Bid amount:', bidAmount);

            await bidOnListing(bidAmount);
            window.location.reload();
        });


        bidForm.append(label, numberInput, viewButton);
        cardTwo.appendChild(bidForm);

        const sellerElement = document.createElement('p');
        sellerElement.classList.add('h5');
        const sellerAnchor = document.createElement('a');
        sellerAnchor.classList.add('text-warning');
        sellerAnchor.style.textDecoration = 'none';
        sellerAnchor.href = `../../seller-page/?name=${seller.name}`;
        sellerAnchor.textContent = seller.name;
        sellerElement.textContent = `Seller: `;
        sellerElement.appendChild(sellerAnchor);
        bidInfo.appendChild(sellerElement);


    }

    bidInfo.append(deadline);

    listingInfo.append(titleElement, text);

    cardOne.append(image, listingInfo);

    cardTwo.append(bidInfo);

    postWrapper.append(cardOne, line, cardTwo);

    return postWrapper;
}

export { generateSinglePostHtml };