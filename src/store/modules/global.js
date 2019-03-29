export default {
    namespaced: true,
    state: {
      curTableId: 0
    },
    getters: {
      curTableId: state => state.curTableId
    },
    actions: {
      async setCurrentTableId ({ commit }, { id }) {
        commit('setCurrentTableId', id)
      }
    },
    mutations: {
      setCurrentTableId (state, d) {
        state.curTableId = d
      }
    }
}