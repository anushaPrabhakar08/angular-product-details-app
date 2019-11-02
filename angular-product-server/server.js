var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var port = 3000;

var db = mongoose.connect("mongodb://localhost:27017/ProductDetails", (err, response) => {
    if (err) { console.log(err); }
    else { console.log('Connected to' + db, '+', response); }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongoose.Schema;

var productSchema = new Schema({
    //id: {type: ObjectId},
    pname: { type: String },
    pdescription: { type: String },
    price: { type: String },
}, { versionKey: false });


var model = mongoose.model("products", productSchema, 'products');

app.post("/api/saveProduct", (req, res) => {
    var mod = new model(req.body);
    if (req.body.mode == 'Save') {
        console.log("Add");
        mod.save((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Record has been inserted" });
            }
        });
    } else {
        model.findByIdAndUpdate(req.body.id, { pname: req.body.pname, pdescription: req.body.pdescription,price: req.body.price }, (err, data) => {
            console.log("Edit");
            console.log(req.body.id);
            if (err) {
                res.send(err);
            } else {
                res.send({ data: data });
            }
        });
    }
});

app.get("/api/getProductById", (req, res) => {
    //console.log("get product by Iffd", req.query.productId);
    model.findById({_id: req.query.productId}, (err, data) => {
        if(err){
            res.send(err);
        }
        else {
           // console.log(data);
            res.send({ data: data });
        }
        
    })
});

app.get("/api/getProduct", (req, res) => {
    //console.log("get uproduct");
    model.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.delete("/api/deleteProduct", (req, res) => {
    console.log(req.query.productId);
    model.remove({ _id: req.query.productId}, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: 'Record has been deleted' });
        }
    })
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});