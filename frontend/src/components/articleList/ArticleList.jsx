import "./articleList.css"
import { useNavigate } from "react-router-dom";

import { articlesData } from "../../data/articlesData";
import Newscard from "../newscard/Newscard"
import Newspreviewcard from "../newscard2/Newspreviewcard";
const ArticleList = ({ category,cardtype }) => {
  const navigate = useNavigate();
  const articles = articlesData[category] || [];

  return (
    <div className="article-list">
        
        {articles.map((a,ind) =>{
            return cardtype=="Newspreviewcard"?<Newspreviewcard article={a}/>:<Newscard article={a}/>
        })}
    
    </div>
  );
};

export default ArticleList;
