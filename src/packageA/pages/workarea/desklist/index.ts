import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { getDeskList, releaseDesk, updateDeskState } from '@/api/';
const workModule = namespace('workarea');
const meetModule = namespace('meeting');
@Component
export default class DeskList extends Vue {
  @meetModule.State('user') user!: IUser;
  @workModule.State('deskBookRecord') deskBookRecord!: Array<ResponseStation>;
  @workModule.Mutation('setdeskBookRecord') setdeskBookRecord!: (payLoad: Array<ResponseStation>) => void;
  private deskState: string[] = ['未使用', '使用中'];
  private deskStateText: string[] = ['开始使用', '提前释放'];
  private deskNumber: string[] = ['1号工位', '2号工位', '3号工位', '4号工位'];
  private Loop: any = null;
  mounted() {
    // vue hook子组件redirectTo不触发
    this.queryDataList();
  }
  onShow() {
    this.queryDataList();
  }

  // onHide() {
  //   console.log('onHide');
  // }

  get getDeskBookList() {
    let data = this.deskBookRecord.filter(
      character => character.status !== 2,
    );
    return data;
  }

  private async releaseBook(id: string) {
    let responseValue;
    try {
      responseValue = await releaseDesk(id);
    } catch (err) {
      wx.showModal({
        title: '提示',
        content: err
      });;
      return;
    }
    const { status, data } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '服务器异常'
      });
    } else {
      let _this = this;
      if (data === 'success') {
        wx.showModal({
          title: '提示',
          content: '释放成功',
          showCancel: false,
          success(res: any) {
            if (res.confirm) {
              _this.queryDataList();
            }
          },
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '释放失败',
          showCancel: false,
          success(res: any) { },
        });
      }
    }
  }
  private showDeleteConfirm(value: string) {
    clearTimeout(this.Loop);
    this.Loop = null;
    this.Loop = setTimeout(() => {
      let _this = this;
      wx.showModal({
        title: '取消提示',
        content: '残忍取消该预约？',
        success(res) {
          if (res.confirm) {
            _this.releaseBook(value);
          } else if (res.cancel) {
            return;
          }
        },
      });
    }, 500);
  }
  private clearLoop() {
    clearTimeout(this.Loop);
    this.Loop = null;
  }
  private toRoomMap(value: string) {
    this.$emit('ee', value);
  }
  async queryDataList() {
    let responseValue;
    wx.showLoading({ title: '加载中~~~' })
    try {
      responseValue = await getDeskList(this.user.staffNum);
    } catch (err) {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: err
      });;
      return;
    }
    wx.hideLoading();
    // console.log(responseValue);
    let { status, data } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '请求异常'
      });
    } else {
      this.setdeskBookRecord(data);
    }
  }
  deskBookAdd() {
    wx.redirectTo({ url: '../adddesk/main' });
  }
  async handleClick(id: string, occupy: string) {
    if (occupy === '0') {
      wx.scanCode({
        onlyFromCamera: true,
        success: async (res: any) => {
          try {
            let responseValue = await updateDeskState(
              res.text,
              this.user.staffNum,
            );
            console.log(responseValue);
            let { status, data } = responseValue;
            if (status !== 200) {
              wx.showModal({
                title: '提示',
                content: '服务器异常'
              });
            } else {
              let _this = this;
              wx.showModal({
                title: '提示',
                content: data.msg,
                showCancel: false,
                success(res: any) {
                  if (res.confirm) {
                    _this.queryDataList();
                  }
                },
              });
            }
          } catch (err) {
            console.log('fetch error:' + err);
            wx.showModal({
              title: '提示',
              content: err
            });;
          }
        },
      });
    } else {
      // index === 1的情况
      this.releaseBook(id);
    }
  }
}
