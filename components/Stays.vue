<template>
  <div class="stays">
    <div v-for="(stay, index) in stays" :key="index" class="stay">
      <img :src=stay.photo alt="">
      <div class="stay-information">
        <p v-if="stay.superHost == true" class="super-host">Super Host</p>
        <p v-if="stay.beds" class="type">{{stay.type}} ,{{stay.beds}} beds</p>
        <p v-else class="type">{{stay.type}}</p>
        <div class="rating">
          <i class="material-icons">star</i>
          <p class="note">{{stay.rating}}</p>
        </div>
      </div>
      <p class="stay-title">{{stay.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    stays() {
      return this.$store.state.stays
    }
  },
}
</script>
