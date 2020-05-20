import db from '@/db/db.js'
const dbName = 'status'
function updateStatus (data) {
  if (!data.key) return
  
  let dataNow = Date.now()
  const params = {
    key: data.key,
    address: data.address,
    status: data.status,
    updatetime: dataNow
  }
  // console.log(params)
  return new Promise(resolve => {
    db.setLocalData(dbName, data.address + data.key, params, true).then(res => {
      resolve(res)
    })
  })
}

function findStatus (data) {
  return new Promise(resolve => {
    // console.log(params)
    db.getLocalData(dbName, data.address + data.key).then(res => {
      resolve(res)
    })
  })
}

function removeStatus (data) {
  return new Promise(resolve => {
    // console.log(params)
    db.removeLocalData(dbName, data.address + data.key).then(res => {
      resolve(res)
    })
  })
}

export {
  updateStatus,
  findStatus,
  removeStatus
}