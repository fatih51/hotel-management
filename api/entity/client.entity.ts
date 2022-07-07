import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phone: number;

    @Column()
    email: string;
}