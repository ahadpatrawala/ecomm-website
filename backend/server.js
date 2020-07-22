const express = require ('express');
const data = require ('./data');
const config = require ('./config');
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const userRoute = require ('./routes/userRoute');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl , {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.message));

const app = express();

app.use(bodyParser.json());
app.use("/api/users",userRoute);

app.get('/api/products/:id',(req,res) =>{
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
        res.send(product);
        else
            res.status(404).send({msg: "Product Not Found"})
        
});

app.get('/api/products',(req,res) =>{
    res.send(data.products);
});

app.listen(process.env.PORT || 500 );