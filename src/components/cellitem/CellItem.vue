<template>
  <div class="cell-content" @click.prevent="handleCell(cellData.content)">
    <span class="cell-title">{{ cellData.title }}</span>
    <span class="cell-main">{{ value }}</span>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less">
.cell-content {
  height: 98rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cell-title {
    font-family: PingFangSC-Regular;
    font-size: 32rpx;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rpx;
    color: #333333;
  }
  .cell-main {
    width: 439rpx;
    height: 33rpx;
    font-family: PingFangSC-Regular;
    font-size: 32rpx;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rpx;
    color: #333333;
  }
}
</style>
