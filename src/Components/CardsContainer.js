import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAnimes } from '../models/objects'

function CardsContainer () {
  const [animes, setAnimes] = useState([])
  useEffect(() => {
    getAnimes()
      .then(res => setAnimes(res))
  }, [])

  return (
    <>
    <div className="cards-container">
      {animes.map(anime => (
        <Card
          key={anime.mal_id}
          name={anime.title}
          description={anime.synopsis}
          year={anime.year}
          image={anime.images.webp.image_url}
          likes={Math.floor(Math.random() * 1000)}
          dislikes={Math.floor(Math.random() * 1000)}
          reviews={[]}
        />))}
    </div>
    </>
  )
}

export default CardsContainer
