import db from '@/db/db.js'

function insertAccount (data) {
  return new Promise(resolve => {
    resolve([])
  })
}

function findAccount (params) {
  params = params ? params : {}
  return new Promise(resolve => {
    resolve([])
  })
}

export {
  insertAccount,
  findAccount
}