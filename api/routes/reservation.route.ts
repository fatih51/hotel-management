import express from "express";
const router = express.Router()
import { dataSource } from "../../data-source";
import { Reservation } from "../entities/reservation.entity";
import { Room } from "../entities/room.entity";

router.get('/reservations', (req,res)=>{
    let ReservationRepository = dataSource.getRepository(Reservation);
    ReservationRepository.find().then(reservations => {
        res.json(reservations);
    }).catch(err => {
        res.json(err);
    })
})

router.post('/newReservation', (req,res)=>{
    let ReservationRepository = dataSource.getRepository(Reservation);
    let RoomRepository = dataSource.getRepository(Room);
    let reservation = new Reservation();
    reservation.client = req.body.client;
    reservation.room = req.body.room;
    reservation.startDate = req.body.startDate;
    reservation.endDate = req.body.endDate;
    ReservationRepository.save(reservation).then(reservation => {
        RoomRepository.createQueryBuilder().update({
            state: true
        }).where({
            id: reservation.room
        }).execute()
        res.send("Reservation added");
    }).catch(err => {
        res.json(err);
    })

})

router.delete('/deleteReservation/:id', async (req,res)=>{
    let ReservationRepository = dataSource.getRepository(Reservation);
    let RoomRepository = dataSource.getRepository(Room);
    ReservationRepository
        .createQueryBuilder("reservation")
        .leftJoinAndSelect("reservation.client", "client")
        .leftJoinAndSelect("reservation.room", "room")
        .where("reservation.id = :id", { id: parseInt(req.params.id) })
        .getMany().then(reservation => {
            RoomRepository.createQueryBuilder().update({
                state: false
            }).where({
                id: reservation[0].room.id
            }).execute()
        })
    ReservationRepository.delete(req.params.id).then(() => {
        res.send("Reservation deleted");
    }).catch(err => {
        res.json(err);
    })
})
export default router;