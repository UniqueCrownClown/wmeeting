const pre = '/pages';
export const AppUrls = {
  INDEX: pre + '/index/main',
  COUNTER: pre + '/counter/main',
  PACKAGE_A: '/packageA/pages/index/main',
  BLE: pre + '/ble/main',
};
export const inArray = (arr, key, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
};
export const cinArray = (arr, key, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0][key] === val) {
      return i;
    }
  }
  return -1;
};

// ArrayBuffer转16进度字符串示例
export const ab2hex = (buffer) => {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2);
  });
  return hexArr.join('');
};

export const compose = (...fns: Array<IComposeFn>) => {
  // const fns: Array<any> = [].slice.call(args);
  // return function (initialArg: any) {
  //   let res = initialArg
  //   for (let i = fns.length - 1; i > -1; i--) {
  //     res = fns[i](res)
  //   }
  //   return res
  // }
  const length = fns.length;
  return function (this: any, ...args: Array<any>) {
    let index = length - 1,
      result = length > 0 ? fns[index].apply(this, args) : args; //注意arg为数组，要用apply
    while (--index >= 0) {
      result = fns[index].call(this, result);
    }
    return result
  }
}

const deleteQuery = async (xxparms: XXParms) => {
  const responseValue = await xxparms.delFn(xxparms.value);
  const { status, data } = responseValue;
  if (status !== 200) {
    wx.showModal({
      title: '提示',
      content: '服务器异常'
    });
  } else {
    if (data === 'success') {
      return xxparms.queryFn();
    }
  }
  return false
}
export declare interface XXParms {
  value: string,
  delFn: (value: string) => any,
  queryFn: (queryParm?:string) => any
}
export const deleteWrap = (xxparms: XXParms): void => {
  wx.showModal({
    title: '取消提示',
    content: '残忍取消该预约？',
    success(res) {
      if (res.confirm) {
        return deleteQuery(xxparms)
      }
    },
  });
}
