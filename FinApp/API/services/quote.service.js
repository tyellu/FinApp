import AlphaIntegration from '../Integration/AlphaIntegration';


function getQuote(req, res, next){
    AlphaIntegration.getCurrentPrice(req.params.symbol, (quotePrice) => {
        if (!quotePrice) return res.status(500).end('Error retrieving quote');
        res.json(quotePrice);
    })
}

function getQuoteDetailed(req, res, next) {
    AlphaIntegration.getOne(req.params.symbol, req.params.scale, (quote) => {
        if (!quote) return res.status(500).end('Error retrieving quote');
        res.json(quote);
    })
}
export default { getQuote, getQuoteDetailed };