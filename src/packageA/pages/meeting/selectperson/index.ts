import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { getLinkMan } from '@/api';
import CheckList from '@/components/checklist/CheckList.vue';
import XHeader from '@/components/xheader/XHeader.vue';
const meetModule = namespace('meeting');
@Component({
  components: {
    CheckList,
    XHeader,
  },
})
export default class SelectPerson extends Vue {
  @meetModule.State('bookPersonList') bookPersonList!: any;
  @meetModule.State('user') user!: any;
  @meetModule.Mutation('setbookPersonList') setbookPersonList!: any;
  private count: number = 0;
  private searchText: string = '';
  private title = '选择参会人员';
  get headerOption() {
    return {
      lefttext: '返回',
      lefticon: 'icon-leftarrow',
      righttext: `确定(${this.pagebookPersonList.length})`,
      righticon: '',
    };
  }
  private showSearch: boolean = false;
  private personData: Array<LinkData> = [];
  async mounted() {
    let responseValue = await getLinkMan('all');
    let { status, data } = responseValue;
    console.log(responseValue);
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '服务器异常',
      });
    } else {
      if (data.length > 0) {
        // 设置checkList状态
        if (
          this.pagebookPersonList.length === 0 &&
          !this.pagebookPersonList.some(
            this.hasCharacterFrom(this.user.username),
          )
        ) {
          // 预约人初始化时设置一下登录人勾选
          this.setbookPersonList([this.user.username]);
        }
        let selectData: Array<LinkData> = [];
        let noselectData: Array<LinkData> = [];
        this.pagebookPersonList.forEach((element: string) => {
          selectData.push({ name: element, isCheck: true });
        });
        data.forEach((element: string) => {
          if (!selectData.some(this.hasCharacterFrom(element))) {
            noselectData.push({ name: element, isCheck: false });
          }
        });
        this.personData = [...selectData, ...noselectData];
      } else {
        wx.showModal({ title: '提示', content: '联系人列表查询为空' });
      }
    }
  }
  private hasCharacterFrom(name: string) {
    return (character: any) => character.name === name;
  }
  private returnAddMeet() {
    //清空选择数据
    wx.navigateBack();
  }
  private handleSelect(data: Array<string>) {
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
    this.setbookPersonList(data);
  }
  // private selectChange(data: Array<LinkData>) {
  //   //返回差量的string[]
  //   console.log(this.personData);
  //   //filter出string[]
  //   let filterArray = this.personData.filter(
  //     character => character.isCheck === true
  //   );
  //   let bookList: string[] = [];
  //   filterArray.forEach(element => {
  //     bookList.push(element.name);
  //   });
  //   this.setbookPersonList(bookList);
  // }

  private certainBookPersonList() {
    wx.redirectTo({ url: `../addmeet/main` });
  }
  private removePerson(value: string) {
    let index = this.bookPersonList.indexOf(value);
    let nList: string[] = this.bookPersonList;
    nList.splice(index, 1);
    this.setbookPersonList(nList);
    //转一下personData
    this.personData.splice(
      this.personData.findIndex((item) => item.name === value),
      1,
    );
    this.personData.push({ name: value, isCheck: false });
  }
  private handleSearch() {
    console.log(this.searchText);
  }
  //computed属性
  get pagebookPersonList() {
    return this.bookPersonList;
  }
}
