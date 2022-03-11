<template>
  <v-container>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      hide-no-data
      item-text="LocalizedName"
      item-value="Country.LocalizedName"
      label="Search City"
      placeholder="Start typing to Search"
      prepend-icon="mdi-database-search"
      return-object
    >
      <template v-slot:item="{ item }">
        <v-list-item-avatar color="indigo" class="text-h5 font-weight-light white--text">
          {{ item.AdministrativeArea.ID }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.LocalizedName"></v-list-item-title>
          <v-list-item-subtitle
            v-text="item.Country.LocalizedName"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-map-marker</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>
    <v-divider></v-divider>
    <v-card-text v-if="model && days && days.DailyForecasts">
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-list-item-title class="text-h4">
            {{ model.LocalizedName }} | {{ model.Country.LocalizedName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{
              days.DailyForecasts[0].Temperature.Maximum.Value + "\xB0"
            }}</v-list-item-subtitle
          >
        </v-col>

        <v-col cols="3" class="text-end">
          <v-btn icon @click="removeFromFavorite(model.Key)">
            <v-icon v-if="favorites" :color="favorites[model.Key] ? 'deep-orange' : ''"
              >mdi-heart</v-icon
            >
          </v-btn>
          <v-btn
            color="primary"
            v-if="!favorites || !favorites[model.Key]"
            @click="addToFavorite"
          >
            Add To Favorite
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card class="d-flex pa-2 justify-space-between" outlined tile v-if="model">
      <v-card max-width="220" v-for="(day, idx) in days.DailyForecasts" :key="idx">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5">
              {{ day.Date | dateName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ day.Date | dateFormat }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ day.Day.IconPhrase }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="text-h4" cols="6">
              {{ day.Temperature.Maximum.Value + "\xB0" }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-list-item align="center">
          <v-list-item-subtitle>
            {{ day.Temperature.Maximum.Value + "\xB0" }} /
            {{ day.Temperature.Minimum.Value + "\xB0" }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <font-awesome-icon icon="wind" />
          </v-list-item-icon>
          <v-list-item-subtitle>
            {{ day.Day.Wind.Speed.Value + day.Day.Wind.Speed.Unit }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <font-awesome-icon icon="cloud-rain" />
          </v-list-item-icon>
          <v-list-item-subtitle>{{ day.Day.RainProbability }}%</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text :href="day.Link" target="_blank"> Full Report </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    isLoading: false,
    model: null,
    search: null,
  }),
  computed: {
    selectedCity() {
      return this.$store.getters.selectedCity;
    },
    items() {
      return this.$store.getters.cities;
    },
    days() {
      return this.$store.getters.days;
    },
    favorites() {
      return this.$store.getters.favorites;
    },
  },
  methods: {
    addToFavorite() {
      this.$store.dispatch({
        type: "addToFavorite",
        data: this.model,
      });
    },
    removeFromFavorite(key) {
      this.$store.dispatch({
        type: "removeFromFavorite",
        data: key,
      });
    },
  },
  watch: {
    model: {
      immediate: false,
      deep: true,
      async handler() {
        this.isLoading = true;
        if (this.model?.Key) {
          try {
            await this.$store.dispatch({
              type: "forecastsDays",
              data: { key: this.model.Key, daysNum: "5day" },
            });
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
            console.error(error);
          }
        }
      },
    },
    async search(val) {
      if (val?.length < 3 || this.isLoading) return;

      this.isLoading = true;
      try {
        await this.$store.dispatch({ type: "searchCity", q: val });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
    selectedCity: {
      immediate: true,
      deep: true,
      handler() {
        if (this.selectedCity) {
          this.model = this.selectedCity;
        }
      },
    },
  },
};
</script>
