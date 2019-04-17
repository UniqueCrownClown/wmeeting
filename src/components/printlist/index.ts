import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { getImgType } from '@/utils/fileFormat';
import { staticImage } from '@/api/index'
@Component
export default class PrintList extends Vue {
  @Prop() private items?: Array<IFileMessage>;
  @Emit()
  public fileReupload(fileName: string) {
    return fileName;
  }
  @Emit()
  public fileUploadCancel(name: string) {
    return name;
  }

  @Emit()
  public handleInto(item: any) {
    return item;
  }
  get getImgPath() {
    let allImgPath: string[] = [];
    (this.items as Array<IFileMessage>).forEach(element => {
      allImgPath.push(this.getImg(element.name, false));
    });
    return allImgPath;
  }
  public getImg(value: string, isDirectory: boolean): string {
    // require变量的处理方式
    // return require('./../../assets/images/' +
    //   getImgType(value, isDirectory) +
    //   '.png');
    const xxx = getImgType(value, isDirectory) + '.png';
    return staticImage(xxx);
  }
}
