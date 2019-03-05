import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { getDeskList, releaseDesk, updateDeskState } from "@/api/";
const workModule = namespace("workarea");
@Component
export default class RoomMap extends Vue {
  @workModule.State("position") location!: any;
  @Prop() private locationValue!: string;
  private topValue: string = "59.5vw";
  private leftValue: string = "100vw";
  private locationData: any = [
    { top: "0vw", left: "0vw" },
    { top: "139vw", left: "43vw" },
    { top: "139vw", left: "56vw" },
    { top: "139vw", left: "69vw" },
    { top: "139vw", left: "82vw" },
    { top: "48vw", left: "56vw" }
  ];
  get postion() {
    return this.locationData[this.locationValue];
  }
  get isLocation() {
    if (this.locationValue === "0") {
      return false;
    }
    return true;
  }
}