import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    bodies: []
  },
  getters: {
    BODIES(state) {
      return state.bodies
  }

  },
  mutations: {
    SET_BODIES:(state, bodiesList) => {
      state.bodies = bodiesList
    }
  },
  actions: {
    async GET_BODIES({ commit }) {
      const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies', { params: { size: 10} })
      var fullList = response.data
      var objectsList = fullList.bodies.filter(body => body.discoveryDate || body.aphelion)
      var realList = objectsList.filter(item => item.aroundPlanet || item.isPlanet)
      commit('SET_BODIES', realList)
    }
  },
  modules: {
  }
})
