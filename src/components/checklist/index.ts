import { Component, Prop, Vue } from 'vue-property-decorator';
import Pingyin from '@/utils/pingyin.ts';
const debug = require('debug')('log:comp/CheckList');
interface LinkData {
  name: string;
  isCheck: boolean;
}
interface PingyinData {
  letter: string;
  data: Array<string>;
}
interface ExchangeLinkData {
  letter: string;
  data: Array<LinkData>;
}
@Component
export default class CheckList extends Vue {
  @Prop() private linkData!: Array<LinkData>;
  onShow() {
    debug('onShow');
  }

  onHide() {
    debug('onHide');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  get personList() {
    let data: string[] = [];
    let tempData: any = {};
    let exchangeData: Array<ExchangeLinkData> = [];
    this.linkData.forEach((element: LinkData) => {
      data.push(element.name);
    });
    const totalData = Pingyin.pySegSort2(data);
    //把拼音排序的结果转化为带状态值的
    this.linkData.forEach((element: LinkData) => {
      let a = element.name;
      tempData = Object.assign(tempData, { [a]: element });
    });
    (totalData as Array<PingyinData>).forEach((element: PingyinData) => {
      let xxx: Array<LinkData> = [];
      //把string转成LinkData
      element.data.forEach((element2: string) => {
        xxx.push(tempData[element2]);
      });
      exchangeData.push(
        Object.assign({}, { letter: element.letter }, { data: xxx }),
      );
    });
    return exchangeData;
  }
  private handleSelect(name: string, value: boolean) {
    console.log(name + value);
    this.$emit('change', { name: name, isCheck: value });
  }
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.mp.detail.value);
    this.$emit('change', e.mp.detail.value);
  }
}
