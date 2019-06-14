import { Component, Vue } from 'vue-property-decorator';
import XHeader from '@/components/xheader/XHeader.vue';
import SwiperList from '@/components/swiperList/SwiperList.vue';
import { namespace } from 'vuex-class';
import { setPrintScreen, getPrintScreen, delPrintScene } from '@/api';
import { SwiperListItem } from '@/components/swiperList';
import { XXParms, deleteWrap } from '@/utils/consts';
const meetModule = namespace('meeting');
const printModule = namespace('print');
@Component({
  components: {
    SwiperList,
    XHeader
  }
})
export default class Print extends Vue {
  @meetModule.State('user') user!: IUser;
  @printModule.State('currentSceneData') currentSceneData!: SwiperListItem;
  @printModule.Mutation('setCurrentSceneData') setCurrentSceneData!: (
    xxx: SwiperListItem
  ) => void;
  private headerOption = {
    lefttext: '首页',
    lefticon: 'icon-leftarrow',
    righttext: '新增',
    righticon: 'icon-hao',
  };
  private isShowTip = false;
  private isShowCreate = false;
  private screenName = '';
  private fileItems: Array<SwiperListItem> = [];
  private returnMain() {
    wx.navigateBack();
  }
  private handleAdd() {
    this.isShowCreate = !this.isShowCreate;
  }

  handleInto(value: string) {
    const xxx: any = this.fileItems.find(element => element.id === value);
    this.setCurrentSceneData(xxx);
    wx.navigateTo({
      url: '../print/main'
    });
  }

  onReady() {
    this.queryData();
  }

  async queryData() {
    try {
      const response: PrintScreenResponse = await getPrintScreen(
        this.user.staffNum
      );
      const { data, status } = response;
      if (status === 200) {
        let tempFileItem: Array<SwiperListItem> = [];
        data.forEach(element => {
          tempFileItem.push({
            id: element.id,
            name: element.sceneName,
            token: element.token,
            fileCount: element.fileCount + '项'
          });
        });
        this.fileItems = tempFileItem;
      }
    } catch (e) {
      wx.showToast({ title: '服务器异常~~' })
    }
  }

  private async newScreenClick() {
    const params = {
      staffNum: this.user.staffNum,
      sceneName: this.screenName
    }
    const response = await setPrintScreen(params);
    const { data, status } = response;
    if (status === 200) {
      this.queryData();
      wx.showModal({
        title: '提示',
        content: '创建场景成功',
        success: () => {
          this.isShowCreate = false;
          this.screenName = '';
        }
      })

    } else {
      wx.showToast({ title: '服务器api异常~~~' })
    }

  }
  private cancelScreenClick() {
    this.isShowCreate = false;
  }

  private handleDelete(value: string) {
    const params: XXParms = {
      delFn: delPrintScene,
      value: value,
      queryFn: this.queryData
    };
    deleteWrap(params);
  }

}
