function generatePostHtml(post) {
    const { title, body, media } = post;

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('conl', 'd-flex');

    const cardLeft = document.createElement('div');
    cardLeft.classList.add('col');

    const image = document.createElement('img');
    image.classList.add('img-fluid');
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

    const price = document.createElement('p');
    price.textContent = price;

    const deadline = document.createElement('p');
    deadline.textContent = deadline;

    const cardRight = document.createElement('div');
    cardRight.classList.add('col', 'd-flex', 'flex-column', 'justify-content-between');


    const text = document.createElement('p');
    text.textContent = description;

    const viewButton = document.createElement('button');
    viewButton.classList.add('btn', 'btn-lg', 'bg-warning', 'mt-5', 'px-5', 'text-white');
    // viewButton.addEventListener('click', () => {
    //     window.location.href = `/single-listing/?id=${post.id}`;
    // });



    bidInfo.append(price, deadline);

    cardLeft.append(image, title, bidInfo);

    cardRight.append(text, viewButton);

    postWrapper.appendChild(cardLeft, cardRight);

    return postWrapper;
}

export { generatePostHtml };