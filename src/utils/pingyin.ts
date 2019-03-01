function pySegSort(arr: string[], empty?: boolean) {
  if (!String.prototype.localeCompare) {
    return null;
  }
  var letters = '*abcdefghjklmnopqrstwxyz'.split('');
  var zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');

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
  return segs;
}

export default {
  pySegSort,
};
