

function getPortfolio(username) {
    return fetch(`http://localhost:3001/api/portfolio/${username}`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => { return response.json()});
}

function addToPortfolio(username, symbol, quantity) {
    return fetch(`http://localhost:3001/api/portfolio/${username}/buy`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            symbol: symbol,
            quantity: quantity
        })
    }).then((response) => { return response.json()});
}

function removeFromPortfolio(username, symbol, quantity) {
    return fetch(`http://localhost:3001/api/portfolio/${username}/sell`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            symbol: symbol,
            quantity: quantity
        })
    }).then((response) => { return response.json()});
}

function getQuote(symbol) {
    return fetch(`http://localhost:3001/api/quote/${symbol}`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => { return response.json()});
}


export default {getPortfolio, removeFromPortfolio, addToPortfolio, getQuote }