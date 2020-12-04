<template>
  <div>
    <div id="searchBar">
      <div class="search">
        <div class="searchBar">
          <div class="location" @click="toggleSearchAnswers('location')" id="locationButton">
            <p class="description">location</p>
            <p class="content" v-if="location ==''">Add location</p>
            <p class="content-location" v-else>{{location}}</p>
          </div>
          <div class="guests" @click="toggleSearchAnswers('answers')" id="guestsButton">
            <p class="description">Guests</p>
            <p class="content" v-if="guests == 0">Add Guests</p>
            <p class="content-guests" v-else>{{guests}} Guests</p>
          </div>
          <div class="button">
            <div class="button-search" @click="filter">
              <i class="material-icons">search</i>
              <p>Search</p>
            </div>
          </div>
        </div>
        <div class="search-answers">
          <div class="location" id="location">
            <p class="location-answer" @click="changeLocation('Helsinki')"><i class="material-icons">location_on</i>Helsinky, Finland</p>
            <p class="location-answer" @click="changeLocation('Turku')"><i class="material-icons">location_on</i>Turku, Finland</p>
            <p class="location-answer" @click="changeLocation('Oulu')"><i class="material-icons">location_on</i>Oulu, Finland</p>
            <p class="location-answer" @click="changeLocation('Vaasa')"><i class="material-icons">location_on</i>Vaasa , Finland</p>
          </div>
          <div class="guests" id="guests">
            <div class="guests-adults">
              <p class="title">Adults</p>
              <p class="description">Ages 13 or above</p>
              <div class="quantity-element">
                <button type="button" class="quantity-left-minus"  data-type="minus" data-field="" @click="removeGuests('adult')" >
                  <i class="material-icons">remove</i>
                </button>
                <input type="number" id="quantity" name="quantity" class="" value="1" min="1" max="10" v-model.trim="adultGuests">
                <button type="button" class="quantity-right-plus" data-type="plus" data-field="" @click="addGuests('adult')">
                  <i class="material-icons">add</i>
                </button>
              </div>
            </div>
            <div class="guests-children">
              <p class="title">Children</p>
              <p class="description">Ages 2 - 12</p>
              <div class="quantity-element">
                <button type="button" class="quantity-left-minus"  data-type="minus" data-field="" @click="removeGuests('children')">
                  <i class="material-icons">remove</i>
                </button>
                <input type="number" id="quantity" name="quantity" class="" value="1" min="1" max="10" v-model.trim="childrenGuests">
                <button type="button" class="quantity-right-plus" data-type="plus" data-field="" @click="addGuests('children')">
                  <i class="material-icons">add</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="button-mobile">
          <div class="button-search" @click="filter">
            <i class="material-icons">search</i>
            <p>Search</p>
          </div>
        </div>
      </div>
    </div>
    <div id="searchBar-overlay" @click="toggleSearchBar">
    </div>
  </div>
</template>

<script>
import VueScreenSize from 'vue-screen-size'

export default {
  mixins: [VueScreenSize.VueScreenSizeMixin],
  data() {
    return {
      adultNumber: 0,
      childrenNumber: 0,
    }
  },
  computed: {
    stays() {
      return this.$store.state.stays
    },
    location() {
      return this.$store.state.location
    },
    guests() {
      return this.$store.state.guests
    },
    adultGuests() {
      return this.$store.state.adultGuests
    },
    childrenGuests() {
      return this.$store.state.childrenGuests
    },
  },
  methods: {
    filter() {
      this.$store.dispatch('filterStays', [this.location, this.guests])
      this.toggleSearchBar()
    },
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
        searchBar.style.height='30rem';

        overlay.style.opacity=1;
        overlay.style.visibility='visible';
      }
    },
    toggleSearchAnswers(answer) {
      let locationDiv = document.getElementById("location")
      let locationButton = document.getElementById("locationButton")
      let guestsDiv = document.getElementById("guests")
      let guestsButton = document.getElementById("guestsButton")

      if(answer == "location") {

        // show location
        if(this.$vssWidth < 990) {
          locationDiv.style.display='block';
        }
        locationDiv.style.opacity = 1;
        locationDiv.style.visibility = 'visible';

        locationButton.style.border = "1px solid #333333";
        locationButton.style.borderRadius = "16px"

        // hide guests
        if(this.$vssWidth < 990) {
          guestsDiv.style.display='none';
        }
        guestsDiv.style.opacity=0;
        guestsDiv.style.visibility = 'hidden';

        guestsButton.style.border = "none";
        guestsButton.style.borderRadius = "0";
        guestsButton.style.borderRight = "1px solid #F2F2F2";

      } else {

        // hide location
        if(this.$vssWidth < 990) {
          locationDiv.style.display='none';
        }
        locationDiv.style.opacity=0;
        locationDiv.style.visibility = 'hidden';

        locationButton.style.border = "none";
        locationButton.style.borderRadius = "0";
        locationButton.style.borderRight = "1px solid #F2F2F2";

        // show guests
        if(this.$vssWidth < 990) {
          guestsDiv.style.display='block';
        }

        guestsDiv.style.opacity = 1;
        guestsDiv.style.visibility = 'visible';

        guestsButton.style.border = "1px solid #333333";
        guestsButton.style.borderRadius = "16px"
      }
    },
    changeLocation(newLocation) {
      this.$store.dispatch('setLocation', newLocation)
    },
    addGuests(type) {
      this.$store.dispatch('addGuests', type)
    },
    removeGuests(type) {
      this.$store.dispatch('removeGuests', type)
    },
  }
}
</script>
