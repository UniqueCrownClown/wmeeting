<template>
  <div class="xheader">
    <div class="left-option"
         @click="leftevent">
      <span v-if="!isleftIcon">{{options.lefttext}}</span>
      <i v-if="isleftIcon"
         class="iconfont"
         :class="options.lefticon"></i>
    </div>
    <h3 v-if="headerTab === undefined"
        @click="titleevent">{{ title }}</h3>
    <div v-else
         class="tabSwitch">
      <span v-for="(item,index) in headerTab"
            :key="index"
            @click="handleTab(index)"
            :class="{active:item.isSelect}">{{item.text}}</span>
    </div>
    <div class="right-option"
         @click="rightevent">
      <span v-if="!isrightIcon">{{options.righttext}}</span>
      <i v-if="isrightIcon"
         class="iconfont"
         :class="options.righticon"></i>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less">
@header-background-color: #1978fe;

.xheader {
  height: 120rpx;
  background: @header-background-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 36rpx;
  color: #ffffff;
  .left-option,
  .right-option {
    font-size: 32rpx;
    span {
      min-width: 20rpx;
      padding: 0 16rpx;
    }
    i {
      padding: 0 16rpx;
    }
  }
  div.tabSwitch {
    // background-color: #ffffff;
    // color: @header-background-color;
    border-radius: 4rpx;
    span {
      padding: 10rpx;
      font-size: 36rpx;
    }
    span.active {
      // background-color: @header-background-color;
      // color: #ffffff;
      border-bottom: 2px solid #ffffff;
    }
  }
}
</style>
