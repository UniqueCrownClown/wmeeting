import { getDeskList, releaseDesk, updateDeskState } from '@/api/';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component
export default class DeskList extends Vue {
  @meetModule.State('user') user!: IUser;
  private deskState: string[] = ['未使用', '使用中'];
  private deskStateText: string[] = ['开始使用', '提前释放'];
  private deskNumber: string[] = ['1号工位', '2号工位', '3号工位', '4号工位'];
  private deskBookRecord: Array<ResponseStation> = [];
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
        content: '请求异常'
      });;
      return;
    }
    const { status, data } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '请求异常'
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
    try {
      responseValue = await getDeskList(this.user.staffNum);
    } catch (err) {
      wx.showModal({
        title: '提示',
        content: '请求异常'
      });
      return;
    }
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
  setdeskBookRecord(data: any) {
    this.deskBookRecord = data;
  }
  deskBookAdd() {
    wx.redirectTo({ url: '../adddesk/main' });
  }
  async handleClick(id: string, occupy: number) {
    //console.log(occupy);
    if (occupy === 0) {
      wx.scanCode({
        onlyFromCamera: true,
        success: async (res: any) => {
          console.log(res);
          if (id !== res.result) {
            wx.showModal({
              title: '提示',
              content: '请用有效时期记录扫码~~~'
            });
            return;
          }
          try {
            let responseValue = await updateDeskState(
              res.result,
              this.user.staffNum,
            );
            console.log(responseValue);
            let { status, data } = responseValue;
            if (status !== 200) {
              wx.showModal({
                title: '提示',
                content: '请求异常'
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
              content: '请求异常'
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
