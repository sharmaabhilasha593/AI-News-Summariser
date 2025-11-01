import React from 'react'
import ArticleList from '../../components/articleList/ArticleList'

const Sports = () => {
  return (
    <div>
      
      <div className="pagecontent">
        <h2>Top Sports News Today</h2>
        <h3>Major headlines.Live updates</h3>
      </div>
      <ArticleList category="sports"/>
    </div>
  )
}

export default Sports
