import { cloneDeep } from 'lodash'

function seriesObject(prefCode) {
  return {
    name: this.getPrefectureId(prefCode),
    data: this.getPopulationValueId(prefCode)
  }
}

function allSeriesArray() {
  let array = []
  for (let i = 1; i <= 47; i++) {
    array.push(seriesObject(i))
  }
  return array
}

const initialState = {
  prefectures: [],
  japanPopulation: [],
  allYears: []
}

export const state = () => cloneDeep(initialState)

export const getters = {
  // 都道府県データ全て返す
  getPrefectures(state) {
    return state.prefectures
  },
  // postCodeを引数にすると、該当の都道府県名を返す
  getPrefectureId: state => id => {
    const prefecture = state.prefectures.find(
      prefecture => prefecture.prefCode === id
    )
    return !!prefecture ? prefecture.prefName : ''
  },
  // 年度配列を返す
  getAllYears(state) {
    return state.allYears
  },
  // 総人口の全ての都道府県データを配列で返す
  getPopulation(state) {
    return state.japanPopulation
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
  initPrefectures(state, payload) {
    if (payload === null) {
      state = Object.assign(state, initialState)
    } else {
      state.prefectures = payload
    }
  },
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
  async fetchPrefectures({ commit }) {
    const { data } = await this.$axios.get('v1/prefectures', {
      headers: {
        'X-API-KEY': process.env.API_KEY
      }
    })
    commit('initPrefectures', data.result)
  },
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
      commit('initAllYears', prefPopulationYear)
      commit('initPopulation', result)
      if (n > 1) {
        abc(n - 1)
      }
    }
    abc(47)
  }
}
