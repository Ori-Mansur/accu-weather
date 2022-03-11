'use strict';

import favoriteService from "@/services/favoriteService";




export default {
    state: {
        favorites: {}
    },
    mutations: {
        setFavorites(state, { favorites }) {
            state.favorites = favorites;
        }
    },
    actions: {
        async addToFavorite(context, { data }) {
            let favorites = { ...context.state.favorites, [data.Key]: data };
            favoriteService.addToFavorite(favorites);
            context.commit({ type: 'setFavorites', favorites });
        },
        async removeFromFavorite(context, { data }) {
            let favorites = { ...context.state.favorites };
            delete favorites[data];
            favoriteService.addToFavorite(favorites);
            context.commit({ type: 'setFavorites', favorites });
        },
        async getFavorites(context) {
            let favorites = favoriteService.getFavorites();
            context.commit({ type: 'setFavorites', favorites });
        }
    },
    getters: {
        favorites(state) {
            return state.favorites;
        }
    }

};
