function filerPostHandler(post) {

    if (post.title.toLowerCase().match(searchInput.value.toLowerCase().trim())) {
        return true;
    }
    return false;
    // searchTerm = String(searchTerm);

    // if (post.title && searchTerm && post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
    //     return true;
    // }
    // return false;
}

export { filerPostHandler };