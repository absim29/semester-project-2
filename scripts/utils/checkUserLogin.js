function checkUserLogin() {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return true;
    } else {
        return false;
    }
}
export { checkUserLogin };