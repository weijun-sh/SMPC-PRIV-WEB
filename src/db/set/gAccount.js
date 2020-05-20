import db from '@/db/db.js'
const dbName = 'accontName'
function updateGaccount (data) {
  if (!data.publicKey) return
  const params = {
    key: data.publicKey + data.address,
    name: data.name,
    address: data.address,
    publicKey: data.publicKey,
    updatetime: Date.now()
  }
  return new Promise(resolve => {
    db.setLocalData(dbName, data.publicKey + data.address, params).then(res => {
      resolve(res)
    })
  })
}

function findGaccount (data) {
  return new Promise(resolve => {
    db.getLocalData(dbName, data.publicKey + data.address).then(res => {
      resolve(res)
    })
  })
}

export {
  updateGaccount,
  findGaccount
}