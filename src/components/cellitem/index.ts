import { Component, Prop, Vue } from "vue-property-decorator";

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
      wx.navigateTo({url :this.cellData.link as string});
    }
  }
}
