function userProfileHTML(profileData) {
    const { name, email, avatar, credits, _count } = profileData;
    const { listings } = _count;

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('col', 'd-flex', 'flex-column', 'align-items-center');

    const cardOne = document.createElement('div');
    cardOne.classList.add('col', 'd-flex', 'flex-lg-row', 'flex-md-row', 'flex-column', 'gap-3');

    const profilePic = document.createElement('img');
    profilePic.classList.add('single-img', 'img-fluid');
    profilePic.addEventListener('error', function () {
        // Set src attribute to fallback image path if the original image fails to load
        profilePic.src = '../../images/logo.png';
    });
    if (avatar) {
        profilePic.src = avatar;
    } else {
        profilePic.src = '../../images/logo.png';
    }
    profilePic.alt = name;

    const nameElement = document.createElement('h3');
    nameElement.classList.add('text-center');
    nameElement.textContent = name;

    const profileInfo = document.createElement('div');

    const emailElement = document.createElement('p');
    emailElement.classList.add('h5');
    emailElement.textContent = `Email: ${email}`;

    const creditCount = document.createElement('p');
    creditCount.classList.add('h5');
    creditCount.textContent = `Credits: ${credits}`;

    const cardTwo = document.createElement('div');
    cardTwo.classList.add('col', 'd-flex', 'align-items-center', 'mb-2', 'w-75');

    const listingInfo = document.createElement('div');
    listingInfo.classList.add('col', 'single-text', 'd-flex', 'flex-column', 'align-self-center');

    const line = document.createElement('hr');
    line.classList.add('hr', 'hr-blurry');

    const listingsCount = document.createElement('h4');
    listingsCount.classList.add('w-50');
    listingsCount.textContent = `Listings: ${listings}`;

    const listingsContainer = document.createElement('div');
    listingsContainer.classList.add('col', 'd-flex', 'flex-row', 'flex-wrap', 'justify-content-center');
    listingsContainer.id = 'listingsContainer';

    const addPostButton = document.createElement('button');
    addPostButton.textContent = "New Listing";
    addPostButton.classList.add('btn', 'btn-lg', 'bg-warning', 'text-white', 'w-50', 'mx-auto');

    listingInfo.append(creditCount);

    profileInfo.append(nameElement, emailElement, creditCount);

    cardOne.append(profilePic, profileInfo);

    cardTwo.append(listingsCount, addPostButton);

    postWrapper.append(cardOne, line, cardTwo, listingsContainer);

    return postWrapper;
}

export { userProfileHTML };