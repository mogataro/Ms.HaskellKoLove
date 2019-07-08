import { cloneDeep } from 'lodash'

const initialState = {
  japanPopulation: []
}

export const state = () => cloneDeep(initialState)

export const getters = {
  // 総人口の全ての都道府県データを配列で返す
  getPopulation(state) {
    return state.prefectures
  },
  // postCodeを引数にすると、該当の都道府県の総人口データを返す
  getPopulationId: state => id => {
    const population = state.japanPopulation.find(
      population => population.prefCode === id
    )
    return !!population ? population.prefPopulation : ''
  }
}

export const mutations = {
  initPopulation(state, payload) {
    if (!!payload) {
      state.japanPopulation.push(payload)
    }
  }
}

export const actions = {
  fetchPopulation({ commit }) {
    const self = this
    async function abc(n) {
      const { data } = await self.$axios.get(
        `v1/population/composition/perYear?cityCode=-&prefCode=${n}`,
        {
          headers: {
            'X-API-KEY': process.env.API_KEY
          }
        }
      )
      const result = {
        prefCode: n,
        prefPopulation: data.result.data[0].data
      }
      commit('initPopulation', result)
      if (n > 1) abc(n - 1)
    }
    abc(47)
  }
}
