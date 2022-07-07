import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "hotel-management",
    "entities": [
        __dirname + "/api/entity/*.entity.ts"
    ],
    synchronize: true,
    logging: false
})