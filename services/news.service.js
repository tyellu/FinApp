import NewsIntegration from '../Integration/NewsIntegration';

function getNews(req, res, next){
    NewsIntegration.getNews((news) => {
        if (!news) return res.status(500).end('Error retrieving the news');
        res.json(news);
    });
}

export default {getNews};
