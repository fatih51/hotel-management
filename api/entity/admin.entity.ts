import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}