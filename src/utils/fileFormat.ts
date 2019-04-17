export const getImgType = (fileName: string, isDirectory: boolean): string => {
  if (!isDirectory) {
    if (fileName.includes('.')) {
      const arr = fileName.split('.');
      // 取数组最后一个
      const sha = arr[arr.length - 1];
      switch (sha) {
        case 'doc':
        case 'docx':
          return 'list-word';
        case 'ppt':
        case 'pptx':
          return 'list-ppt';
        case 'pdf':
          return 'list-pdf';
        case 'txt':
          return 'list-txt';
        case 'jpg':
        case 'png':
          return 'list-photo';
        case 'xls':
        case 'xlsx':
          return 'list-xlsx';
        default:
          return 'list-file';
      }
    }
    return 'list-file';
  }
  return 'list-folder';
};

// date对象返回指定格式
export const getFormatTimeString = (
  date: Date,
  connector: string = '.'
): string => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  return `${year}${connector}${month}${connector}${day} ${hour}:${min}`;
};
