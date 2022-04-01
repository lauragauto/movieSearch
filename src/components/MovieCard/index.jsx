import React from 'react'
import './movieCard.scss';
import { Link } from 'react-router-dom';

const MovieCard = ({data}) => {
    return (
        <>
        {data && 
        <div className='card-item'>
            <Link to={`/pelicula/${data.show.externals.imdb}`}>
                <div className="card-inner">
                    <div className="card-top">
                        <img src={data.show.image?.medium} alt={data.show.name} />
                    </div>
                    <div className="card-bottom">
                        <div className="card-info">
                            <h3>{data.show.name}</h3>
                            <p>{data.show.language}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        }
        </>
    )
}

export default MovieCard