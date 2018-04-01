import React, { Component } from 'react';
import API from '../APIService';
import '../styles/css/newsfeed.css';
import { Link } from 'react-router-dom';

class NewsFeed extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            news:[]
        };
    }

    componentDidMount() {
        this.updateNewsFeed();
    }


    updateNewsFeed() {
        API.getNews().then((res) => {
            if (res.status==="ok"){
                this.setState({ news: res.articles});
            } else {
                console.log("Unable to retrieve news articles");
                this.setState({ news: []});
            }
        }).catch(e => console.log(e));
    }

    renderEntry(news_item, id) {
        // news item object
        /*{author:"Keris Lahiff",
        description:".....",
        publishedAt:"2018-03-30T21:00:41Z",
        source:{id: "cnbc", name: "CNBC"},
        title:"........",
        url:".......",
        urlToImage:"..."}*/
        return (<div key={id} className="news-row">
                <div className="column">
                   <Link target="_blank" to={news_item.url} >
                      <div className="title">{news_item.title}</div>
                      <div className="text">by {news_item.author}</div>
                      <div className="text">{news_item.publishedAt}</div>
                   </Link>
                </div>
                <img className="thumbnail" src={news_item.urlToImage} alt=''></img>
            </div>);
    }

    render() {
        var id = 0;
        return <div>
            News Feed
            <div className="news-feed-container">
            { this.state.news.map((news_item) => { return this.renderEntry(news_item, id++);}) }
            </div>
            <Link target="_blank" to="http://NewsAPI.org" >Powered by News API</Link>
        </div>

    }
}

export default NewsFeed;