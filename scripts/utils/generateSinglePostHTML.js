function generateSinglePostHtml(post) {
    const { title, description, media, endsAt, _count } = post;
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

    const bidCount = document.createElement('p');
    bidCount.classList.add('h5');
    bidCount.textContent = `Number of Bids: ${bids}`;

    const deadline = document.createElement('p');
    deadline.classList.add('h5');
    deadline.textContent = `Ends At: ${endsAt}`;

    const cardTwo = document.createElement('div');
    cardTwo.classList.add('col', 'd-flex', 'gap-3');

    const listingInfo = document.createElement('div');
    listingInfo.classList.add('col', 'single-text', 'd-flex', 'flex-column', 'align-self-center');

    const line = document.createElement('hr');
    line.classList.add('hr', 'hr-blurry');

    const text = document.createElement('p');
    text.textContent = description;

    const viewButton = document.createElement('button');
    viewButton.textContent = "Bid";
    viewButton.classList.add('btn', 'btn-lg', 'bg-info', 'mt-5', 'px-5', 'text-white', 'w-50', 'mx-auto');

    bidInfo.append(bidCount, deadline);

    listingInfo.append(titleElement, text);

    cardOne.append(image, listingInfo);

    cardTwo.append(bidInfo, viewButton);

    postWrapper.append(cardOne, line, cardTwo);

    return postWrapper;
}

export { generateSinglePostHtml };