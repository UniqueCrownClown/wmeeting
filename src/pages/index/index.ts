import { Vue, Component } from 'vue-property-decorator';
import { AppUrls } from '@/utils/consts.ts';

const debug = require('debug')('log:Index');

// 必须使用装饰器的方式来指定component
@Component
class Index extends Vue {
  AppUrls = AppUrls;
  ver: number = 123;
  detail: string = '212212';

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }

  testScan() {
    console.log('daoidadioaadai');
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res);
      },
    });
  }
}

export default Index;
