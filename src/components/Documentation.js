import React, { Component } from 'react';
import '../styles/css/Documentation.css';


class Documentation extends Component {
    render() {
        return (
        <div className="docs-container">
            <div className="doc-block">
                <div className="title">Get Portfolio</div>
                <span className="sub-heading1">Description:</span> Get the user's portfolio details
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/portfolio/
                {/*<ul>
                    <li>content-type: application/json</li>
                    <li>body: [optional] a precise description of the body</li>
                </ul>*/}
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li>content-type: application/json</li>
                    <li>body: object</li>
                    <ul>
                        <li>_id: (String) id of the portfolio</li>
                        <li>balance: (Number) portfolio's remaining funds</li>
                        <li>defaultAmt: (Number) portfolio's starting balance</li>
                        <li>email: (String) user's email</li>
                        <li>stocks: List of objects</li>
                        <ul>
                            <li>_id: (String) id of the stock</li>
                            <li>quantity: (Number) amount of shares held</li>
                            <li>symbol: (String) symbol of the stock</li>
                            <li>price: (Number) price the stock was bought at</li> 
                        </ul>
                    </ul>
                </ul>
                <div className="curl-block">
                    curl -b cookie.txt https://api-marketsim.herokuapp.com/api/portfolio
                </div>
            </div>
            <div className="doc-block">
                <div className="title">Get Portfolio History</div>
                <span className="sub-heading1">Description:</span> Get the user's portfolio history
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/portfolio/hist/
                {/*<ul>
                    <li>content-type: application/json</li>
                    <li>body: [optional] a precise description of the body</li>
                </ul>*/}
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li>content-type: application/json</li>
                    <li>body: List of objects</li>
                    <ul>
                        <li>_id: (String) id of the portfolio Account History object</li>
                        <li>accValue: (Number) portfolio's net value</li>
                        <li>date: (Date) date at which the portfolio's net value was recorded</li>
                    </ul>
                </ul>
                <div className="curl-block">curl -b cookie.txt https://api-marketsim.herokuapp.com/api/portfolio/hist </div>
            </div>
            <div className="doc-block">
                <div className="title">Create Transaction</div>
                <span className="sub-heading1">Description:</span> Create a transaction for the user's portfolio
                <br/>
                <span className="sub-heading1">Request:</span> POST /api/portfolio/transactions/
                <ul>
                    <li>content-type: application/json</li>
                    <li>body: object</li>
                    <ul>
                        <li>symbol: (String) symbol of the stock</li>
                        <li>quantity: (Number) amount of shares to be bought/sold</li>
                        <li>type: (String) buy / sell</li>
                    </ul>
                </ul>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li>content-type: text/plain</li>
                    <li>body: Added transaction to queue</li>
                </ul>
                <div className="curl-block">
                {`curl -b cookie.txt`}
                <br />
                {`     -H "Content-Type: application/json"`}
                <br/>
                {`     -d {"symbol" : "AAPL", "quantity" : "10", "type" : "buy"}`}
                <br/>
                {`https://api-marketsim.herokuapp.com/api/portfolio/transactions/`}
                </div>
            </div>
            <div className="doc-block">
                <div className="title">Get Stock Market Data</div>
                <span className="sub-heading1">Description:</span> Get Stock Market Data for a given symbol at a given scale
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/quote/:symbol/:scale/
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li>content-type: application/json</li>
                    <li>body: object</li>
                    <ul>
                        <li>adjustedClose: (Number) adjusted closing value for the interval</li>
                        <li>close: (Number) closing value for the interval</li>
                        <li>dividendAmount: (Number) dividend amount</li>
                        <li>high: (Number) value high for the interval</li>
                        <li>low: (Number) value low for the interval</li>
                        <li>open: (Number) opening value for the interval</li>
                        <li>volume: (Number) volume traded for the interval</li>
                    </ul>
                </ul>
                <div className="curl-block">curl -b cookie.txt https://api-marketsim.herokuapp.com/api/quote/AAPL/DAILY</div>
            </div>
            <div className="doc-block">
            <div className="title">Get Stock Quote</div>
                <span className="sub-heading1">Description:</span> Get a stock's current Quote
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/quote/:symbol
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li>content-type: text/plain</li>
                    <li>body: (Number) current trading price for given stock</li>
                </ul>
                <div className="curl-block">curl -b cookie.txt https://api-marketsim.herokuapp.com/api/quote/AAPL/</div>
            </div>
            <div className="doc-block">
                <div className="title">Get My Rooms</div>
                <span className="sub-heading1">Description:</span> Get the rooms the user belongs to
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/room/
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li>content-type: application/json</li>
                    <li>body: List of: (String) Name of room</li>
                </ul>
                <div className="curl-block">curl -b cookie.txt https://api-marketsim.herokuapp.com/api/room/</div>
            </div>
            <div className="doc-block">
                <div className="title">Create New Room</div>
                <span className="sub-heading1">Description:</span> Create new room
                <br/>
                <span className="sub-heading1">Request:</span> POST /api/room/new/
                <ul>
                    <li>content-type: application/json</li>
                    <li>body: object</li>
                    <ul>
                        <li>name: (String) name of the new room</li>
                        <li>expDate: (Number) date of expiration for the room</li>
                        <li>defaultAmt: (Number) starting balance of every user in the room</li>
                        <li>members: List of : (String) users to be added to the room</li>
                    </ul>
                </ul>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">_id:</span> (String) id of the room</li>
                        <li><span className="sub-heading2">createdAt:</span> (Date) date the room was created at</li>
                        <li><span className="sub-heading2">defaultAmt:</span> (Number) starting balance of every user in the room</li>
                        <li><span className="sub-heading2">expDate:</span> (Date) date of expiration for the room</li>
                        <li><span className="sub-heading2">members:</span> List of : (String) Email of users in the room</li>
                        <li><span className="sub-heading2">name:</span> (String) name of the new room</li>
                        <li><span className="sub-heading2">owner:</span> (String) Email of user who created the room</li>
                        <li><span className="sub-heading2">portfolios:</span> List of object</li>
                        <ul>
                            <li>_id: (String) id of the portfolio</li>
                            <li>balance: (Number) portfolio's remaining funds</li>
                            <li>defaultAmt: (Number) portfolio's starting balance</li>
                            <li>email: (String) user's email</li>
                            <li>stocks: List of objects</li>
                            <ul>
                                <li>_id: (String) id of the stock</li>
                                <li>quantity: (Number) amount of shares held</li>
                                <li>symbol: (String) symbol of the stock</li>
                                <li>price: (Number) price the stock was bought at</li>
                            </ul>
                        </ul>
                    </ul>
                </ul>
                <div className="curl-block">
                {`curl -b cookie.txt`}
                <br />
                {`     -H "Content-Type: application/json"`}
                <br/>
                {`     -d {"name" : "newRoom", "expDate" : "Sun Apr 30 2017 00:00:00 GMT+0000 (UTC)", "defaultAmt" : "10000", "members" : []}`}
                <br/>
                {`https://api-marketsim.herokuapp.com/api/room/new/`}
                </div>
            </div>
            <div className="doc-block">
                <div className="title">First docu thing</div>
                wow
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">First docu thing</div>
                wow
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">First docu thing</div>
                wow
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">First docu thing</div>
                wow
                <div className="curl-block">curl stuff</div>
            </div>
        </div>);
    }

}
export default Documentation;