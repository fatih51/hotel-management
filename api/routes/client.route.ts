import express from "express";
import bcrypt from "bcrypt";
const router = express.Router()
import { dataSource } from "../../data-source";
import { Client } from "../entity/client.entity";
import AdminGuard from "../guards/admin.guard";

router.get('/clients', (req,res)=>{
    let ClientRepository = dataSource.getRepository(Client);
    ClientRepository.find().then(clients => {
        res.json(clients);
    }).catch(err => {
        res.json(err);
    })
})

router.post('/newClient',AdminGuard,(req,res)=>{
    let ClientRepository = dataSource.getRepository(Client);
    let client = new Client();
    client.id = bcrypt.genSaltSync(10);
    client.name = req.body.name;
    client.phone = req.body.phone;
    client.email = req.body.email;
    ClientRepository.save(client).then(client => {
        res.send("Client added");
    }).catch(err => {
        res.json(err);
    })
})

router.delete('/deleteClient/:id',AdminGuard, (req,res)=>{
    let ClientRepository = dataSource.getRepository(Client);
    ClientRepository.delete(req.params.id).then(client => {
        res.send("Client deleted");
    }).catch(err => {
        res.json(err);
    })
})

export default router;