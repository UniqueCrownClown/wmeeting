import { Component, Prop, Vue } from "vue-property-decorator";

export interface CellData {
  title: string;
  content: string;
  link?: string;
}
@Component
export default class CellItem extends Vue {
  @Prop() private cellData!: CellData;
  @Prop() private value!: string;
  private cellText: string = "";
  private handleCell(value: string) {
    if (this.cellData.link === undefined) {
      this.$emit("insertContent", value);
    }
    else {
      console.log(this.cellData.link);
      wx.redirectTo({url :this.cellData.link as string});
    }
  }
}
