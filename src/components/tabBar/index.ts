import { Component, Vue } from 'vue-property-decorator';
// import {
//   State,
//   Mutation
// } from 'vuex-class';
@Component
export default class TabBar extends Vue {
  // @State currentTab;
  // @Mutation('setCurrentTab') setCurrentTab;
  apple:string="1234567890";
  get current() {
    //return this.currentTab
    return 'homepage'
  }
  public handleChange(e: any) {
    console.log(e.mp.detail.key);
    // this.current = e.mp.detail.key;
    //this.setCurrentTab(e.mp.detail.key);
    // if (this.current !== 'homepage') {
    //   if (this.current === 'mine') {
    //     wx.switchTab({ url: '../mine/main' });
    //     return;
    //   }
    //   wx.switchTab({ url: '../other/main' });
    // }
  }
}
