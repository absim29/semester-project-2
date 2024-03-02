import { LOGIN_API_URL } from "./constants.js";
import { fetchData } from "./fetchData.js";
import { displayListings } from "./utils/allListings.js";
import { addToLocalStorage } from "./utils/localStorage.js";


const form = document.querySelector('#loginForm');
const email = document.querySelector('#login-email');
const password = document.querySelector('#login-password');


async function loginUser(user) {

    try {
        const postBody = JSON.stringify(user);
        const userLoginData = await fetchData(LOGIN_API_URL, {
            method: 'POST',
            body: postBody,
        }, false);

        const token = userLoginData.accessToken;
        addToLocalStorage('accessToken', token);
        addToLocalStorage('userEmail', userLoginData.email);
        addToLocalStorage('userName', userLoginData.name);
        window.location.href = '../listings';

    } catch (error) {
        document.querySelector('#login-error').innerHTML = '<div class="login-error pb-2">Wrong email or password</div>';
    }
};


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userLoginDetails = {
        email: email.value,
        password: password.value,
    };
    await loginUser(userLoginDetails);
    displayListings();
    window.location.href = '/profile';
});