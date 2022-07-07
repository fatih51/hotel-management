import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { dataSource } from "../../data-source";
import { Admin } from "../entity/admin.entity";
const router = express.Router()

router.post("/register-admin",(req,res)=>{
    let admin = new Admin();
    admin.id = bcrypt.genSaltSync(10);
    admin.name = req.body.name;
    admin.password = bcrypt.hashSync(req.body.password,10);
    admin.email = req.body.email;
    let adminRepository = dataSource.getRepository(Admin);
    adminRepository.save(admin).then(()=>{
        res.send("Admin saved");
    }
    ).catch(error=>{
        res.send("Error:"+error);
    })
})

router.post("/login", async (req, res) => {
    let adminRepository = dataSource.getRepository(Admin);
    let admin = await adminRepository.findOneBy({ email: req.body.email });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
        const token = jwt.sign({ id: admin.id }, env.JWT_SECRET, {expiresIn: "1h"});
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
        res.send("Login success");
    } else {
        res.send("Login failed");
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.send("Logout success");
})
export default router;