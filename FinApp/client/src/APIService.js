

function getPortfolio() {
    return fetch(`http://localhost:3001/api/portfolio/`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include"
    }).then((response) => { return response.json();});
}

function makeNewTransaction(symbol, quantity, type){
    return fetch(`http://localhost:3001/api/portfolio/makeNewTransaction`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include",
        body: JSON.stringify({
            symbol: symbol,
            quantity: quantity,
            type: type
        })
    }).then((response) => { return response.json()});
}

/*
function addToPortfolio(symbol, quantity) {
    return fetch(`http://localhost:3001/api/portfolio/buy`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include",
        body: JSON.stringify({
            symbol: symbol,
            quantity: quantity
        })
    }).then((response) => { return response.json()});
}

function removeFromPortfolio(symbol, quantity) {
    return fetch(`http://localhost:3001/api/portfolio/sell`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include",
        body: JSON.stringify({
            symbol: symbol,
            quantity: quantity
        })
    }).then((response) => { return response.json()});
}
*/

function getQuote(symbol) {
    return fetch(`http://localhost:3001/api/quote/${symbol}`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include"
    }).then((response) => { return response.json()});
}


export default {getPortfolio, getQuote , makeNewTransaction}