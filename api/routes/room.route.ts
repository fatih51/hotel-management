import express from "express";
const router = express.Router()
import { dataSource } from "../../data-source";
import { Room } from "../entity/room.entity";
import AdminGuard from "../guards/admin.guard";

router.get('/rooms', (req,res)=>{
    let RoomRepository = dataSource.getRepository(Room);
    RoomRepository.find().then(rooms => {
        res.json(rooms);
    }).catch(err => {
        res.json(err);
    })
})

router.post('/newRoom', (req,res)=>{
    let RoomRepository = dataSource.getRepository(Room);
    let room = new Room();
    room.phone = req.body.phone;
    room.state = req.body.state;
    RoomRepository.save(room).then(room => {
        res.send("Room added");
    }).catch(err => {
        res.json(err);
    })
})

router.delete('/deleteRoom/:id',AdminGuard, (req,res)=>{
    let RoomRepository = dataSource.getRepository(Room);
    RoomRepository.delete(req.params.id).then(room => {
        res.send("Room deleted");
    }).catch(err => {
        res.json(err);
    })
})

export default router;