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
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> [optional] a precise description of the body</li>
                </ul>*/}
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">_id:</span> (String) id of the portfolio</li>
                        <li><span className="sub-heading2">balance:</span> (Number) portfolio's remaining funds</li>
                        <li><span className="sub-heading2">defaultAmt:</span> (Number) portfolio's starting balance</li>
                        <li><span className="sub-heading2">email:</span> (String) user's email</li>
                        <li><span className="sub-heading2">stocks:</span> List of objects</li>
                        <ul>
                            <li><span className="sub-heading2">_id:</span> (String) id of the stock</li>
                            <li><span className="sub-heading2">quantity:</span> (Number) amount of shares held</li>
                            <li><span className="sub-heading2">symbol:</span> (String) symbol of the stock</li>
                            <li><span className="sub-heading2">price:</span> (Number) price the stock was bought at</li> 
                        </ul>
                    </ul>
                </ul>
                <div className="curl-block">curl stuff</div>
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
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> List of objects</li>
                    <ul>
                        <li><span className="sub-heading2">_id:</span> (String) id of the portfolio Account History object</li>
                        <li><span className="sub-heading2">accValue:</span> (Number) portfolio's net value</li>
                        <li><span className="sub-heading2">date:</span> (Date) date at which the portfolio's net value was recorded</li>
                    </ul>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">Create Transaction</div>
                <span className="sub-heading1">Description:</span> Create a transaction for the user's portfolio
                <br/>
                <span className="sub-heading1">Request:</span> POST /api/portfolio/transactions/
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">symbol:</span> (String) symbol of the stock</li>
                        <li><span className="sub-heading2">quantity:</span> (Number) amount of shares to be bought/sold</li>
                        <li><span className="sub-heading2">type:</span> (String) buy / sell</li>
                    </ul>
                </ul>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> text/plain</li>
                    <li><span className="sub-heading2">body:</span> Added transaction to queue</li>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">Get Stock Market Data</div>
                <span className="sub-heading1">Description:</span> Get Stock Market Data for a given symbol at a given scale
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/quote/:symbol/:scale/
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">Params</span> </li>
                    <ul>
                        <li><span className="sub-heading2">symbol:</span> (String) symbol of stock</li>
                        <li><span className="sub-heading2">scale:</span> (String) DAILY / MONTHLY / YEARLY </li>                        
                    </ul>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">adjustedClose:</span> (Number) adjusted closing value for the interval</li>
                        <li><span className="sub-heading2">close:</span> (Number) closing value for the interval</li>
                        <li><span className="sub-heading2">dividendAmount:</span> (Number) dividend amount</li>
                        <li><span className="sub-heading2">high:</span> (Number) value high for the interval</li>
                        <li><span className="sub-heading2">low:</span> (Number) value low for the interval</li>
                        <li><span className="sub-heading2">open:</span> (Number) opening value for the interval</li>
                        <li><span className="sub-heading2">volume:</span> (Number) volume traded for the interval</li>
                    </ul>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
            <div className="title">Get Stock Quote</div>
                <span className="sub-heading1">Description:</span> Get a stock's current Quote
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/quote/:symbol
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> text/plain</li>
                    <li><span className="sub-heading2">body:</span> (Number) current trading price for given stock</li>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">Get My Rooms</div>
                <span className="sub-heading1">Description:</span> Get the rooms the user belongs to
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/room/
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body: List of:</span> (String) Name of room</li>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">Create New Room</div>
                <span className="sub-heading1">Description:</span> Create new room
                <br/>
                <span className="sub-heading1">Request:</span> POST /api/room/new/
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">name:</span> (String) name of the new room</li>
                        <li><span className="sub-heading2">expDate:</span> (Number) date of expiration for the room</li>
                        <li><span className="sub-heading2">defaultAmt:</span> (Number) starting balance of every user in the room</li>
                        <li><span className="sub-heading2">members:</span> List of : (String) users to be added to the room</li>
                    </ul>
                </ul>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">_id:</span> (String) id of the room</li>
                        <li><span className="sub-heading2">createdAt:</span> (Date) date the room was created at</li>
                        <li><span className="sub-heading2">updatedAt:</span> (Date) date the room was last updated at</li>
                        <li><span className="sub-heading2">defaultAmt:</span> (Number) starting balance of every user in the room</li>
                        <li><span className="sub-heading2">expDate:</span> (Date) date of expiration for the room</li>
                        <li><span className="sub-heading2">members:</span> List of : (String) Email of users in the room</li>
                        <li><span className="sub-heading2">name:</span> (String) name of the new room</li>
                        <li><span className="sub-heading2">owner:</span> (String) Email of user who created the room</li>
                        <li><span className="sub-heading2">portfolios:</span> List of object</li>
                        <ul>
                            <li><span className="sub-heading2">_id:</span> (String) id of the portfolio</li>
                            <li><span className="sub-heading2">balance:</span> (Number) portfolio's remaining funds</li>
                            <li><span className="sub-heading2">defaultAmt:</span> (Number) portfolio's starting balance</li>
                            <li><span className="sub-heading2">email:</span> (String) user's email</li>
                            <li><span className="sub-heading2">stocks:</span> List of objects</li>
                            <ul>
                                <li><span className="sub-heading2">_id:</span> (String) id of the stock</li>
                                <li><span className="sub-heading2">quantity:</span> (Number) amount of shares held</li>
                                <li><span className="sub-heading2">symbol:</span> (String) symbol of the stock</li>
                                <li><span className="sub-heading2">price:</span> (Number) price the stock was bought at</li>
                            </ul>
                        </ul>
                    </ul>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
            <div className="title">Add user to room</div>
                <span className="sub-heading1">Description:</span> Add a user to room
                <br/>
                <span className="sub-heading1">Request:</span> POST /api/room/add
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> Object</li>
                    <ul>
                        <li><span className="sub-heading2">roomName:</span> (String) name of the room</li>
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
                            <li><span className="sub-heading2">_id:</span> (String) id of the portfolio</li>
                            <li><span className="sub-heading2">balance:</span> (Number) portfolio's remaining funds</li>
                            <li><span className="sub-heading2">defaultAmt:</span> (Number) portfolio's starting balance</li>
                            <li><span className="sub-heading2">email:</span> (String) user's email</li>
                            <li><span className="sub-heading2">stocks:</span> List of objects</li>
                            <ul>
                                <li><span className="sub-heading2">_id:</span> (String) id of the stock</li>
                                <li><span className="sub-heading2">quantity:</span> (Number) amount of shares held</li>
                                <li><span className="sub-heading2">symbol:</span> (String) symbol of the stock</li>
                                <li><span className="sub-heading2">price:</span> (Number) price the stock was bought at</li>
                            </ul>
                        </ul>
                    </ul>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">Get All Rooms</div>
                <span className="sub-heading1">Description:</span> Get a list of all rooms that exist
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/room/all/
                <br/>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> List of objects</li>
                    <ul>
                        <li><span className="sub-heading2">_id:</span> (String) id of the room object</li>
                        <li><span className="sub-heading2">name:</span> (Number) room's name</li>
                    </ul>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
                <div className="title">Get Room Portfolio</div>
                <span className="sub-heading1">Description:</span> Get the user's portfolio details for a given room
                <br/>
                <span className="sub-heading1">Request:</span> GET /api/portfolio/:room/
                <ul>
                    <li><span className="sub-heading2">Params</span> </li>
                    <ul>
                        <li><span className="sub-heading2">room:</span> (String) name of room</li>
                    </ul>
                </ul>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">_id:</span> (String) id of the portfolio</li>
                        <li><span className="sub-heading2">balance:</span> (Number) portfolio's remaining funds</li>
                        <li><span className="sub-heading2">defaultAmt:</span> (Number) portfolio's starting balance</li>
                        <li><span className="sub-heading2">email:</span> (String) user's email</li>
                        <li><span className="sub-heading2">stocks:</span> List of objects</li>
                        <ul>
                            <li><span className="sub-heading2">_id:</span> (String) id of the stock</li>
                            <li><span className="sub-heading2">quantity:</span> (Number) amount of shares held</li>
                            <li><span className="sub-heading2">symbol:</span> (String) symbol of the stock</li>
                            <li><span className="sub-heading2">price:</span> (Number) price the stock was bought at</li> 
                        </ul>
                    </ul>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
            <div className="doc-block">
            <div className="title">Create Transaction for Room</div>
                <span className="sub-heading1">Description:</span> Create a transaction for the user's portfolio for a given room
                <br/>
                <span className="sub-heading1">Request:</span> POST /api/portfolio/transactions/:room
                <ul>
                    <li><span className="sub-heading2">content-type:</span> application/json</li>
                    <li><span className="sub-heading2">Params</span> </li>
                    <ul>
                        <li><span className="sub-heading2">room:</span> (String) name of room</li>
                    </ul>
                    <li><span className="sub-heading2">body:</span> object</li>
                    <ul>
                        <li><span className="sub-heading2">symbol:</span> (String) symbol of the stock</li>
                        <li><span className="sub-heading2">quantity:</span> (Number) amount of shares to be bought/sold</li>
                        <li><span className="sub-heading2">type:</span> (String) buy / sell</li>
                    </ul>
                </ul>
                <span className="sub-heading1">Response:</span> 200
                <ul>
                    <li><span className="sub-heading2">content-type:</span> text/plain</li>
                    <li><span className="sub-heading2">body:</span> Added transaction to queue</li>
                </ul>
                <div className="curl-block">curl stuff</div>
            </div>
        </div>);
    }

}
export default Documentation;