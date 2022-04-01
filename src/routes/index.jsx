import { useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "../components/Home"
import SearchBar from "../components/SearchBar"
import MovieDetail from "../components/MovieDetail"
import { fetchMovies } from "../utils/fetchMovies"
const NotFound = () => <p>Page not found</p>
export const Paths = () =>{
    const [term, setTerm] = useState("");
    const [movies, setMovies] = useState([])
    const [error, setError] = useState({})

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(term, "entro en submitHandler")
        if (term !== "")
      {
        console.log(term, "entro en submitHandler")
          const getData = async() => {
            try {
                const res = await fetchMovies(term);
                setMovies(res);
                console.log(res, "respuesta submithandler")
              } catch (error) {
                setError(error);
              }
          }
           getData()
        }

    }
    return (
        <BrowserRouter>
        <SearchBar handleChange={handleChange} submitHandler={submitHandler} term={term}/>
        <Routes>
            <Route path='/' element={<Home movies={movies}/>}/>
            <Route path='/pelicula/:idPelicula' element={<MovieDetail/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
    )
}