
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ActionSheet extends Vue {
  @Prop() private options!: string[];
  @Prop() private isShow!: boolean;

  private handleOptions(text: string) {
    this.$emit('handleOptions', text);
  }
  private handleMask() {
    this.$emit('handleShow', false);
  }
}
