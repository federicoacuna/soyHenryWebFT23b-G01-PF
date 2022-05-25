import React, { useEffect } from 'react'
import ReviewCard from '../ReviewCard'
import s from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUserReviews } from '../../redux/actions/reviews.action'

export default function Reviews () {
  const dispatch = useDispatch()
  const token = useSelector(state => state.users.token)
  const reviews = useSelector(state => state.reviews.data)

  useEffect(() => {
    if (token && token.length) {
      dispatch(getUserReviews())
    }
  }, [])//eslint-disable-line

  return (
    <>
      <div className={s.container}>{Array.isArray(reviews) && reviews.length > 0
        ? reviews.map(r => (
          <ReviewCard
            key={r.product.id}
            rating={r.rating}
            review={r.review}
            productId={r.product.id}
            productName={r.product.name}
            productImage={r.product.image}
          />
        ))
        : 'No tienes reseñas.'}
      </div>{/* eslint-disable-line */}
    </>
  )
}
