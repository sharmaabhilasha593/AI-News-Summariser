import './ArticleDetail.css'
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { articlesData } from "../../data/articlesData";
import DownloadArticlePDF from "../downloadarticle/DownloadArticlePDF";

const ArticleDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(location.state || null);
  const articleRef = useRef(null);

  useEffect(() => {
    if (!article) {
      // If user opened detail directly, find from articlesData
      const all = Object.values(articlesData).flat();
      const found = all.find(a => String(a.id) === id);
      if (found) setArticle(found);
    }
  }, [id, article]);

  if (!article) return (
    <div>
      <p>Article not found. <span onClick={() => navigate("/")} style={{color:"blue",cursor:"pointer"}}>Go back</span></p>
    </div>
  );

  return (
    <div ref={articleRef} id={`article-${article.id}`} className="article-detail-container">
      <h3 className="article-category">{article.category}</h3>
      <h1 className="article-title">{article.title}</h1>
      <img src={article.image} alt={article.title} className="article-image" />
      <p className="article-content">{article.content}</p>

      <DownloadArticlePDF articleRef={articleRef} title={article.title} />
    </div>
    
  );
};

export default ArticleDetail;
