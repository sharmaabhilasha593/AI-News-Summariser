import './Articlesummary.css'
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { articlesData } from "../../data/articlesData";
import DownloadArticlePDF from "../downloadarticle/DownloadArticlePDF";
import { assets } from '../../assets/assets';

const Articlesummary = () => {
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
    <div ref={articleRef} id={`article-${article.id}`} className="summary-detail-container">
        <img src={assets.backicon} className='backicon' alt="" onClick={() => navigate(-1)}/>

        
      <h3 className="summary-category">{article.category}</h3>
      <h1 className="summary-title">{article.title}</h1>
      {/* <img src={article.image} alt={article.title} className="summary-image" /> */}
      <h1>Summary</h1>
      <p className="summary-content">{article.summary}</p>

      <DownloadArticlePDF articleRef={articleRef} title={article.title} />
    </div>
    
  );
};

export default Articlesummary;
