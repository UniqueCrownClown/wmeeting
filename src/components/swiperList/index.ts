import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { staticImage } from '@/api/index'
export declare interface SwiperListItem {
  id: string;
  name: string;
  time?: string;
  fileCount: string;
  token?: string;
}
@Component
export default class SwiperList extends Vue {
  private actions = [
    {
      name: '删除',
      color: '#fff',
      fontsize: '20',
      width: 100,
      background: '#ed3f14',
    },
  ];
  @Emit()
  private handleDelete(value: string) {
    return value
  }
  @Prop() private items?: Array<SwiperListItem>;
  @Emit()
  public handleInto(id: string) {
    return id;
  }
  get ImgPath() {
    return staticImage('list-folder.png');
  }
}
