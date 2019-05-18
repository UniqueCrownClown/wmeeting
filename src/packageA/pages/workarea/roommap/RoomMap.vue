<template>
  <div class="roomMap">
    <img src="../../../..//assets/images/map.png" alt="室内地图">
    <div
      class="roomMap-dot-outer"
      :style="{ top: location.topValue, left: location.leftValue }"
    >
      <div class="roomMap-dot-inner"></div>
    </div>
    <i
      class="iconfont icon-location"
      v-show="isLocation"
      :style="{ top: postion.top, left: postion.left }"
    ></i>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
.roomMap {
  width: 100%;
  height: 100%;
  position: relative;
  img{
    object-fit:cover;
    width: 750rpx;
    height: 1215rpx;
  }
  .roomMap-dot-outer {
    width: 130rpx;
    height: 130rpx;
    border-radius: 130rpx;
    border: solid 1rpx #65adff;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translate(-50%, -50%);
    .roomMap-dot-inner {
      width: 40rpx;
      height: 40rpx;
      border-radius: 40rpx;
      border: 2rpx solid #ffffff;
      background-color: #366bfd;
    }
  }
  .icon-location {
    position: absolute;
    color: #fa6017;
    font-size: 36rpx;
  }
}
</style>
