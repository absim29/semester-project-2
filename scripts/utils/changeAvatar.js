import { PROFILES_API_URL } from "../constants.js";
import { getFromLocalStorage } from "../utils/localStorage.js";

const avatarForm = document.querySelector('#avatarForm');
const avatarURL = document.querySelector('#avatar');

async function changeAvatar(avatar) {
    const name = getFromLocalStorage('userName');
    const accessToken = getFromLocalStorage('accessToken');
    try {
        const postBody = JSON.stringify(avatar);
        const changeAvatarResponse = await fetch(`${PROFILES_API_URL}/${name}/media`, {
            method: 'PUT',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        }, true);
        console.log(changeAvatarResponse);
        window.location.href = '/profile';
    }
    catch (error) {
        document.querySelector('#avatar-error').innerHTML = '<div class="reg-error pb-2">Error: Cannot change avatar</div>';

    }
}

avatarForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newAvatar = {
        avatar: avatarURL.value,
    };
    changeAvatar(newAvatar);
});