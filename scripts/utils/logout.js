import { removeFromLocalStorage } from "./localStorage.js"

const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', () => {
    removeFromLocalStorage();
    window.location.href = '/index.html';
});