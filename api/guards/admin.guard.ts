import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../env";
import { Admin } from "../entity/admin.entity";
import { dataSource } from "../../data-source";


const AdminGuard = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: "Invalid token"
                    });
                } else {
                    let verified_token = jwt.decode(token) as JwtPayload;
                    if(verified_token){
                        const adminRepository = dataSource.getRepository(Admin);
                        adminRepository.findOneBy({ id:verified_token.id }).then(admin => {
                            if (admin) {
                                next();
                            } else {
                                res.status(401).json({
                                    message: "Invalid token"
                                });
                            }
                        })
                    }
                }
            });
        } else {
            res.status(401).json({
                message: "Invalid token"
            });
        }
    }
}

export default AdminGuard;