const mysql = require('mysql')
const dbInfo = require('./db.js')

let con = mysql.createConnection(dbInfo)

let connect = ()=>{
	return new Promise((resolve, reject)=>{
		con.connect((err)=>{
			if (err) reject(new Error('Loi ket noi voi Database'))
			resolve('Da ket noi SQL')
		})
	})
}

let querySV = async ()=>{
	await connect().then(res=>console.log(res),err=>console.log(err + ' '))
	con.query('SELECT * from sinhvien', (err, result, fields)=>{
		if (err) console.log(err + ' ')
		console.log(result)
	})
}

let queryPhong = ()=>{
	con.query('SELECT * from phong', (err, result, fields)=>{
		if (err) console.log(err + ' ')
			console.log(result)
	})
}
module.exports.connect = connect;
module.exports.querySV = querySV;
module.exports.queryPhong = queryPhong;