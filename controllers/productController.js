import { Product } from "../models/productModel.js";


//Add new product
export const createProduct = async (req, res) => {
    try {
        //useck user role
        if(req.user.role != "admin") {
            return res.status(403).json({
                message:"Unauthorized Access",
            })
        }

       const {title, description, category,price, stock} =req.body;
       const image = req.file;
       console.log(image)
       if(!image) {
        return res.status(400).json({
            message:"Please selete the image"
        })
       }

        //Store to db
        const product = await Product.create({
            title,
            description,
            category,
            price,
            stock,
            image:image?.path,
        });
        res.status(201).json({
            message:"Product Details addes success",
            product
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}