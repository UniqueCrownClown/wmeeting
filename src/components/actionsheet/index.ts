
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
const debug = require('debug')('log:Comp/ActionSheet');
@Component
export default class ActionSheet extends Vue {
  @Prop() private options!: string[];
  @Prop() private isShow!: boolean;

  @Emit()
  private handleOptions(text: string) {
    this.$emit('handleOptions', text);
  }
  @Emit()
  private handleMask(value: boolean = false) {
    this.$emit('handleShow', value);
  }

  onShow() {
    debug('onShow');
  }

  onHide() {
    debug('onHide');
  }

  mounted() {
    // vue hook
    debug('mounted');
  }
}
