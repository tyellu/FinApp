import AlphaIntegration from '../Integration/AlphaIntegration';


function getQuote(req, res, next){
    AlphaIntegration.getCurrentPrice(req.params.symbol, (quotePrice) => {
        if (!quotePrice) return res.status(500).end('Error retrieving quote');
        res.json(quotePrice);
    })
}


export default { getQuote };