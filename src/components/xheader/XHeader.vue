<template>
  <div class="xheader">
    <div class="leftoption"
         @click="leftevent">{{options.lefttext}}</div>
    <h3 v-if="headerTab === undefined" @click="titleevent">{{ title }}</h3>
    <div v-else class="tabSwitch">
      <span v-for="(item,index) in headerTab"
            :key="index"
            @click="handleTab(index)"
            :class="{active:item.isSelect}">{{item.text}}</span>
    </div>
    <div class="rightoption"
         @click="rightevent">{{options.righttext}}</div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less">
@header-background-color: #1978fe;
.xheader {
  width: 100%;
  height: 84rpx;
  background-color: @header-background-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  color: #ffffff;
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
