'use strict'



function addToFavorite(data) {
    return localStorage.setItem('favorites', JSON.stringify(data));
}
function getFavorites() {
    let favorites = localStorage.getItem('favorites');
    return JSON.parse(favorites);
}


export default {
    addToFavorite,
    getFavorites
}