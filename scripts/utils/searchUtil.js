function filterPostHandler(post) {

    if (post.title.toLowerCase().match(searchInput.value.toLowerCase().trim())) {
        return true;
    }
    return false;
}

export { filterPostHandler };