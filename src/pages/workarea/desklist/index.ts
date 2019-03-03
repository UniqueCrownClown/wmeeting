import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { getDeskList, releaseDesk, updateDeskState } from "@/api/";
const workModule = namespace("workarea");
const meetModule = namespace("meeting");
@Component
export default class DeskList extends Vue {
  @meetModule.State("user") user!: any;
  @workModule.State("deskBookRecord") deskBookRecord!: any;
  @workModule.Mutation("setdeskBookRecord") setdeskBookRecord!: any;
  private deskState: string[] = ["未使用", "使用中"];
  private deskStateText: string[] = ["开始使用", "提前释放"];
  private deskNumber: string[] = ["1号工位", "2号工位", "3号工位", "4号工位"];
  private Loop: any = null;
  activated() {
    this.queryDataList();
  }
  get getDeskBookList() {
    let data = this.deskBookRecord.filter(
      (character: any) => character.state === "1"
    );
    return data;
  }
  private async releaseBook(id: string) {
    let responseValue;
    try {
      responseValue = await releaseDesk(id);
    } catch (err) {
      alert(err);
      return;
    }
    const { status, data } = responseValue;
    if (status !== 200) {
      alert("服务器异常");
    } else {
      if (data === "success") {
        (this as any).$msgBox
          .showMsgBox({
            title: "提示",
            content: "释放成功"
          })
          .then(
            (val: string) => {
              this.queryDataList();
            },
            (val: string) => {
              this.queryDataList();
            }
          );
      } else {
        (this as any).$msgBox.showMsgBox({
          title: "提示",
          content: "释放失败"
        });
      }
    }
  }
  private showDeleteConfirm(value: string) {
    clearTimeout(this.Loop);
    this.Loop = null;
    this.Loop = setTimeout(() => {
      let _this = this;
      (this as any).$msgBox
        .showMsgBox({
          title: "取消提示",
          content: "残忍取消该预约？"
        })
        .then((val: string) => {
          _this.releaseBook(value);
        });
    }, 500);
  }
  private clearLoop() {
    clearTimeout(this.Loop);
    this.Loop = null;
  }
  private toRoomMap(value: string) {
    this.$emit("ee", value);
  }
  async queryDataList() {
    let responseValue;
    try {
      responseValue = await getDeskList(this.user.usercard);
    } catch (err) {
      alert(err);
      return;
    }
    console.log(responseValue);
    let { status, data } = responseValue;
    if (status !== 200) {
      alert("请求异常");
    } else {
      this.setdeskBookRecord(data);
    }
  }
  deskBookAdd() {
    this.$router.push(`/addDesk`);
  }
  async handleClick(id: string, occupy: string) {
    if (occupy === "0") {
      // eslint-disable-next-line
      // cordova.plugins.barcodeScanner.scan(
      //   async (result: any) => {
      //     console.log(`barcode${result.text}`);
      //     console.log(`barcode${result.format}`);
      //     console.log(`barcode${result.cancelled}`);
      //     if (!result.cancelled) {
      //       try {
      //         let responseValue = await updateDeskState(
      //           result.text,
      //           this.user.usercard
      //         );
      //         console.log(responseValue);
      //         let { status, data } = responseValue;
      //         if (status !== 200) {
      //           alert("请求异常");
      //         } else {
      //           (this as any).$msgBox
      //             .showMsgBox({
      //               title: "提示",
      //               content: data.msg
      //             })
      //             .then(
      //               (val: string) => {
      //                 this.queryDataList();
      //               },
      //               (val: string) => {
      //                 this.queryDataList();
      //               }
      //             );
      //         }
      //       } catch (err) {
      //         console.log("fetch error:" + err);
      //         alert(err);
      //       }
      //     }
      //   },
      //   (error: any) => {
      //     (this as any).$msgBox.showMsgBox({
      //       title: "提示",
      //       content: "Scanning failed: " + error
      //     });
      //   },
      //   {
      //     preferFrontCamera: false, // iOS and Android
      //     showFlipCameraButton: false, // iOS and Android
      //     showTorchButton: false, // iOS and Android
      //     torchOn: false, // Android, launch with the torch switched on (if available)
      //     saveHistory: false, // Android, save scan history (default false)
      //     prompt: "请对准工位二维码进行扫描", // Android
      //     resultDisplayDuration: 300, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //     formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
      //     orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
      //     disableAnimations: true, // iOS
      //     disableSuccessBeep: false // iOS and Android
      //   }
      // );
    } else {
      // index === 1的情况
      this.releaseBook(id);
    }
  }
}