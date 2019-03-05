import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import RoomMap from '@/packageA/pages/workarea/roommap/RoomMap.vue';
import DeskList from '@/packageA/pages/workarea/desklist/DeskList.vue';
import XHeader from '@/components/xheader/XHeader.vue';
const workModule = namespace('workarea');
@Component({
  components: {
    RoomMap,
    DeskList,
    XHeader,
  },
})
export default class DeskBook extends Vue {
  private headerOption = {
    lefttext: '返回',
    lefticon: '',
    righttext: '',
    righticon: '',
  };
  private headerTab = [
    { text: '室内地图', isSelect: true },
    { text: '工位预约', isSelect: false },
  ];
  private tabIndex: number = 0;
  private currentPosition: number = 0;
  private returnMain() {
    wx.redirectTo({ url: '../../main/main' });
  }
  
  @Watch('tabIndex')
  onChildChanged(val: number, oldVal: number) {
    // 当tabIndex从0变为1的时候，清除掉旧的红标位置
    this.currentPosition = val === 1 ? 0 : this.currentPosition;
  }

  private changeLocation(position: string) {
    this.tabIndex = 0;
    this.currentPosition = Number(position);
  }

  private handleTab(index) {
    this.tabIndex = index;
    console.log(index);
    this.headerTab = [
      { text: '室内地图', isSelect: index === 0 ? true : false },
      { text: '工位预约', isSelect: index === 1 ? true : false },
    ];
  }
}
