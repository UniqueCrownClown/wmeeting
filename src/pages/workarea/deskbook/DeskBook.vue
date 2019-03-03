<template>
  <div class="deskBook">
    <!-- <Header title :leftOptions="{ backText: '' }">
      <a slot="left" @click="returnMain">返回</a>
      <div slot="middle" class="tabSwitch" @click="switchstate">
        <span :class="{ active: this.tabIndex === 0 }">室内地图</span>
        <span :class="{ active: this.tabIndex === 1 }">工位预约</span>
      </div>
      <a slot="right"></a>
    </Header>-->
    <x-header
      :headerTab="headerTab"
      :options="headerOption"
      @leftevent="returnMain"
      @handleTab="handleTab"
    />
    <div class="deskBook-main">
      <room-map v-show="tabIndex === 0" :locationValue="currentPosition"></room-map>
      <desk-list v-show="tabIndex === 1" v-on:ee="changeLocation"></desk-list>
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
      padding: 10px;
      font-size: 32px;
    }
    span.active {
      background-color: #366bfd;
      color: #ffffff;
    }
  }
  .vux-header-title-area {
    .overwrite-title {
      width: 80%;
      margin: 5px 10%;
    }
  }
  .deskBook-main {
    background-color: #e9e9e9;
    height: calc(100% - 46px);
  }
}
</style>
