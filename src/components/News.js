import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=>{

    const[articles, setArticles] = useState([]);
    const[loading, setLoading] = useState(true);
    const[page, setPage] = useState(1);
    const[totalResults, setTotalResults] = useState(0);

    const updateNews = async(pageNo)=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        console.log("API Response:", parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles);
        console.log("Articles State:", parsedData.articles);
        setLoading(false);
        setPage(pageNo);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`;
        updateNews(1);
        // eslint-disable-next-line
    }, [])

    // const handlePrevClick = async () => {
    //     updateNews(page - 1);
    // }

    // const handleNextClick = async () => {
    //     updateNews(page + 1);
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setPage(page+1);
        setTotalResults(parsedData.totalResults);
      };

        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>NewsWire - Top Headlines on {props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
            </>
        )
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

export default News
