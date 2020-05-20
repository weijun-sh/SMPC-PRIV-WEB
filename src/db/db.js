let db = {}
db.getLocalData = (name, key) => {
  return new Promise(resolve => {
    let data = localStorage.getItem(name)
    data = data ? JSON.parse(data) : ''
    let arr = []
    if (data) {
      if (key && data[key]) {
        arr.push(data[key])
      }
      if (!key) {
        for (let obj in data) {
          arr.push(data[obj])
        }
      }
    }
    resolve(arr)
  })
}

db.setLocalData = (name, key, val, unique) => {
  return new Promise(resolve => {
    let localData = localStorage.getItem(name)
    localData = localData ? JSON.parse(localData) : {}
    if (unique && localData[key]) {
      resolve('Repeat')
    } else {
      localData[key] = val
      let data = localData
      localStorage.setItem(name, JSON.stringify(data))
      resolve('Success')
    }
  })
}

db.removeLocalData = (name, key) => {
  return new Promise(resolve => {
    let localData = localStorage.getItem(name)
    localData = JSON.parse(localData)
    if (localData[key]) {
      delete localData[key]
      localStorage.setItem(name, JSON.stringify(localData))
    }
    resolve('Success')
  })
}

db.getSessionData = (name, key) => {
  return new Promise(resolve => {
    let data = sessionStorage.getItem(name)
    data = data ? JSON.parse(data) : ''
    let arr = []
    if (data) {
      if (key && data[key]) {
        arr.push(data[key])
      }
      if (!key) {
        for (let obj in data) {
          arr.push(data[obj])
        }
      }
    }
    resolve(arr)
  })
}

db.setSessionData = (name, key, val, unique) => {
  return new Promise(resolve => {
    let localData = sessionStorage.getItem(name)
    localData = localData ? JSON.parse(localData) : {}
    if (unique && localData[key]) {
      resolve('Repeat')
    } else {
      localData[key] = val
      let data = localData
      sessionStorage.setItem(name, JSON.stringify(data))
      resolve('Success')
    }
  })
}

db.removeSessionData = (name, key) => {
  return new Promise(resolve => {
    let localData = sessionStorage.getItem(name)
    localData = JSON.parse(localData)
    if (localData[key]) {
      delete localData[key]
      sessionStorage.setItem(name, JSON.stringify(localData))
    }
    resolve('Success')
  })
}

export default db