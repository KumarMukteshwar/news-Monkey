import React, { useEffect, useState } from "react";
import NewsIteam from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0848b6400d464224a1eedb53eae23646&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    console.log(parseData);
    setArticles(parseData.articles)
    setTotalResult(parseData.totalResult)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    //  document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0848b6400d464224a1eedb53eae23646&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResult(parseData.totalResult)
  };
  return (
    <div className='container1' style={{ color: props.Mode === 'dark' ? 'white' : '#042743' }}>
      <div className="container">
        <h1 className="text-center" style={{ margin: "40px 0px", marginTop: "90px",backgroundColor: props.Mode ==='dark'?'#13466e':'white',color:props.Mode ==='dark'?'white':'light' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)}      Headlines</h1>
        {/* <Spinner/> */}
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={<Spinner />}
        >
          <div className="row">

            {/* {!loading && articles.map((element) => {
                  return  <div className="col-md-4" key={element.url}>
                  <NewsIteam title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                          newsUrl={element.url} 
                          Author ={element.author}
                          Date = {element.publishedAt}
                          source = {element.source.name} />

                          </div>
                        })}
                      </div> */}
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsIteam title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  Author={element.author}
                  Date={element.publishedAt}
                  source={element.source.name} />

              </div>
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>

  );
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;
