<template>
  <div class="main-tab-bar">
    <div class="ddadad">{{apple}}</div>
    <!-- <i-tab-bar :current="current"
               @change="handleChange"
               fixed="true">
      <i-tab-bar-item key="homepage"
                      icon="homepage"
                      current-icon="homepage_fill"
                      title="Home"></i-tab-bar-item>
      <i-tab-bar-item key="group"
                      icon="group"
                      current-icon="group_fill"
                      title="Friends"></i-tab-bar-item>
      <i-tab-bar-item key="mine"
                      icon="mine"
                      current-icon="mine_fill"
                      dot
                      title="My"></i-tab-bar-item>
    </i-tab-bar> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class XTabBar extends Vue {
  apple:string= '1234567890';
}

</script>
<style lang="less">
</style>
