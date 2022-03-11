<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <v-list-item-subtitle v-if="locationCity" color="secondary" class="text">
          {{ locationCity.LocalizedName }} | {{ locationCity.Country.LocalizedName }}
          <span v-if="currentForecast && currentForecast.DailyForecasts.length">
            {{ currentForecast.DailyForecasts[0].Temperature.Maximum.Value + "\xB0" }} /
            {{ currentForecast.DailyForecasts[0].Temperature.Minimum.Value + "\xB0" }}
          </span>
        </v-list-item-subtitle>
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>

        <v-app-bar-title>Title</v-app-bar-title>
        <v-spacer></v-spacer>

        <v-switch v-model="$vuetify.theme.dark" color="secondary"></v-switch>

        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab to="/">Home</v-tab>
            <v-tab to="/favorite">Favorite</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" height="100vh">
        <router-view :style="{ paddingTop: '250px' }" />
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    geolocation() {
      return this.$store.getters.geolocation;
    },
    locationCity() {
      return this.$store.getters.locationCity;
    },
    currentForecast() {
      return this.$store.getters.currentForecast;
    },
  },
  async created() {
    await this.setLocation();
  },
  methods: {
    setDarkTheme() {
      this.$vuetify.theme.themes.dark = true;
    },
    async setLocation() {
      try {
        await this.$store.dispatch({
          type: "getFavorites",
        });
        await this.$store.dispatch({
          type: "getUserLocation",
        });
        await this.$store.dispatch({
          type: "searchByGeoLocation",
          q: `${this.geolocation.coords.latitude},${this.geolocation.coords.longitude}`,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    locationCity: {
      immediate: true,
      deep: true,
      async handler() {
        this.isLoading = true;
        if (this.locationCity) {
          try {
            await this.$store.dispatch({
              type: "forecastsDays",
              data: { key: this.locationCity.Key, daysNum: "1day", filed: "current" },
            });
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
            console.error(error);
          }
        }
      },
    },
  },
};
</script>
