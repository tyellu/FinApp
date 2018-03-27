const express = require('express');
const validate = require('express-validation');
import roomService from '../services/room.service';
const router = express.Router();

//localhost/api/room
router.route('/new')
    .post(roomService.createRoom);

router.route('/add')
    .post(roomService.addMember);

export default router;

