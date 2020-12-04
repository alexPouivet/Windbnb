<template>
  <div>
    <header>
      <a class="logo" href="#">
        <img src="~/assets/triangleLogo.png" alt="">
        <p>windbnb</p>
      </a>
      <div class="search">
        <p class="city-search" v-if="location =='' "  @click="toggleSearchBar">Add location</p>
        <p class="city-search-content" v-else  @click="toggleSearchBar">{{location}}</p>
        <p class="guests-search" v-if="guests == 0"  @click="toggleSearchBar">Add guests</p>
        <p class="guests-search-content" v-else  @click="toggleSearchBar">{{guests}} Guests</p>
        <i class="material-icons button-search"  @click="toggleSearchBar">search</i>
        <p class="initialize-search" @click="initialize" v-if="stays.length != 14"><i class="material-icons">clear</i></p>
      </div>
    </header>
    <SearchBar />
  </div>
</template>

<script>
export default {
  computed: {
    stays() {
      return this.$store.state.stays
    },
    location() {
      return this.$store.state.location
    },
    guests() {
      return this.$store.state.guests
    }
  },
  methods: {
    toggleSearchBar() {
      let searchBar= document.getElementById("searchBar")
      let overlay = document.getElementById("searchBar-overlay")

      if(searchBar.style.opacity == 1) {
        searchBar.style.opacity=0;
        searchBar.style.visibility = 'hidden';
        searchBar.style.height='0rem';

        overlay.style.opacity=0;
        overlay.style.visibility='hidden';
      }
      else {
        searchBar.style.opacity = 1;
        searchBar.style.visibility = 'visible';
        searchBar.style.height='36rem';

        overlay.style.opacity=1;
        overlay.style.visibility='visible';
      }

    },
    initialize() {
      this.$store.dispatch('initializeStays')
      this.$store.dispatch('initializeGuests')
      this.$store.dispatch('initializeLocation')
    },
  },
}
</script>
