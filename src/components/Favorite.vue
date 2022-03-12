<template>
  <v-container>
    <v-divider></v-divider>

    <v-card class="d-flex pa-2 justify-space-around" outlined tile>
      <span v-if="!favoritesList.length">No Favorites</span>
      <v-card
        max-width="220"
        v-for="(favorite, idx) in favoritesList"
        :key="idx"
        @click="setSelectedCity(favorite)"
        :to="'/'"
      >
        <v-btn icon @click="removeFromFavorite(favorite.Key)">
          <v-icon color="deep-orange">mdi-heart</v-icon>
        </v-btn>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6" :title="favorite.LocalizedName">
              {{ favorite.LocalizedName }}
              <v-list-item-subtitle>
                {{ favorite.Country.LocalizedName }}
              </v-list-item-subtitle>
            </v-list-item-title>
            <v-list-item-subtitle
              v-if="forecastsFavorites && forecastsFavorites[favorite.Key]"
            >
              {{ forecastByKey(favorite.Key).Date | dateFormat }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="forecastsFavorites && forecastsFavorites[favorite.Key]"
            >
              {{ forecastByKey(favorite.Key).Day.IconPhrase }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <div v-if="forecastsFavorites && forecastsFavorites[favorite.Key]">
          <v-card-text>
            <v-row align="center">
              <v-col class="text-h4" cols="6">
                {{ forecastByKey(favorite.Key).Temperature.Maximum.Value + "\xB0" }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-list-item align="center">
            <v-list-item-subtitle>
              {{ forecastByKey(favorite.Key).Temperature.Maximum.Value + "\xB0" }} /
              {{ forecastByKey(favorite.Key).Temperature.Minimum.Value + "\xB0" }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <font-awesome-icon icon="wind" />
            </v-list-item-icon>
            <v-list-item-subtitle>
              {{
                forecastByKey(favorite.Key).Day.Wind.Speed.Value +
                forecastByKey(favorite.Key).Day.Wind.Speed.Unit
              }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <font-awesome-icon icon="cloud-rain" />
            </v-list-item-icon>
            <v-list-item-subtitle
              >{{
                forecastByKey(favorite.Key).Day.RainProbability
              }}%</v-list-item-subtitle
            >
          </v-list-item>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text :href="forecastByKey(favorite.Key).Link" target="_blank">
              Full Report
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Favorite",
  data: () => ({}),
  computed: {
    favoritesList() {
      return Object.values(this.favorites);
    },
    favorites() {
      return this.$store.getters.favorites;
    },
    forecastsFavorites() {
      return this.$store.getters.forecastsFavorites;
    },
    days() {
      return this.$store.getters.days;
    },
  },
  methods: {
    async getFavoritesWeather() {
      try {
        var promises = Object.keys(this.favorites).map((key) => {
          return this.$store.dispatch({
            type: "forecastsFavorites",
            data: { key, daysNum: "1day" },
          });
        });
        await Promise.all(promises);
      } catch (error) {
        console.error(error);
      }
    },
    setSelectedCity(cities) {
      this.$store.dispatch({
        type: "setSelectedCity",
        cities,
      });
    },
    forecastByKey(key) {
      return this.forecastsFavorites[key]?.DailyForecasts[0] || null;
    },
    removeFromFavorite(key) {
      this.$store.dispatch({
        type: "removeFromFavorite",
        data: key,
      });
    },
  },
  watch: {
    favorites: {
      immediate: true,
      deep: true,
      async handler() {
        if (Object.keys(this.favorites).length) {
          this.getFavoritesWeather();
        } else if (!Object.keys(this.favorites).length) {
          await this.$store.dispatch({
            type: "getFavorites",
          });
        }
      },
    },
  },
};
</script>
