function generatePostHtml(post) {
    const { title, description, media, endsAt, _count } = post;
    const { bids } = _count;

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('col-xs', 'col-md-5', 'col-lg-3', 'col-xl-3', 'mb-5', 'mx-1', 'overflow-hidden', 'd-flex', 'flex-column', 'card', 'py-2', 'shadow-sm', 'text-center');

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
    image.alt = title;

    const titleElement = document.createElement('h3');
    titleElement.classList.add('text-center');
    titleElement.textContent = title;

    const bidInfo = document.createElement('div');

    const bidCount = document.createElement('p');
    bidCount.textContent = `Number of Bids: ${bids}`;

    const deadline = document.createElement('p');
    deadline.textContent = `Ends At: ${endsAt}`;

    const cardRight = document.createElement('div');
    cardRight.classList.add('col', 'd-flex', 'flex-column', 'justify-content-between');


    const text = document.createElement('p');
    text.textContent = description;

    const viewButton = document.createElement('button');
    viewButton.textContent = "View";
    viewButton.classList.add('btn', 'btn-lg', 'bg-warning', 'mt-5', 'px-5', 'text-white', 'w-75', 'mx-auto');
    viewButton.addEventListener('click', () => {
        window.location.href = `/single-listing/?id=${post.id}`;
    });



    bidInfo.append(bidCount, deadline);

    cardLeft.append(image, titleElement, bidInfo);

    cardRight.append(text, viewButton);

    postWrapper.append(cardLeft, cardRight);

    return postWrapper;
}

export { generatePostHtml };