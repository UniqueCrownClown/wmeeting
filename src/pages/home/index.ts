import { Component, Vue, Emit } from 'vue-property-decorator';
import Calendar from '@/components/calendar/Calendar.vue';
import ActionSheet from '@/components/actionsheet/ActionSheet.vue';
import CheckList from '@/components/checklist/CheckList.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import PingYin from "@/utils/pingyin.ts"
@Component({
  components: {
    Calendar,
    ActionSheet,
    XHeader,
    CheckList,
  },
})
export default class Home extends Vue {
  title: string = 'apple';
  deskBookDate: Array<DayObj> = [];
  options: string[] = ['会议室1', '会议室2', '会议室3'];
  headerOption = {
    lefttext: '返回',
    lefticon: '',
    righttext: '完成',
    righticon: '',
  };
  personData: Array<LinkData> = [
    {
      name: '阿本',
      isCheck: false,
    },
    {
      name: '曹超',
      isCheck: true,
    },
    {
      name: '胡小风',
      isCheck: true,
    },
    {
      name: '方大',
      isCheck: false,
    },
    {
      name: '范进',
      isCheck: false,
    },
  ];
  isShow: boolean = false;
  leftevent() {
    console.log('left');
  }
  rightevent() {
    console.log('right');
  }
  testDialog() {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  }
  ssss() {
    const test = ["阿本","曹超","胡小风","方大","范进"]
    PingYin.pySegSort2(test);
  }
  handleComplate() {
    console.log('完成');
  }
  setdeskBookDate(value: Array<DayObj>) {
    console.log(value);
    this.deskBookDate = value;
  }
  handleOptions(value: string) {
    // alert(value);
    console.log(value);
    this.isShow = false;
  }
  handleShow(value: boolean) {
    this.isShow = value;
  }
  testAS() {
    console.log('aaaaaaaaaa');
    this.isShow = !this.isShow;
  }
  link() {
    wx.redirectTo({ url: '/pages/main/main' });
  }
  handleSelect(data: Array<string>) {
    console.log(data);
    //全量的data.name
    for (let i = 0; i < this.personData.length; i++) {
      if ((data as any).includes(this.personData[i].name)) {
        Vue.set(this.personData, i, {
          name: this.personData[i].name,
          isCheck: true,
        });
      } else {
        Vue.set(this.personData, i, {
          name: this.personData[i].name,
          isCheck: false,
        });
      }
    }
    // const change = this.personData.filter(
    //   (character) => character.name === data[0],
    // );
    // const index = this.personData.findIndex(
    //   (character) => character.name === data[0],
    // );
    console.log(this.personData);
  }
  mounted() {}
}
