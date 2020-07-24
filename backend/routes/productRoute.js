const express = require ('express');
const Product = require ('../models/productModel');
const router = express.Router();
const util = require('../util');


router.get("/", async (req, res) =>{
    const products = await Product.find({});
       if(products){
           res.send(products);
        }
        else{
            res.status(404).send({message: 'Product Not Found'})
        }
    });

    router.get("/:id", async (req, res) =>{
        const product = await Product.findOne({_id:req.params.id});
           if(product){
               res.send(product);
            }
            else{
                res.status(404).send({message: 'Product Not Found'})
            }
        });
    


router.put('/:id', util.isAuth, util.isAdmin, async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
          product.name = req.body.name;
          product.price = req.body.price;
          product.image = req.body.image;
          product.brand = req.body.brand;
          product.category = req.body.category;
          product.countInStock = req.body.countInStock;
          product.description = req.body.description;
          const updatedProduct = await product.save();
          if (updatedProduct) {
            return res
              .status(200)
              .send({ message: 'Product Updated', data: updatedProduct });
          }
        }
        return res.status(500).send({ message: ' Error in Updating Product' });
      });
  
router.post("/", util.isAuth, util.isAdmin, async(req,res) =>{
    const product = new Product ({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message: 'New Product Created', data: newProduct});
    }
    return res.status(500).send({message: 'Error in creating product'});
});

router.delete('/:id', util.isAuth, util.isAdmin, async (req,res) =>{
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message:"Product Deleted"});
    }
    else{
        res.send({message:"Error in deletion"});
    }
});

module.exports = router;