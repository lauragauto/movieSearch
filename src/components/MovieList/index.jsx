import React from 'react';
import MovieCard from '../MovieCard';
import './movieList.scss';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

import Slider from "react-slick";

const MovieListing = (props) => {
    const movies = props.data

    return (
        <div className='movie-wrapper'>
            <div className="movie-list">
                <h2>Peliculas</h2>
                <div className='movie-container'>
                    <Slider {...settings}>
                        {movies ? movies.map((movie, index) => {
                            return < MovieCard key={index} data={movie} />
                        }) : <div className='movies-error' ><h2>Error al cargar peliculas</h2></div>}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default MovieListing