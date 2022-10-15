import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    bodies: [],
    errors: []
  },
  getters: {
    BODIES(state) {
      return state.bodies
    },
    ERRORS(state) {
      return state.errors;
    }
  },
  mutations: {
    SET_BODIES:(state, bodiesList) => {
      state.bodies = bodiesList
    },
    SET_ERRORS: (state, errors) => {
      state.errors = errors;
    }
  },
  actions: {
    async GET_BODIES({ commit }) {
      await axios.get('https://api.le-systeme-solaire.net/rest/bodies', { params: { size: 10 } })
        .then(res => {
          var fullList = res.data
          var objectsList = fullList.bodies.filter(body => body.discoveryDate || body.aphelion)
          var realList = objectsList.filter(item => item.aroundPlanet || item.isPlanet)
          commit('SET_BODIES', realList)
        })
        .catch(err => {
          if (err.response) {
            console.log(err.message)
            alert('Ошибка ответа сервера. Проверьте данные запроса!')
          } else if (err.request) {
            console.log(err)
            alert('Ошибка запроса. Проверьте данные запроса!')
          } else {
            console.log(err)
            alert('Что-то пошло не так. Проверьте данные и попробуйте снова!')
          }
          commit('SET_ERRORS', err)
        })
      }
    }
})
