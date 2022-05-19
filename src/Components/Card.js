import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../Context/Context'
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'

function Card (props) {
  Card.propTypes = {
    name: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  }

  const { user } = useContext(UserContext)

  const savedLikes = JSON.parse(localStorage.getItem(props.name + 'Likes'))
  const savedDislikes = JSON.parse(localStorage.getItem(props.name + 'Dislikes'))

  const [rating, setRating] = useState({
    likes: savedLikes || props.likes,
    dislikes: savedDislikes || props.dislikes,
    likeActive: false,
    dislikeActive: false
  })

  const [review, setReview] = useState({
    id: '',
    text: '',
    user: user.username,
    item: props.name
  })

  const localReviews = JSON.parse(localStorage.getItem(props.name)) || []
  const [reviews, setReviews] = useState(localReviews)

  useEffect(() => {
    localStorage.setItem(props.name, JSON.stringify(reviews))
  }, [reviews])

  useEffect(() => {
    setRating({
      ...rating,
      likeActive: false,
      dislikeActive: false
    })
  }, [user.username])

  useEffect(() => {
    localStorage.setItem(props.name + 'Likes', JSON.stringify(rating.likes))
    localStorage.setItem(props.name + 'Dislikes', JSON.stringify(rating.dislikes))
  }, [rating.likes, rating.dislikes])

  const handleChange = (e) => {
    setReview({
      ...review,
      user: user.username,
      id: Math.random().toString(36).substr(2, 9),
      item: props.name,
      [e.target.name]: e.target.value
    })
    const input = document.getElementById('review-' + props.name)
    const btn = document.getElementById('btn-' + props.name)
    input.value ? btn.classList.remove('disabled') : btn.classList.add('disabled')
  }

  const like = () => {
    setRating((prevState) => ({
      ...prevState,
      likeActive: !prevState.likeActive,
      likes: prevState.likeActive ? prevState.likes - 1 : prevState.likes + 1
    }
    ))
  }

  const dislike = () => {
    setRating((prevState) => ({
      ...prevState,
      dislikeActive: !prevState.dislikeActive,
      dislikes: prevState.dislikeActive ? prevState.dislikes - 1 : prevState.dislikes + 1
    }
    ))
  }

  const handleLike = () => {
    like()
    if (rating.dislikeActive) {
      dislike()
    }
  }

  const handleDislike = () => {
    dislike()
    if (rating.likeActive) {
      like()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const input = document.getElementById('review-' + props.name)
    setReviews([...reviews, review])
    input.value = ''
  }

  return (
    <div className='card'>
      <p className='name'>{props.name}</p>
      <div className='image'>
        <img src={props.image} alt={props.name} />
      </div>
      <p className='year'>{props.year}</p>
      <p className='description'>{props.description}</p>
      <div className='rating'>
        {rating.likeActive
          ? <AiFillLike className='like-icon' onClick={handleLike} size={25} />
          : <AiOutlineLike className='like-icon' onClick={handleLike} size={25} />
        }
        <p className='likes'>{rating.likes}</p>
        {
          rating.dislikeActive
            ? <AiFillDislike className='dislike-icon' onClick={handleDislike} size={25} />
            : <AiOutlineDislike className='dislike-icon' onClick={handleDislike} size={25} />
        }
        <p className='dislikes'>{rating.dislikes}</p>
    </div>
        <div className='reviews'>
          <p>Reviews:</p>
          {reviews.map((review) => (
            <p className='review' key={props.name + review.id}>
              {`${review.user}: ${review.text}`}
            </p>
          ))}
        </div>
        <form className='review-form' onSubmit={handleSubmit}>
          <textarea
            id={'review-' + props.name}
            rows={4}
            className='review-input'
            placeholder='Add a review'
            name='text'
            onChange={handleChange}
          />
          <button id={'btn-' + props.name} className='btn disabled'>Post</button>
        </form>
      </div>
  )
}

export default Card
