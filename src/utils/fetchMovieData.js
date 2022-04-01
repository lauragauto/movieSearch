export const fetchMovieData = async (imdb) =>{
     const URI = `https://api.tvmaze.com/lookup/shows?imdb=${imdb}`
     const req =  await window.fetch(URI)
     const res = await req.json()
     return res
   }