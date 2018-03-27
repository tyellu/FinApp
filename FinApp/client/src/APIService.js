function getPortfolio() {
    return fetch(`http://localhost:3001/api/portfolio/`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include"
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

function getTransactions(){
    return fetch(`http://localhost:3001/api/portfolio/getTransactions`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include"
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
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
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

function getQuote(symbol) {
    return fetch(`http://localhost:3001/api/quote/${symbol}`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include"
      
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

function getQuoteDetails(symbol, scale) {
    return fetch(`http://localhost:3001/api/quote/${symbol}/${scale}/`,{
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include"
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}


export default { getPortfolio, makeNewTransaction, getTransactions, getQuote, getQuoteDetails };
