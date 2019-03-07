const Pinyin = require('@/utils/ChinesePY.js');
function pySegSort(arr: string[], empty?: boolean) {
  if (!String.prototype.localeCompare) {
    return null;
  }
  var letters = '*abcdefghjklmnopqrstwxyz'.split('');
  var zh = '阿八嚓哒妸发旮哈讥咔垃麻拏噢妑七呥扨它穵夕丫帀'.split('');
  // var zh = '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳'.split('');
  var segs = [];
  var curr;
  for (let i = 0; i < letters.length; i++) {
    curr = {
      letter: letters[i],
      data: [],
    };
    for (let j = 0; j < arr.length; j++) {
      if (
        (!zh[i - 1] || zh[i - 1].localeCompare(arr[j], 'zh') <= 0) &&
        arr[j].localeCompare(zh[i], 'zh') === -1
      ) {
        (curr.data as any).push(arr[j]);
      }
    }
    if (empty || curr.data.length) {
      (segs as any).push(curr);
      curr.data.sort(function(a, b) {
        return (a as any).localeCompare(b, 'zh');
      });
    }
  }
  console.log(segs);
  return segs;
}
function pySegSort2(arr: string[]) {
  let segs: Array<any> = [];
  const letters = 'abcdefghjklmnopqrstwxyz'.split('');
  // return data= [{data:array<string>,letter:string},{},{}]
  letters.forEach((element: string) => {
    let filterData: Array<string> = [];
    arr.forEach((item: string) => {
      let c = Pinyin.getWordsCode(item).charAt(0);
      console.log(c);
      if (c === element) {
        filterData.push(item);
      }
    });
    if (filterData.length !== 0) {
      segs.push({ letter: element, data: filterData });
    }
  });
  //最后把没挂载上的汉字分类为#
  let total: Array<string> = [];
  segs.forEach((element) => {
    total = [...element.data, ...total];
  });
  if (total.length < arr.length) {
    const mohu = {
      letter: '#',
      data: new Set([...arr].filter((x) => !(total as any).has(x))),
    };
    segs.push(mohu);
  }
  console.log(segs);
  return segs;
}
export default {
  pySegSort,
  pySegSort2,
};
