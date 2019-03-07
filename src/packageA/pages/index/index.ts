import { Vue, Component } from 'vue-property-decorator'
import { AppUrls } from '@/utils/consts.ts'

const debug = require('debug')('log:PackageA/Index')
// 必须使用装饰器的方式来指定component
@Component
class Index extends Vue {
  AppUrls = AppUrls
  ver: number = 123

  onShow() { // 小程序 hook
    debug('onShow')
  }

  mounted() { // vue hook
    debug('mounted')
  }
}

export default Index
