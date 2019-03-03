import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import RoomMap from "@/views/workarea/roommap/RoomMap.vue";
import DeskList from "@/views/workarea/desklist/DeskList.vue";
const workModule = namespace("workarea");
@Component({
  components: {
    RoomMap,
    DeskList
  }
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
    wx.redirectTo({url:"../../main/main"});
  }
  // activated() {
  //   (this.currentPosition as any) =
  //     this.$route.query.currentPosition || this.currentPosition;
  // }
  // deactivated() {
  //   // 失活的时候清除红标位置
  //   this.currentPosition = 0;
  // }
  @Watch("tabIndex")
  onChildChanged(val: number, oldVal: number) {
    // 当tabIndex从0变为1的时候，清除掉旧的红标位置
    this.currentPosition = val === 1 ? 0 : this.currentPosition;
  }

  private changeLocation(position: string) {
    this.tabIndex = 0;
    this.currentPosition = Number(position);
  }

  private switchstate(e: any) {
    if (e.target.nodeName.toLowerCase() === "span") {
      if (e.target.innerText === "室内地图") {
        this.tabIndex = 0;
      }
      if (e.target.innerText === "工位预约") {
        this.tabIndex = 1;
      }
    }
  }

  private handleTab(index){
    this.tabIndex = index;
  }
}