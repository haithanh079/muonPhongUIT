let sql = require('mssql')
let fs = require('fs')
let async = require('async')
let config = require('./db.js')
let request = new sql.Request()
let connection = require('tedious').Connection

// Create connection to database

let readAllPhong = async () => {
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select * from PHONG`)
    }).then(result => {
      let queryResult = result.recordset
      let JSONresult = {"messages": []}
      queryResult.forEach((row)=>{
        let khadung = ''
        if (row.tinhTrangPhong == 0) {khadung = 'trống ☑'} else {khadung = 'đã có người mượn❌'}
          JSONresult.messages.push({"text": 'Phòng: ' + row.idPhong +' '+ khadung})
      })
      resolve(JSONresult)
      sql.close()
    }).catch(error => {
      if (error) {
      reject ({"messages": [{"text" : '❌ Đã xảy ra lỗi: '+ err}]})
    }
    sql.close()
  })
  })
} 

let readAllPhongTrong = async () => {
    return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select * from PHONG WHERE tinhTrangPhong = 0`)
    }).then(result => {
      let queryResult = result.recordset
      let JSONresult = {"messages": []}
      queryResult.forEach((row)=>{
        let khadung = ''
        if (row.tinhTrangPhong == 0) {khadung = 'trống ☑'} else {khadung = 'đã có người mượn❌'}
          JSONresult.messages.push({"text": 'Phòng: ' + row.idPhong +' '+ khadung})
      })
      resolve(JSONresult)
      sql.close()
    }).catch(error => {
      if (error) {
      reject ({"messages": [{"text" : '❌ Đã xảy ra lỗi: '+ err}]})
    }
    //reject(error)
    sql.close()
  })
  })
} 

let readAllPhongDaMuon = async () => {
    return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select * from PHONG where tinhTrangPhong = 1`)
    }).then(result => {
      let queryResult = result.recordset
      let JSONresult = {"messages": []}
      queryResult.forEach((row)=>{
        let khadung = ''
        if (row.tinhTrangPhong == 0) {khadung = 'trống ☑'} else {khadung = 'đã có người mượn❌'}
          JSONresult.messages.push({"text": 'Phòng: ' + row.idPhong +' '+ khadung})
      })
      resolve(JSONresult)
      sql.close()
    }).catch(error => {
      if (error) {
      reject ({"messages": [{"text" : '❌ Đã xảy ra lỗi: '+ err}]})
    }
    //reject(error)
    sql.close()
  })
  })
} 

let muonPhong = async (MSSV,idPhong,ngayMuon ,gioMuon) => {
  return new Promise((resolve, reject) => {
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request()
    .input('MSSV', sql.VarChar(8), MSSV)
    .input('idPhong', sql.VarChar(5),idPhong)
    .input('ngayMuon', ngayMuon)
    .input('gioMuon',  gioMuon)
    .execute('muonPhong')
  }).then(result => {
    let queryResult = result.recordset
    let JSONresult = {"messages": []}
    queryResult.forEach((row)=>{
      JSONresult.messages.push({"text": '☑ Đã mượn phòng: ' + row.idPhong+' thành công!'})
    })
    resolve(JSONresult)
    sql.close()
  }).catch(error => {
    if (error) {
      reject ({"messages": [{"text" : '❌ Đã xảy ra lỗi: '+ error}]})
    }
    sql.close()
  })
})
}

let traPhong = async (MSSV,idPhong,gioTra) => {
  try {
  let poolconnection = await sql.connect(config)
  let result = await poolconnection.request()
  .input('MSSV', sql.VarChar(8), MSSV)
  .input('idPhong', sql.VarChar(5),idPhong)
  .input('gioTra',  gioTra)
  .execute('traPhong')
  await sql.close()
  let queryResult = result.recordset
  let JSONresult = {"messages": []}
  queryResult.forEach((row)=>{
    JSONresult.messages.push({"text": '☑ Đã trả phòng: ' + row.idPhong+' thành công!'})
  })
  return JSONresult
} catch (err) {
  if (err) {
    sql.close()
    return error = {"messages": [{"text" : '❌ Đã xảy ra lỗi: '+ err}]}
  }
}
}

module.exports.readAllPhong = readAllPhong
module.exports.readAllPhongTrong = readAllPhongTrong
module.exports.readAllPhongDaMuon = readAllPhongDaMuon
module.exports.muonPhong = muonPhong
module.exports.traPhong = traPhong

