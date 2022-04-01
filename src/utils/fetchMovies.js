export const fetchMovies = async (q='girls') =>{
     const URI = `https://api.tvmaze.com/search/shows?q=${q}`
     const req =  await window.fetch(URI)
     const res = await req.json()
     return res
   }