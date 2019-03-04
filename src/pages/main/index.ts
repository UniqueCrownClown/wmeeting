import { Component, Prop, Vue } from "vue-property-decorator";
import VerticalBox from "@/components/verticalbox/VerticalBox.vue";
import XHeader from '@/components/xheader/XHeader.vue';
@Component({
  components: {
    VerticalBox,
    XHeader
  }
})
export default class XMain extends Vue {
  private title:string="首页"
  private headerOption={
    lefttext:"返回",
    lefticon:"",
    righttext:"完成",
    righticon:""
  }
  leftevent(){
    console.log("left")
  }
  rightevent(){
    console.log("right")
  }
  private workData: any = [
    {
      name: "会议管理",
      path: require("./../../assets/images/icon-1.png"),
      link: "/pages/meeting/meet/main"
    },
    {
      name: "办公管理",
      path: require("./../../assets/images/icon-2.png"),
      link: "/pages/workarea/deskbook/main"
    },
    {
      name: "报销管理",
      path: require("./../../assets/images/icon-3.png"),
      link: "/main"
    }
  ];
  private lifeData: any = [
    { name: "请假", path: require("./../../assets/images/icon-4.png") },
    { name: "项目", path: require("./../../assets/images/icon-5.png") },
    { name: "合同", path: require("./../../assets/images/icon-6.png") },
    { name: "出差", path: require("./../../assets/images/icon-7.png") },
    { name: "外出登记", path: require("./../../assets/images/icon-8.png") },
    { name: "宿舍入住", path: require("./../../assets/images/icon-9.png") }
  ];
}
