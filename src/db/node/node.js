import db from '@/db/db.js'
const dbName = 'node'
function insertNode (data) {
  if (!data.url) return
  const params = {
    url: data.url,
    timestamp: Date.now()
  }
  return new Promise(resolve => {
    db.setLocalData(dbName, data.url, params).then(res => {
      resolve(res)
    })
  })
}

function findNode (params) {
  params = params && params.url ? params.url : ''
  return new Promise(resolve => {
    db.getLocalData(dbName, params).then(res => {
      // console.log(res)
      resolve(res)
    })
  })
}

function removeNode (params) {
  params = params ? params : {}
  return new Promise(resolve => {
    db.removeLocalData(dbName, params.url).then(res => {
      resolve(res)
    })
  })
}

export {
  insertNode,
  findNode,
  removeNode
}