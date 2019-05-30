<template>
  <div class="deskBook">
    <x-header :headerTab="headerTab"
              :options="headerOption"
              @leftevent="returnMain"
              @handleTab="handleTab" />
    <div class="deskBook-main">
      <room-map v-if="tabIndex === 0"
                :locationValue="currentPosition"></room-map>
      <desk-list v-if="tabIndex === 1"
                 v-on:ee="changeLocation"></desk-list>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
.deskBook {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  div.tabSwitch {
    background-color: #ffffff;
    color: #366bfd;
    span {
      padding: 10rpx;
      font-size: 32rpx;
    }
    span.active {
      background-color: #366bfd;
      color: #ffffff;
    }
  }
  .deskBook-main {
    background-color: #e9e9e9;
    height: calc(100% - 224rpx);
  }
}
</style>
