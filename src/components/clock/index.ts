import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Clock extends Vue {
  @Prop() private time!: string;
  @Prop() private size!: string;
  @Prop() private state!: number;
  private colorCollection: string[] = [
    "#FE8849",
    "#3384FE",
    "#0A4191",
    "#CECECE"
  ];
  private currentTIme: string = "";
  get background(): string {
    let start = this.time;
    let time = Number(start.substring(0, 2));
    if (this.state === 2) {
      return this.colorCollection[3];
    }
    if (time < 12) {
      return this.colorCollection[0];
    } else if (time < 19) {
      return this.colorCollection[1];
    } else {
      return this.colorCollection[2];
    }
  }
  // computed
  get hourDeg() {
    let start = this.time;
    let time = Number(start.substring(0, 2));
    let value = (time % 12) * 30;
    return "rotate(" + value + "deg)";
  }
  // computed
  get vsize() {
    return Number(this.size) / 7.5 + "vw";
  }
  // computed
  get hvsize() {
    return (Number(this.size) - 10) / 15 + "vw";
  }
  // computed
  get isHalf() {
    if (this.time.substring(3, 5) !== "00") {
      return true;
    }
    return false;
  }
}
