const pre = '/pages'
export const AppUrls = {
  INDEX: pre + '/index/main',
  COUNTER: pre + '/counter/main',
  PACKAGE_A: '/packageA/pages/index/main',
  BLE: pre + '/ble/main',
}
export const inArray = (arr, key, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i
    }
  }
  return -1
}

// ArrayBuffer转16进度字符串示例
export const ab2hex = (buffer) => {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}
