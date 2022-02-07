const paginate = (followers) => {
    const itemsPerPage = 10;
    const noOfPages = Math.ceil(followers.length / itemsPerPage);

    // Make Array of Array [ [10 follower] [10 follower] ... ] instead of single arr [100 follower]
    const newFollowers = Array.from({length: noOfPages}, (_, index) => {
        const start = index * itemsPerPage;
        return followers.slice(start, start + itemsPerPage);
    })

    return newFollowers;
}

export default paginate
