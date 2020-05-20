import db from '@/db/db.js'
const dbName = 'groupName'
function updateGroup (data) {
  if (!data.gId) return
  const params = {
    key: data.gId + data.address,
    gId: data.gId,
    address: data.address,
    name: data.name,
    updatetime: Date.now()
  }
  return new Promise(resolve => {
    db.setLocalData(dbName, data.gId + data.address, params).then(res => {
      resolve(res)
    })
  })
}

function findGroup (data) {
  return new Promise(resolve => {
    db.getLocalData(dbName, data.gId + data.address).then(res => {
      resolve(res)
    })
  })
}


export {
  updateGroup,
  findGroup,
}