import { checkUserLogin } from "./checkUserLogin.js";
const isLoggedIn = checkUserLogin();


function generatePostHtml(post) {

    const { title, description, media, endsAt, _count } = post;
    const { bids } = _count;

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('col-xs', 'col-md-5', 'col-lg-3', 'col-xl-3', 'mb-5', 'mx-1', 'overflow-hidden', 'd-flex', 'flex-column', 'card', 'py-2', 'shadow-sm', 'text-center');
    postWrapper.style.maxHeight = '700px';
    postWrapper.style.width = '350px';

    const cardLeft = document.createElement('div');
    cardLeft.classList.add('col');

    const image = document.createElement('img');
    image.classList.add('listing-img', 'p-1');
    image.addEventListener('error', function () {
        // Set src attribute to fallback image path if the original image fails to load
        image.src = '../../images/logo.png';
    });

    if (media) {
        image.src = media;
    } else {
        image.src = '../../images/logo.png';
    }
    image.alt = title + "post image";

    const titleElement = document.createElement('h3');
    titleElement.classList.add('text-center');
    titleElement.textContent = title;

    const bidInfo = document.createElement('div');

    if (isLoggedIn) {
        const bidCount = document.createElement('p');
        bidCount.textContent = `Number of Bids: ${bids}`;
        bidInfo.appendChild(bidCount);
    }

    const deadline = document.createElement('p');
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

    const cardRight = document.createElement('div');
    cardRight.classList.add('col', 'd-flex', 'flex-column', 'justify-content-between');
    cardRight.style.overflow = 'hidden';

    const text = document.createElement('p');
    text.textContent = description;
    text.style.overflow = 'scroll';
    text.style.maxWidth = '400px';

    const viewButton = document.createElement('button');
    viewButton.textContent = "View";
    viewButton.classList.add('btn', 'btn-lg', 'bg-warning', 'mt-5', 'px-5', 'text-white', 'w-75', 'mx-auto');

    if (isLoggedIn) {
        viewButton.addEventListener('click', () => {
            // Redirect to the single-listing page with login
            window.location.href = `../../single-listing/?id=${post.id}`;
        });
    } else {
        viewButton.addEventListener('click', () => {
            // Redirect to the single-listing-no-login page
            window.location.href = `../../single-listing-no-login/?id=${post.id}`;
        });
    }

    bidInfo.append(deadline);

    cardLeft.append(image, titleElement, bidInfo);

    cardRight.append(text, viewButton);

    postWrapper.append(cardLeft, cardRight);

    return postWrapper;
}

export { generatePostHtml };