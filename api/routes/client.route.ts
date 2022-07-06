import express from "express";
const router = express.Router()
import { dataSource } from "../../data-source";
import { Client } from "../entities/client.entity";

router.get('/clients', (req,res)=>{
    let ClientRepository = dataSource.getRepository(Client);
    ClientRepository.find().then(clients => {
        res.json(clients);
    }).catch(err => {
        res.json(err);
    })
})

router.post('/newClient', (req,res)=>{
    let ClientRepository = dataSource.getRepository(Client);
    let client = new Client();
    client.name = req.body.name;
    client.phone = req.body.phone;
    client.email = req.body.email;
    ClientRepository.save(client).then(client => {
        res.send("Client added");
    }).catch(err => {
        res.json(err);
    })
})

export default router;