import Room from '../models/room.model';
import Promise, { reject } from 'bluebird';
import Portfolio from '../models/portfolio.model';

var genPortfolios = (req) => {
        console.log("new Promise");
        if (req.body.members.length == 0) return reject("list is empty");
        var tempPortfolios = [];
        req.body.members.map((member) => {
            var portfolio = new Portfolio({
                email: member,
                balance: req.body.defaulAmt,
                stocks: [],
                roomName: req.body.name
            });
            tempPortfolios.push(portfolio);
        });
        return Portfolio.insertMany(tempPortfolios);
};

function createRoom(req, res, next){
    genPortfolios(req)
        .then(portfolios => {
            const room = new Room({
                name: req.body.name,
                members: req.body.members,
                defaultAmt: req.body.defaultAmt,
                portfolios: portfolios,
                owner: req.user.email,
                expDate: req.body.expDate
            });
            room.save()
                .then(savedRoom => {console.log(savedRoom);res.json(savedRoom);})
                .catch(e => {console.log(e);next(e);});
        })
        .catch(e => {console.log(e);res.status(500).send(e);});
}

function addMember(req, res, next){
    Room.findOne(
        {name: req.body.roomName},
        (err, room) => {
            if(err) {console.log(err);res.status(500).send(err);}
            var portfolio = new Portfolio({
                email: req.body.email,
                balance: room.defaulAmt,
                stocks: [],
                roomName: room.name
            });
            portfolio.save()
                .then(p => {
                    room.members.push(req.body.email);
                    room.portfolios.push(p._id);
                    room.save()
                        .then(newRoom => res.json(newRoom))
                        .catch(e => {console.log(e);res.status(500).end(err);});
                })
                .catch(e => {console.log(e);res.status(500).end(err);});
        }
    );
}


export default {createRoom, addMember};