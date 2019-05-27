import { Component, Vue } from 'vue-property-decorator';
import XHeader from '@/components/xheader/XHeader.vue';
import PrintList from '@/components/printlist/PrintList.vue';
import { getUploadUrl, getPrintFile, delPrintFile } from '@/api/index';
import { namespace } from 'vuex-class';
import { compose, XXParms, deleteWrap } from '@/utils/consts'
import { getImgType } from '@/utils/fileFormat'
import { SwiperListItem } from '@/components/swiperList';
const meetModule = namespace('meeting');
const printModule = namespace('print');
@Component({
  components: {
    PrintList,
    XHeader
  }
})
export default class Print extends Vue {
  @meetModule.State('user') user!: IUser;
  @printModule.State('currentSceneData') currentSceneData!: SwiperListItem;
  @printModule.State('waitingFiles') waitingFiles!: Array<any>;
  @printModule.Mutation('setWaitingFiles') setWaitingFiles!: (
    payload: Array<any>
  ) => void;
  private uploadTask: any = null;
  private headerOption = {
    lefttext: '首页',
    lefticon: 'icon-leftarrow',
    righttext: '新增',
    righticon: 'icon-hao',
  };
  private isShowTip = false;
  private isShowSwiperTip = true;
  private setShowSwiperTip() {
    this.isShowSwiperTip = false;
  }
  swipeHandler(e: any) {
    //e.changedTouches.clientX和clientY
    if (e.direction === 'Down') {
      this.showDetail()
    }
  }
  private fileItems: Array<IFileMessage> = [];
  get sceneData() {
    return this.currentSceneData;
  }
  private showDetail() {
    //查询,然后传递
    const transform: any = {
      id: this.sceneData.id,
      time: this.sceneData.time,
      name: this.sceneData.name,
      size: this.sceneData.fileCount,
      token: this.sceneData.token
    };
    const data = JSON.stringify(transform);
    console.log(data);
    wx.navigateTo({
      url: `../printdetail/main?data=${
        data
        }`,
    });
  }
  private returnMain() {
    wx.navigateBack();
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
        if (haha.length <= 0) {
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
    let hahaha = {};
    hahaha[ddddd] = tFile.name;
    fileNames: JSON.stringify(hahaha)
    const xxx = wx.uploadFile({
      url: getUploadUrl,
      filePath: tFile.path,
      name: 'filelist',
      formData: {
        staffNum: _this.user.staffNum,
        sceneId: _this.sceneData.id,
      },
      success(res) {
        //从waitingFiles上移除该文件
        _this.setWaitingFiles(
          _this.waitingFiles.filter(element => element !== tFile)
        );
        _this.queryData(_this.sceneData.id);
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
    console.log(value);
  }

  mounted() {
    this.queryData(this.sceneData.id);
  }

/**
* 下滑刷新事件
*/
  public onPullDownRefresh() {
    this.showDetail();
    wx.stopPullDownRefresh();
  }

  private async queryData(sceneId: string = this.sceneData.id) {
    //查数据给fileItems赋值
    try {
      wx.showLoading({ title: '加载中~~~' });
      const responseValue: PrintFileResponse = await getPrintFile(sceneId);
      wx.hideLoading();
      const { data, status } = responseValue;
      if (status === 200) {
        //清空列表
        this.fileItems = [];
        data.forEach(element => {
          this.fileItems.push({
            id: element.id,
            name: element.fileName,
            time: element.uploadTime,
            size: element.size,
            token: element.token,
            isUploaded: true
          });
        });
      }
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '服务器异常' });
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


  private handleDelete(value: string) {
    const params: XXParms = {
      delFn: delPrintFile,
      value: value,
      queryFn: this.queryData
    };
    deleteWrap(params);
  }

}
