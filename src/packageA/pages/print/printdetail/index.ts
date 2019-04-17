import { Component, Vue } from 'vue-property-decorator';
import { getImgType } from '@/utils/fileFormat';
import { staticImage, delPrintFile } from '@/api/';
import XHeader from '@/components/xheader/XHeader.vue';
const QRCode = require('@/utils/weapp-qrcode.js');
import rpx2px from '@/utils/rpx2px.js';
@Component({
  components: { XHeader },
})
export default class PrintDetail extends Vue {
  private title: string = '打印详情';
  private headerOption = {
    lefttext: '返回',
    lefticon: '',
    righttext: '删除',
    righticon: 'icon-del',
  };
  private query: any;
  private item: IFileMessage = { id: -1, name: 'default.txt', size: 12345, time: 'dadadad', token: '313214e4' };
  onLoad(option) {
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
    return this.getImg(this.item.name)
  }
  private getImg(value: string) {
    const xx = getImgType(value, false) + '.png';
    return staticImage(xx)
  }
  private handleDel(id: string) {
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '残忍删除该文件？？？',
      async success(res: any) {
        if (res.confirm) {
          const response = await delPrintFile(id);
          console.log(response);
          //成功删除后跳回打印列表页
          const { data } = response;
          if (data === 'success') {
            _this.returnPrint();
          } else {
            wx.showToast({
              title: '删除失败',
              duration: 3000,
            });
          }
        }
      }
    })
  }
  private returnPrint() {
    wx.redirectTo({ url: '../print/main' })
  }
}
