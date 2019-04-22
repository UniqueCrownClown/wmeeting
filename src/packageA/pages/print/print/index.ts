import { Component, Vue } from 'vue-property-decorator';
import XHeader from '@/components/xheader/XHeader.vue';
import PrintList from '@/components/printlist/PrintList.vue';
import { getUploadUrl, getPrintFile } from '@/api/index';
import { namespace } from 'vuex-class';
import { compose } from '@/utils/consts'
import { getImgType } from '@/utils/fileFormat'
const meetModule = namespace('meeting');
const printModule = namespace('print');
@Component({
  components: {
    PrintList,
    XHeader
  }
})
export default class Print extends Vue {
  @meetModule.State('user') user!: User;
  @printModule.State('waitingFiles') waitingFiles!: Array<any>;
  @printModule.Mutation('setWaitingFiles') setWaitingFiles!: (
    payload: Array<any>
  ) => void;
  private uploadTask: any = null;
  private title = '云打印列表';
  private headerOption = {
    lefttext: '首页',
    lefticon: 'icon-leftarrow',
    righttext: '新增',
    righticon: 'icon-hao',
  };
  private isShowTip = false;
  private fileItems: Array<IFileMessage> = [];
  private returnMain() {
    wx.redirectTo({ url: `/pages/main/main` });
  }
  private handleAdd() {
    const _this = this;
    if (this.isShowTip) {
      //隐藏showTip
      this.isShowTip = false;
    }
    (wx as any).chooseMessageFile({
      count: 5,
      type: 'all',
      async success(res: any) {
        const { tempFiles } = res;
        //过滤掉不是能打印的文件格式的文件
        const type = ['list-word', 'list-ppt', 'list-pdf', 'list-txt', 'list-photo', 'list-xlsx'];
        const haha = tempFiles.filter((element: any) => type.includes(getImgType(element.name, false)));
        if(haha.length<=0){
          return;
        }
        _this.setWaitingFiles(haha);
        console.log(tempFiles);
        //tempFiles是个数组
        //上传之前先展现
        _this.waitingFiles.forEach((element: any) => {
          _this.fileItems.push({
            name: element.name,
            time: 'size',
            size: element.size,
            isUploaded: false,
            percent: '0'
          })
        });
        for (let element of tempFiles) {
          _this.uploadTask = await _this.fileUpload(element)
        }

        // this.uploadTask = wx.uploadFile({
        //   url: getUploadUrl,
        //   filePath: tempFiles[0].path,
        //   name: 'exampleInputFile',
        //   formData: {
        //     userCard: _this.user.usercard
        //   },
        //   success(res) {
        //     console.info(res);
        //     //上传成功，再次查询
        //     _this.queryData(_this.user.usercard);
        //   }
        // })
      }
    })
  }
  private fileUpload(tFile: IChooseItem) {
    const _this = this;
    const exclaim = (str: string) => str.startsWith('wx') ? str : 'tmp_' + str;
    const transform = (str: string) => str.substring(str.lastIndexOf('/') + 1);
    const test = compose(exclaim, transform);
    const ddddd = test(tFile.path);
    // let sssss = tFile.path.lastIndexOf('/') + 1;
    // let ddddd = tFile.path.substring(sssss);
    // if (!ddddd.startsWith('wx')) {
    //   ddddd = 'tmp_' + ddddd;
    // }
    // let hahaha = new Map();
    // hahaha.set(ddddd, tFile.name);
    let hahaha = {};
    hahaha[ddddd] = tFile.name;
    const xxx = wx.uploadFile({
      url: getUploadUrl,
      filePath: tFile.path,
      name: 'exampleInputFile',
      formData: {
        userCard: _this.user.usercard,
        fileNames: JSON.stringify(hahaha)
      },
      success(res) {
        console.info(res);
        //从waitingFiles上移除该文件
        _this.setWaitingFiles(
          _this.waitingFiles.filter(element => element !== tFile)
        );
        _this.queryData(_this.user.usercard);
      }
    });
    xxx.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      // console.log('已经上传的数据长度', res.totalBytesSent)
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      const sha: any = _this.fileItems.find(
        element => element.name === tFile.name
      );
      const index: number = _this.fileItems.findIndex(
        element => element.name === tFile.name
      );
      sha.percent = res.progress;
      Vue.set(this.fileItems, index, sha);
    });
    return xxx;
  }
  private fileReupload() {
    //重新开始下载文件
  }

  private fileUploadCancel() {
    this.uploadTask.abort() // 取消上传任务
  }


  private setShowTip() {
    this.isShowTip = false;
  }

  private handleInto(value: IFileMessage) {
    const data = JSON.stringify(value);
    console.log(data);
    wx.redirectTo({
      url: `../printdetail/main?data=${
        data
        }`,
    });
  }

  public onReady() {
    // console.log('测试生命周期');
    this.queryData(this.user.usercard);
  }

  private async queryData(userCard: string) {
    //查数据给fileItems赋值
    try {
      wx.showLoading({ title: '加载中~~~' });
      const responseValue: any = await getPrintFile(userCard);
      wx.hideLoading();
      const { data, status } = responseValue;
      if (status === 200) {
        //清空列表
        this.fileItems = [];
        console.info(data);
        data.forEach((element: any) => {
          this.fileItems.push({
            id: element.id,
            name: element.fileName,
            time: element.time,
            size: element.size,
            token: element.token,
            isUploaded: true
          });
        });
      }
    } catch (e) {
      console.log(e);
      wx.hideLoading();
      (this as any).showToast('服务器异常');
    }
    if (this.waitingFiles.length !== 0) {
      this.waitingFiles.forEach((element: any) => {
        this.fileItems.push({
          name: element.name,
          time: 'size',
          size: element.size,
          isUploaded: false,
          percent: '0'
        })
      });
    }
    if (this.fileItems.length === 0) {
      this.isShowTip = true;
    }
  }

}
