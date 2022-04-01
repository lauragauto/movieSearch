import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { fetchMovies} from '../../utils/fetchMovies';
import './searchBar.scss';


const SearchBar = (props) => {
    return (
        <div className='header'>
            <div className="logo"><Link to='/'>Buscador de Peliculas y Series</Link></div>
            <div className="search-bar">
                <form onSubmit={props.submitHandler}>
                    <input type="text" value={props.term} placeholder='Buscar pelicula o serie' name="search" onChange={props.handleChange} />
                    <button type='submit'> <i className="fa fa-search"></i> </button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar