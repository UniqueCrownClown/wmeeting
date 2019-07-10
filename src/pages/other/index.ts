import XHeader from '@/components/xheader/XHeader.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    XHeader,
  },
})
export default class Other extends Vue {
  private title: string = '建设中';
  headerOption = {
    lefttext: '返回',
    lefticon: 'icon-leftarrow',
    righttext: '',
    righticon: '',
  };
  private returnLogin() {
    wx.navigateBack()
  }
}
