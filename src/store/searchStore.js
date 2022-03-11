'use strict';

import searchService from "@/services/searchService";

export default {
    state: {
        cities: [],
        selectedCity: null,
        locationCity: null
    },
    mutations: {
        setCities(state, { cities }) {
            state.cities = cities;
        },
        setSelectedCity(state, { cities }) {
            state.selectedCity = cities;
        },
        setLocationCity(state, { cities }) {
            state.locationCity = cities;
        },
    },
    actions: {
        async searchCity(context, { q }) {
            const cities = await searchService.search(q);
            context.commit({ type: 'setCities', cities });
        },
        async searchByGeoLocation(context, { q }) {
            const cities = await searchService.searchByGeoLocation(q);
            context.commit({ type: 'setSelectedCity', cities });
            context.commit({ type: 'setLocationCity', cities });
        }

    },
    getters: {
        cities(state) {
            return state.cities;
        },
        selectedCity(state) {
            return state.selectedCity;
        },
        locationCity(state) {
            return state.locationCity;
        },
    }

};
