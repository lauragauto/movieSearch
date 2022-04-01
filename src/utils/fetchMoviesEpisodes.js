export const fetchMoviesEpisodes = async (id) =>{
     const URI = `https://api.tvmaze.com//seasons/${id}/episodes`
     const req =  await window.fetch(URI)
     const res = await req.json()
     return res
   }