import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const no_picture_url ='https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const SingleMovie = () => {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({show: false, msg: ""});
  const [movie, setMovie] = useState(""); 

  const fetchMovie = async(url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if(data.Response === 'True'){
        setMovie(data);
        setError({show: false, msg: ""});
      }else{
        setError({show: true, msg: data.Error})
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`)
  }, [id])
  

  if(isLoading){
    return <div className="loading"></div>
  }

  if(error.show){
    return(
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className='btn'>
          back to movies
        </Link>
      </div>
    ) 
  }

  const {Poster: poster, Title: title, Plot: plot, Year: year} = movie;

  return(
    <section className="single-movie">
      <img src={poster === 'N/A' ? no_picture_url : poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className='btn'>
          back to movies
        </Link>
      </div>
    </section>
  )
}

export default SingleMovie
