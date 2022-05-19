export const getAnimes = async () => {
  const animes = await (await fetch('https://api.jikan.moe/v4/seasons/now')).json()
  animes.data.splice(10, animes.data.length - 10)
  return animes.data
}
