'use strict';

import locationService from "@/services/locationService";




export default {
    state: {
        geolocation: []
    },
    mutations: {
        setLocation(state, { location }) {
            state.geolocation = location;
        }
    },
    actions: {
        async getUserLocation(context) {
            const location = await locationService.getCoordinates();
            context.commit({ type: 'setLocation', location });
        }
    },
    getters: {
        geolocation(state) {
            return state.geolocation;
        }
    }
};
