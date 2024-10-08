import { Request, Response, NextFunction } from "express";
import Product from "../models/productModel";


const authorize = (roles: string[])=>{
    return async(req:Request | any, res:Response, next:NextFunction)=>{
        try {
            const user = req.user;
            if(!user){
                return res.status(401).json({message:"yetkisiz işlem"})
            }
            if(!roles.includes(user.role)){
                return res.status(403).json({
                    message:"Bu işlemi gerçekleştirmeye yetkiniz yok"
                });
            }
            if(user.role === "admin"){
                const product = await Product.findById(req.params.id);
                if(!product){
                    return res.status(404).json({message:"ürün bulunamadı"})
                }
                if (product && String(product.createdBy) !== String(user._id)) {
                    return res.status(403).json({ message: "Bu ürünü değiştirme izniniz yok" });
                  }
            }
            next();
            
        } catch (error) {
            console.error("Authorize middleware error:", error);
            res.status(500).json({ message: "Bir hata oluştu" });
        }
    }
}

export default authorize;