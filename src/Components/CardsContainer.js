import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAnimes } from '../models/objects'
import { RiLayoutGridFill } from 'react-icons/ri'
import { MdViewList } from 'react-icons/md'
const { BsEyeSlash, BsEyeFill } = require('react-icons/bs')

function CardsContainer () {
  const [grid, setGrid] = useState(true)

  const toggleGrid = () => {
    setGrid((prev) => !prev)
  }

  const [showReviews, setShowReviews] = useState(false)

  const toggleReviews = () => {
    setShowReviews((prev) => !prev)
  }
  const [animes, setAnimes] = useState([])
  useEffect(() => {
    getAnimes()
      .then(res => setAnimes(res))
  }, [])

  return (
    <>
    <div className="toggler">
      {
        grid
          ? <MdViewList onClick={toggleGrid} size={30}/>
          : <RiLayoutGridFill onClick={toggleGrid} size={30}/>

      }
    </div>
    <div className='hidden-content'>
      {
        showReviews
          ? <BsEyeSlash className='eye' onClick={toggleReviews} size={30} />
          : <BsEyeFill className='eye' onClick={toggleReviews} size={30} />
      }
      </div>
    <div className={grid ? 'cards-container grid' : 'cards-container list'}>
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
          showReviews={showReviews}
        />))}
    </div>
    </>
  )
}

export default CardsContainer
