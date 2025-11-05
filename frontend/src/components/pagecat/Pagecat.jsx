import { useNavigate } from "react-router-dom";
import "./Pagecat.css";

const Pagecat = ({ pageName, categories }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/${pageName}/${category.link}`); // navigate to category page
  };

  return (
    <div className='pagecat'>
      {categories.map((cat, index) => (
        <div
          key={index}
          className="pagecat-card"
          onClick={() => handleClick(cat)}
        >
          <img src={cat.image} alt={cat.title} />
          <p>{cat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Pagecat;
