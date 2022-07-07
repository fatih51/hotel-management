import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

import { Room } from "./room.entity";
import { Client } from "./client.entity";  

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Client, client => client.id) @JoinColumn({ name: "clientID" })
    client: Client;
    
    @OneToOne(type => Room, room => room.id) @JoinColumn({ name: "roomID" })
    room: Room;

    @Column()
    startDate: string;

    @Column()
    endDate: string;
}