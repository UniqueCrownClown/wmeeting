<template>
  <div class="main">
    <x-header title="首页"
              isTab="false"
              :options="headerOption"
              @leftevent="leftevent"
              @rightevent="rightevent" />
    <h3 class="main-kinds-title">办公类</h3>
    <vertical-box :data="workData"
                  :size="3" />
    <h3 class="main-kinds-title">生活类</h3>
    <vertical-box :data="lifeData"
                  :size="3" />
    <action-sheet :options="showMenu"
                  @handleOptions="handleOptions"
                  :isShow="isShow"
                  @handleShow="handleShow" />
    <div class="main-tab-bar">
      <i-tab-bar :current="current"
                 @change="handleChange">
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
      </i-tab-bar>
    </div>

  </div>
</template>
<script lang="ts" src="./index.ts">
</script>

<style lang="less">
.main {
  width: 100vw;
  height: 100vh;
  background-color: #e9e9e9;
  .main-kinds-title {
    text-align: left;
    padding-left: 20rpx;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 30rpx;
    font-weight: normal;
    color: #888888;
  }
  .main-tab-bar{
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>
