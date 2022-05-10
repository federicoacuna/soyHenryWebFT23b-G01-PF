import React from 'react'
import CategoryFilter from '../CategoryFilter'
import s from './index.module.css'

const FilterContainer = () => {
  return (
    <div className={s.container}>
      <CategoryFilter />
    </div>
  )
}

export default FilterContainer
