import { Component, Vue } from 'vue-property-decorator';
import { staticImage } from '@/api/';
import XHeader from '@/components/xheader/XHeader.vue';
const QRCode = require('@/utils/weapp-qrcode.js');
import rpx2px from '@/utils/rpx2px.js';
export interface IQueryPrint {
  id: string;
  name: string;
  size: string;
  token: string;
  time: string;
}
@Component({
  components: { XHeader },
})
export default class PrintDetail extends Vue {
  private query: any;
  private item: IFileMessage = { id: 'xxx', name: '', size: 0, time: '', token: '' };
  onLoad(option: any) {
    this.query = option;
  }
  onReady() {
    this.item = JSON.parse(this.query.data);
  }
  mounted() {
    // console.info(this.query.data);
    // 300rpx 在6s上为 150px
    const qrcodeWidth = rpx2px(300);
    new QRCode('detailPrint', {
      // usingIn: this,
      text: this.item.token,
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: '#333333',
      colorLight: 'white',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
  get getImgPath() {
    return staticImage('list-folder.png')
  }
  private returnPrint() {
    wx.navigateBack();
  }
}
