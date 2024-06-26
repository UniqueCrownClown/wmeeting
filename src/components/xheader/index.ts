
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class XHeader extends Vue {
  @Prop() private title!: string;
  @Prop() private options!: Options;
  @Prop() private isTab!: boolean;
  @Prop() private headerTab!: Array<Tab>;
  private handleTab(index) {
    this.$emit("handleTab", index);
  }
  private leftevent() {
    this.$emit("leftevent")
  }
  private rightevent() {
    this.$emit("rightevent")
  }
  private titleevent() {
    this.$emit("titleevent")
  }
  get isleftIcon() {
    if (this.options.lefticon.length !== 0) {
      return true
    }
    return false

  }
  get isrightIcon() {
    if (this.options.righticon.length !== 0) {
      return true
    }
    return false

  }

}
