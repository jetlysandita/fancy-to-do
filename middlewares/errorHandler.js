const responseApi = require("../helper/format").responseApi
function client(err, req, res, next) {
  try {
    if(err.name === 'SequelizeDatabaseError'){
      next(err)
    }else{
      let result = null
      if(err.errors){
        result = []
        err.errors.map(el => {
          let obj = {}
          obj[el.path] = el.message
          result.push(obj)
        })
      }
      res
        .status(err.statusCode || 400)
        .json(responseApi(null,result || err.message))
    }
  } catch (err) {
    next(err)
  }
}

function server(err, req, res, next) {
  res.status(500).json(responseApi(null,err.message))
}

module.exports = { client, server }