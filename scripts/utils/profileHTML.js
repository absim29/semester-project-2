import { getSinglePost } from "./singleListing.js";


function userProfileHTML(profileData) {

    const { name, email, avatar, credits, wins, _count } = profileData;
    const { listings } = _count;

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('col', 'd-flex', 'flex-column', 'align-items-center');

    const cardOne = document.createElement('div');
    cardOne.classList.add('col', 'd-flex', 'flex-lg-row', 'flex-md-row', 'flex-column', 'gap-3');

    const profilePic = document.createElement('img');
    profilePic.classList.add('single-img', 'img-fluid', 'pe-auto');
    profilePic.id = "profile-pic";
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
    profilePic.setAttribute('data-bs-toggle', 'modal');
    profilePic.setAttribute('data-bs-target', '#avatarModal');

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

    const winElement = document.createElement('p');
    winElement.classList.add('h5');
    winElement.textContent = `Current wins: ${wins.length}`;

    // If there are wins, create a list to display the names
    if (wins.length > 0) {
        const winList = document.createElement('ul');
        wins.forEach(async (win) => {
            const post = await getSinglePost(win);
            const postName = post.title;

            const listItem = document.createElement('li');

            const link = document.createElement('a');
            link.classList.add('text-warning');
            link.style.textDecoration = 'none';
            link.textContent = postName;
            link.href = `../../single-listing/?id=${win}`;
            listItem.appendChild(link);
            winList.appendChild(listItem);
        });
        winElement.appendChild(winList);
    }
    else {
        // If there are no wins, display a message
        const noWinsMessage = document.createElement('p');
        noWinsMessage.textContent = "No wins yet.";
        winElement.appendChild(noWinsMessage);
    }

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


    listingInfo.append(creditCount);

    profileInfo.append(nameElement, emailElement, creditCount, winElement);

    cardOne.append(profilePic, profileInfo);

    cardTwo.append(listingsCount);

    postWrapper.append(cardOne, line, cardTwo, listingsContainer);

    return postWrapper;
}

export { userProfileHTML };