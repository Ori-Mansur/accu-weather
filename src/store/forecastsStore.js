'use strict';

import forecastsService from "@/services/forecastsService";




export default {
    state: {
        days: [],
        current: null,
        forecastsFavorites: {}
    },
    mutations: {
        setDays(state, { forecasts, filed }) {
            state[filed] = forecasts;
        },
        setForecastsFavorites(state, { forecasts, key }) {
            state.forecastsFavorites = {
                ...state.forecastsFavorites,
                [key]: forecasts
            }
        }
    },
    actions: {
        async forecastsDays(context, { data }) {
            const forecasts = await forecastsService.forecastsDays(data.key, data.daysNum);
            context.commit({ type: 'setDays', forecasts, filed: data.filed || 'days' });
        },
        async forecastsFavorites(context, { data }) {
            const forecasts = await forecastsService.forecastsDays(data.key, data.daysNum);
            context.commit({ type: 'setForecastsFavorites', forecasts, key: data.key });
        }
    },
    getters: {
        days(state) {
            return state.days
        },
        currentForecast(state) {
            return state.current
        },
        forecastsFavorites(state) {
            return state.forecastsFavorites
        }
    }
};
