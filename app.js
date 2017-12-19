const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const controller = require('./controller/mainController.js')
const mssql = require('./models/mssql.js')



app.get('/phong',controller.checkAllPhong)
app.get('/phong/trong',controller.checkAllPhongTrong)
app.get('/phong/damuon',controller.checkAllPhongDaMuon)
app.get('/muonphong/:MSSV/:idPhong/:ngayMuon/:gioMuon',controller.muonPhong)
app.get('/traphong/:MSSV/:idPhong/:gioTra',controller.traPhong)

app.get('/',(req,res)=>{
	res.send('API đang hoạt động!')
})


app.listen(3000, (req,res)=>{
	console.log('Connect!')
})


