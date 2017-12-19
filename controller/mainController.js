const database = require('../models/mssql.js')

//Validate datetime
let isValidDate= (dateString)=>{
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
  return d.toISOString().slice(0,10) === dateString;
}
//Validate Time
let isValidTime = (timeString)=>{
    var pattern = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/
    if (!timeString.match(pattern))
        return false
    else return true
}


let checkAllPhong = (req,res)=>{
	database.readAllPhong().then((Result)=>{
	res.send(Result)
},(error)=>console.log(error))
}

let checkAllPhongTrong = (req,res)=>{
	database.readAllPhongTrong().then((Result)=>{
	res.send(Result)
},(error)=>console.log(error))
}

let checkAllPhongDaMuon = (req,res)=>{
	database.readAllPhongDaMuon().then((Result)=>{
	res.send(Result)
},(error)=>console.log(error))
}

let muonPhong = (req,res)=>{
	if (req.params.MSSV && req.params.idPhong && req.params.ngayMuon && req.params.gioMuon)
	{
		let MSSV = req.params.MSSV,
			idPhong = req.params.idPhong,
			ngayMuon = req.params.ngayMuon,
			gioMuon = req.params.gioMuon
		if (isValidDate(ngayMuon) == true && isValidTime(gioMuon) == true)
		{
			database.muonPhong(MSSV,idPhong,ngayMuon,gioMuon).then((Result)=>{
				res.send(Result)
			},(error)=>res.send(error))		
		} else res.send({'messages':[{'text':'Định dạng ngày hoặc giờ không đúng, vui lòng kiểm tra lại!'}]})
	} else res.send({'messages':[{'text':'Thiếu dữ liệu đầu vào, vui lòng kiểm tra lại!'}]})
}

let traPhong = (req,res)=>{
	if (req.params.MSSV && req.params.idPhong && req.params.gioTra)
	{
		let MSSV = req.params.MSSV,
			idPhong = req.params.idPhong,
			gioTra = req.params.gioTra
		if (isValidTime(gioTra) == true)
		{
			database.traPhong(MSSV,idPhong,gioTra).then((Result)=>{
				res.send(Result)
			},(error)=>res.send(error))		
		} else res.send({'messages':[{'text':'Định dạng ngày hoặc giờ không đúng, vui lòng kiểm tra lại!'}]})
	} else res.send({'messages':[{'text':'Thiếu dữ liệu đầu vào, vui lòng kiểm tra lại!'}]})
}


module.exports.checkAllPhong = checkAllPhong
module.exports.checkAllPhongTrong = checkAllPhongTrong
module.exports.checkAllPhongDaMuon = checkAllPhongDaMuon
module.exports.muonPhong = muonPhong
module.exports.traPhong = traPhong


// let test = (req,res)=>{
// 	database.test().then((Result)=>{
// 	res.send(Result)
// },(error)=>console.log(error))
// }

// module.exports.test = test