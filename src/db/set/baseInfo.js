import db from '@/db/db.js'
function updateBaseInfo (data) {
  if (!data.key) return
  const params = {
    key: data.key,
    value: data.value,
  }
  return new Promise((resolve, reject) => {
    db.setLocalData('baseInfo', data.key, params).then(res => {
      resolve(res)
    })
    // db.baseInfo.update({key: data.key}, {$set: params}, {upsert: true}, (err, res) => {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     resolve(res)
    //   }
    // })
  })
}

function findBaseInfo (data) {
  return new Promise((resolve, reject) => {
    // console.log(params)
    db.getLocalData('baseInfo', data.key).then(res => {
      resolve(res)
    })
    // db.baseInfo.find(params).sort({ timestamp: -1 }).exec((err, res) => {
    //   if (err) {
    //     // console.log(err)
    //     reject(err)
    //   } else {
    //     // console.log(res)
    //     resolve(res)
    //   }
    // })
  })
}


export {
  updateBaseInfo,
  findBaseInfo
}