import React, { useEffect, useState } from "react";

import MovieList from "../MovieList";
import { fetchMovies } from "../../utils/fetchMovies";
import "./home.scss"

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  useEffect(() => {
    console.log(props, "props de home")
    setMovies(props.movies)
    
  }, [props]);

  useEffect(() => {
      const data = async () => {
        try {
          const res = await fetchMovies();
          setMovies(res);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
      };
      data();    
  }, []);

  return (
    <div className="home">
      {movies.length > 0 ?
      <div className="banner-img">
         <MovieList data={movies}/>
      </div>
      : <h5 className="txt_result">Sin resultados encontrados</h5>}
    </div>
  );
};

export default Home;
