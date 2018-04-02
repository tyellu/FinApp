function getPortfolio(room) {
    return fetch(`http://localhost:3001/api/portfolio/${room || ""}`, {
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

function getTransactions(room){
    return fetch(`http://localhost:3001/api/portfolio/transactions/${room || ""}`, {
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

function makeNewTransaction(symbol, quantity, type, room){
    return fetch(`http://localhost:3001/api/portfolio/transactions/${room || ""}`, {
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

function getPortfolioHistory() {
    return fetch(`http://localhost:3001/api/portfolio/hist`, {
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

function getNews() {
    return fetch(`http://localhost:3001/api/news`,{
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



// OPENFIGI API see : https://openfigi.com/api
function getSymbolDescription(symbol) {
    return fetch(`https://api.openfigi.com/v1/mapping`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            idType: 'TICKER',
            idValue: symbol
        })
    }).then((response) => {
        return response.json().name;
    }).catch((err) => {
        console.log(err);
    });
}

function createRoom(roomName, defaultAmt, expDate, members=[]){
    return fetch(`http://localhost:3001/api/room/new`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            name: roomName,
            members: members,
            defaultAmt: defaultAmt,
            expDate: expDate
        }),
        credentials: "include"
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

function getAllRooms(){
    return fetch(`http://localhost:3001/api/room/all`, {
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

function joinRoom(roomName){
    return fetch(`http://localhost:3001/api/room/add`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: "include",
        body: JSON.stringify({
            roomName: roomName
        })
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err);
    });
}

function getMyRooms(){
    return fetch(`http://localhost:3001/api/room/`, {
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

export default { getPortfolio, makeNewTransaction, getTransactions, getQuote, getQuoteDetails, 
    getNews, getPortfolioHistory, getSymbolDescription, createRoom, getAllRooms, joinRoom, getMyRooms};
