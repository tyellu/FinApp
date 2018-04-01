import Room from '../models/room.model';
import Promise, { reject } from 'bluebird';
import Portfolio from '../models/portfolio.model';

var genPortfolios = (req) => {
        console.log("new Promise");
        if (req.body.members.length == 0) return reject("list is empty");
        var tempPortfolios = [];
        var members = req.body.members;
        members.push(req.user.email);
        members.map((member) => {
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
            room.findOne({name: req.body.name})
                .then((r) => {
                    if(r) res.status(400).end('Room Exists');
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
                email: req.user.email,
                balance: room.defaulAmt,
                stocks: [],
                roomName: room.name
            });
            portfolio.save()
                .then(p => {
                    room.members.push(req.user.email);
                    room.portfolios.push(p._id);
                    room.save()
                        .then(newRoom => res.json(newRoom))
                        .catch(e => {console.log(e);res.status(500).end(err);});
                })
                .catch(e => {console.log(e);res.status(500).end(err);});
        }
    );
}

function getRooms(req, res, next){
    Portfolio.find({email : req.user.email})
        .then((portfolios) => {
            console.log(portfolios);
            var rNames = [];
            portfolios.map(p => {
                if(p.roomName) rNames.push(p.roomName);
            });
            res.json(rNames);
        })
        .catch(e => {console.log(err); res.status(500).send(err);});
}

function getAllRooms(req, res, next){
    console.log("Get all rooms----------------------------------");
    Room.find({}, {name:1}, function(err, rooms){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        res.json(rooms);
    });
}


export default {createRoom, addMember, getRooms, getAllRooms};