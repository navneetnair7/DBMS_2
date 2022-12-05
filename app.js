const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const {Sequelize, DataTypes} = require('sequelize');
// const { UPDATE } = require('sequelize/types/query-types');
// const { QueryTypes } = require('sequelize');

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const sequelize = new Sequelize(
    "project",
    "root",
    "Apples123mysql",
    {
        host : "localhost",
        dialect : "mysql"
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const customer = sequelize.define(
    "Customer",
    {
        Aadhaar_No: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Name: DataTypes.STRING,
        Contact_No: DataTypes.INTEGER,
        Occupation: DataTypes.STRING,
        Age: DataTypes.INTEGER
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

const Employee = sequelize.define(
    "Employee",
    {
        Emp_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Name: DataTypes.STRING,
        Age: DataTypes.INTEGER,
        Job_Type: DataTypes.STRING,
        Salary: DataTypes.INTEGER
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

const Service = sequelize.define(
    "Service",
    {
        Center_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Manager: DataTypes.STRING,
        City: DataTypes.STRING,
        State: DataTypes.STRING
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

const Colours = sequelize.define(
    "Colours", 
    {
        Name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        Colour: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        Quantity: DataTypes.INTEGER
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

app.get('/', function(req, res){
    res.render('home');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/signup', function(req, res){
    res.render('signup');
});

app.get('/emplogin', function(req, res){
    res.render('emplogin');
});

app.get('/shop', function(req, res){
    res.render('shop')
})

app.get('/service', function(req, res){
    res.render('service')
})

app.get('/godown', function(req, res){
    res.render('godown')
})

app.post('/signup', function(req, res){
    let name = req.body.name;
    let aadhar = req.body.aadhar;
    let contact = req.body.contact;
    let occu = req.body.occu;
    let age = req.body.age;
    res.render("successcust");
    //res.render('failure');
    customer.create({
        Name: name,
        Aadhaar_No: aadhar,
        Contact_No: contact,
        Occupation: occu,
        Age: age
    })

})

app.post('/login', function(req, res){
    let user = req.body.user;
    let aadhar = req.body.pass;

    customer.findAll({
        where: {
            Name: user,
            Aadhaar_No: aadhar
        }
    }).then(function(custInfo){
        if(custInfo.length != 0){
            res.render('loginsuccess')
        }else{
            res.render('failure')
        }
    })
})

app.post('/service', function(req, res){
    let city = req.body.city;
    let state = req.body.state;
    Service.findAll({
        where: {
            city: city,
            state: state
        }
    }).then(function(servInfo){
        if(servInfo.length != 0){
            res.render('servsuccess')
        }else{
            res.render('failure')
        }
    })
})

// app.post('/shop', function(req, res){
//     let variant = req.body.model;
//     let colour = req.body.color;
//     const up = Colours.findAll({where: {Name: variant, Colour: colour}});
//     up.increment('Quantity', {by: 2});
// })

app.listen(3000, function(){
    console.log('Listening on port 3000');
});