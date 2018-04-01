const express = require('express');
const validate = require('express-validation');
import roomService from '../services/room.service';
const router = express.Router();

//localhost/api/room
router.route('/')
    .get(roomService.getRooms);

router.route('/new')
    .post(roomService.createRoom);

router.route('/add')
    .post(roomService.addMember);

router.route('/all')
    .get(roomService.getAllRooms);

export default router;

