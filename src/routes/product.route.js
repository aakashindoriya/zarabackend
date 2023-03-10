const express=require("express");
const app=express.Router();
const Product=require("../module/product.module")

app.get('/', async (req, res) => {
    let { q, category, price, color, limit, page,sort,order } = req.query;
    
    let query = {};
    let sorting={};
    if (category) query.category = category;
    if (color) query.color = { $regex: new RegExp(color, 'i') };
    if (q) query.title = { $regex: new RegExp(q, 'i') };
    if (price) query.price = { $lte: price };
    if(!limit) limit = 12;
    if(!page) page = 1;
    if(sort&&order){
        if(order=="asc"){
            order=1
        }else if(order=="desc"){
            order=-1
        }
        sorting[sort]=order
    }

    try {
        console.log(sorting)
        const products = await Product.find(query).sort(sorting).limit(limit * 1).skip((page - 1) * limit)
        res.status(200).send({ data: products });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send({ data: product });
    } catch (error) {
        res.status(400).send(error);
    }
});




module.exports = app;
