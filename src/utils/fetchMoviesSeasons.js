export const fetchMoviesSeasons = async (id) =>{
     const URI = `https://api.tvmaze.com/shows/${id}/seasons`
     const req =  await window.fetch(URI)
     const res = await req.json()
     const list_seasons = []
     console.log(res)
     res.map(async season => {
          console.log(season.id, "season.id")
        const res_episodes = await window.fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`)
        const episodes = await res_episodes.json()
        list_seasons.push({number: season.number, name: season.name, image: season.image?.medium, episodes: episodes, date: season.premiereDate})
      })
      console.log(list_seasons, "list_seasons")
     return list_seasons
   }