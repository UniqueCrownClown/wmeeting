import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class VerticalBox extends Vue {
  @Prop() private data!: string;
  @Prop() private size!: number;
  private vsize: string = 100 / this.size + '%';
  private handleRouter(path: string) {
    wx.navigateTo({ url: path });
  }
}
