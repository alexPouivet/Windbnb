<template>
  <div id="page">
    <Header
    />
    <main>
      <div class="title-main">
        <h2>Stays in Finland</h2>
        <p>+{{stays.length}} stays</p>
      </div>
      <Stays />
    </main>
    <footer>
      <p>Alexandre Pouivet @DevChallenges.io</p>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Stays from '@/components/Stays'

export default {
  components: {
    Header,
    Stays
  },
  computed: {
    stays() {
      return this.$store.state.stays
    }
  },
}
</script>
