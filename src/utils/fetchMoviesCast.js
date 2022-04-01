export const fetchMoviesCast = async (id) =>{
     const URI = `https://api.tvmaze.com/shows/${id}/cast`
     const req =  await window.fetch(URI)
     const res = await req.json()
     console.log(res, "res movies cast")
     return res
   }