export default async function({ store, error, route, redirect }) {
  // 人口データ取得
  await store.dispatch('population/fetchPopulation')
  await store.dispatch('prefectures/fetchPrefectures')
}
