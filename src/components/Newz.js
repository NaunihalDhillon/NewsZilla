import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";

const Newz = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [articles, setArticles] = useState({});

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ff212caf018843c1a8a20a373e8ff5e9`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
  };

  useEffect(() => {
    updateNews();
  }, []);
  return (
    <div className="container my-3">
      <h2>NewsZilla - Latest Headlines</h2>

      {loading ? (
        "Loading"
      ) : (
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
      )}
      {error ? error : null}
    </div>
  );
};

export default Newz;
