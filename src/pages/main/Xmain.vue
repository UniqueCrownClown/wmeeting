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
}
</style>
