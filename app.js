const express = require('express')
const mysql = require('mysql')
const app = express()
const bodyParser = require('body-parser')
const connect = require('./models/mysql.js')

//connect.connect();
connect.querySV();

app.listen(3000, (req,res)=>{
	console.log('Connect!')
})

