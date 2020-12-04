import ads from '~/static/stays.json'

export const state = () => ({
  stays: ads,
  staysNumber: ads.length,
  location: '',
  guests: 0,
  childrenGuests: 0,
  adultGuests: 0,
});

export const mutations = {
  // STAYS
  SET_STAYS(state, stays) {
    state.stays = stays
  },
  FILTER_STAYS(state, filters) {
    let stays = ads
    let results = []

    console.log(filters);

    for (var i = 0; i < stays.length; i++) {
      if(filters[0] !== "" && filters[1] !== 0) {
        if(stays[i].city == filters[0] && stays[i].maxGuests >= filters[1]){
          results.push(stays[i])
        }
      } else if(filters[0] == "" && filters[1] !== 0) {
        if(stays[i].maxGuests >= filters[1]){
          results.push(stays[i])
        }
      } else if(filters[0] !== "" && filters[1] == 0) {
        if(stays[i].city == filters[0]){
          results.push(stays[i])
        }
      } else {
        results.push(stays[i])
      }
    }
    state.stays = results
  },
  INITIALIZE_STAYS(state) {
    state.stays = ads
  },
  // LOCATION
  SET_LOCATION(state, location) {
    state.location = location
  },
  INITIALIZE_LOCATION(state) {
    state.location = ''
  },
  // GUESTS
  SET_GUESTS(state, guests) {
    state.guests = guests
  },
  INITIALIZE_GUESTS(state) {
    state.guests = 0
    state.childrenGuests = 0
    state.adultGuests = 0
  },
  ADD_GUESTS(state, type) {
    state.guests++

    if(type == 'adult'){
      state.adultGuests++
    } else {
      state.childrenGuests++
    }
  },
  REMOVE_GUESTS(state, type) {
    if(state.guests > 0) {
      if(type == 'adult' && state.adultGuests > 0) {
        state.adultGuests--
        state.guests--
      }
      else if (type == 'children' && state.childrenGuests > 0) {
        state.childrenGuests--
        state.guests--
      }
    }
  }
}

export const actions = {
  // STAYS
  setStays({commit}, stays) {
    commit("SET_STAYS", stays)
  },
  filterStays({commit}, filters) {
    commit('FILTER_STAYS', filters)
  },
  initializeStays({commit}) {
    commit('INITIALIZE_STAYS')
  },
  // LOCATION
  setLocation({commit}, location) {
    commit("SET_LOCATION", location)
  },
  initializeLocation({commit}){
    commit('INITIALIZE_LOCATION')
  },
  // GUESTS
  setGuests({commit}, guests) {
    commit('SET_GUESTS')
  },
  initializeGuests({commit}){
    commit('INITIALIZE_GUESTS')
  },
  addGuests({commit}, type) {
    commit('ADD_GUESTS', type)
  },
  removeGuests({commit}, type) {
    commit('REMOVE_GUESTS', type)
  }
}
