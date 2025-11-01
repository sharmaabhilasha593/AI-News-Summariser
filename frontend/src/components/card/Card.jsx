import "./Card.css"
import React from 'react'

const Card = ({article}) => {
  return (
      <div className="home-news-card" >
      <img src={article.image} alt={article.title} className="home-image" />
      <div className="home-content">
        <h2 className="home-title">{article.title}</h2>
        <p className="home-text">
          {article.content}
        </p>
      </div>
    </div>
  )
}

export default Card
