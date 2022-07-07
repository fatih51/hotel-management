import 'reflect-metadata';
import express from 'express';
const app = express();

import { dataSource } from './data-source';

import Client from './api/routes/client.route';
import Room from './api/routes/room.route';
import Reservation from './api/routes/reservation.route';
import Admin from './api/routes/admin.route';

app.use(express.json());

app.use('/', Client);
app.use('/', Room);
app.use('/', Reservation);
app.use('/',Admin)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('listening on port 3000');
    dataSource.initialize().then(() => {
        console.log("Database connected");
    }).catch(err => {
        console.log(err);
    })
});
