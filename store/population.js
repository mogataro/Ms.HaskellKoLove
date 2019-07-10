import { cloneDeep } from 'lodash'

const initialState = {
  japanPopulation: [],
  allYears: []
}

export const state = () => cloneDeep(initialState)

export const getters = {
  // 年度配列を返す
  getAllYears(state) {
    return state.allYears
  },
  // 総人口の全ての都道府県データの配列数を返す
  getPopulationLength(state) {
    return state.japanPopulation.length
  },
  // postCodeを引数にすると、該当の都道府県の総人口データの年配列を返す
  getPopulationYearId: state => id => {
    const population = state.japanPopulation.find(
      population => population.prefCode === id
    )
    return !!population ? population.prefPopulationYear : ''
  },
  // postCodeを引数にすると、該当の都道府県の総人口データの値配列を返す
  getPopulationValueId: state => id => {
    const population = state.japanPopulation.find(
      population => population.prefCode === id
    )
    return !!population ? population.prefPopulationValue : ''
  }
}

export const mutations = {
  initPopulation(state, payload) {
    if (!!payload) {
      state.japanPopulation.push(payload)
    }
  },
  initAllYears(state, payload) {
    if (!!payload) {
      // 本当はstate.allYearsとpayloadを比較して、payloadにのみ存在する要素があれば、その要素のみ追加し、順番を昇順に並び替える処理をする
      if (state.allYears.toString() !== payload.toString())
        state.allYears = payload
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
      const prefPopulationYear = data.result.data[0].data.map(object =>
        String(object.year)
      )
      const prefPopulationValue = data.result.data[0].data.map(
        object => object.value
      )

      const result = {
        prefCode: n,
        prefPopulationYear: prefPopulationYear,
        prefPopulationValue: prefPopulationValue
      }
      commit('initPopulation', result)
      if (n === 47) {
        commit('initAllYears', prefPopulationYear)
      }
      if (n > 1) {
        abc(n - 1)
      }
    }
    abc(47)
  }
}
