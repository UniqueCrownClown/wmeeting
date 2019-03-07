<template>
  <div class="xheader">
    <div class="left-option"
         @click="leftevent">{{options.lefttext}}</div>
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
         @click="rightevent">{{options.righttext}}</div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less">
@header-background-color: #1978fe;
.xheader {
  padding: 0 10rpx;
  height: 84rpx;
  background-color: @header-background-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  color: #ffffff;
  .left-option,
  .right-option {
    font-size: 28rpx;
  }
  div.tabSwitch {
    background-color: #ffffff;
    color: @header-background-color;
    border-radius: 4rpx;
    span {
      padding: 10rpx;
      font-size: 36rpx;
    }
    span.active {
      background-color: @header-background-color;
      color: #ffffff;
    }
  }
}
</style>
