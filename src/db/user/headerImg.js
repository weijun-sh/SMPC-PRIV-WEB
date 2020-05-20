import db from '@/db/db.js'
const dbName = 'headerImg'
function insertHeaderImg (data) {
  if (!data.address) return
  const params = {
    name: data.name,
    address: data.address,
    imgData: data.imgData,
    timestamp: Date.now()
  }
  return new Promise(resolve => {
    db.setSessionData(dbName, params.address, params).then(res => {
      resolve(res)
    })
  })
}

function findHeaderImg (params) {
  params = params ? params : {}
  return new Promise(resolve => {
    db.getSessionData(dbName, params.address).then(res => {
      resolve(res)
    })
  })
}

export {
  insertHeaderImg,
  findHeaderImg
}