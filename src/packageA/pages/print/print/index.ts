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
  @printModule.State('waitingFiles') waitingFiles!: Array<IWaitFile>;
  @printModule.Mutation('setWaitingFiles') setWaitingFiles!: (
    payload: Array<IWaitFile>
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
    const sceneData = this.sceneData;
    //查询,然后传递
    const transform: any = {
      id: sceneData.id,
      time: sceneData.time,
      name: sceneData.name,
      size: sceneData.fileCount,
      token: sceneData.token
    };
    const data = JSON.stringify(transform);
    wx.navigateTo({
      url: `../printdetail/main?data=${
        data
        }`,
    });
  }
  private returnMain() {
    wx.redirectTo({
      url: './../printScreen/main'
    })
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
        console.log(tempFiles);
        //过滤掉不是能打印的文件格式的文件
        const type = ['list-word', 'list-ppt', 'list-pdf', 'list-txt', 'list-photo', 'list-xlsx'];
        const haha = tempFiles.filter((element: any) => type.includes(getImgType(element.name, false)));
        if (haha.length <= 0) {
          return;
        }
        _this.setWaitingFiles(haha);
        //console.log(tempFiles);
        //tempFiles是个数组
        //上传之前先展现
        _this.waitingFiles.forEach((element: any) => {
          _this.fileItems.push({
            unique: element.name + '0',
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
        //确认是否waitFile栈为空??不是的话有文件下载失败

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
    const exclaim = (str: string) => str.startsWith('wx') ? str : str;
    const transform = (str: string) => str.substring(str.lastIndexOf('/') + 1);
    const test = compose(exclaim, transform);
    const ddddd = test(tFile.path);
    let hahaha = {};
    hahaha[ddddd] = tFile.name;
    const fileds = {
      staffNum: _this.user.staffNum,
      sceneId: _this.sceneData.id,
      fileNames: JSON.stringify(hahaha)
    };
    //console.log(fileds);
    const xxx = wx.uploadFile({
      url: getUploadUrl,
      filePath: tFile.path,
      name: 'filelist',
      formData: fileds,
      success(res) {
        //从waitingFiles上移除该文件
        _this.setWaitingFiles(
          _this.waitingFiles.filter(element => element !== tFile)
        );
        _this.queryData(_this.sceneData.id);
      },
      fail() {
        wx.showToast({ title: '上传失败~~~' })
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
      sha.unique = sha.name + res.progress;
      Vue.set(this.fileItems, index, sha);
    });
    return xxx;
  }
  private fileReupload(fileName: string) {
    //重新开始下载文件
    //从waitFiles里面取文件下载
    const tempFile = this.waitingFiles.find(element => element.name === fileName);
    this.fileUpload(tempFile as any);
  }

  private fileUploadCancel(name: string) {
    let own = this;
    wx.showModal({
      title: '提示',
      content: `取消文件${name}的上传??`,
      success: (res) => {
        if (res.confirm) {
          // 取消上传任务
          this.uploadTask.abort();
          const haha = this.waitingFiles.filter(element => element.name !== name);
          this.setWaitingFiles(haha);
          const index = this.fileItems.findIndex(element => element.name != name);
          this.fileItems.splice(index, 1);
        }
      },
    })
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
      const responseValue: PrintFileResponse = await getPrintFile(sceneId);
      const { data, status } = responseValue;
      if (status === 200) {
        //清空列表
        this.fileItems = [];
        data.forEach(element => {
          this.fileItems.push({
            unique: element.fileName + '100',
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
      wx.showToast({ title: '服务器异常' });
    }
    if (this.waitingFiles.length !== 0) {
      this.waitingFiles.forEach((element: any) => {
        this.fileItems.push({
          unique: element.name + '0',
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
    const haha = deleteWrap(params);
    if (haha === 'fail') {
      wx.showToast({ title: '删除失败' })
    }
  }

}
