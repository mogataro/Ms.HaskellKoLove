export default async function({ store, error, route, redirect }) {
  // 人口データ取得
  await store.dispatch('fetchPrefectures')
  await store.dispatch('fetchPopulation')
}
