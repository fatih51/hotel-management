import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: number;

    @Column({ default: false })
    state: boolean;
}