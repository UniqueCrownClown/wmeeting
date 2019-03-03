<template>
  <div class="roomMap">
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
  background-image: url("../../../assets/images/地图1.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  .roomMap-dot-outer {
    width: 130px;
    height: 130px;
    border-radius: 130px;
    border: solid 1px #65adff;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translate(-50%, -50%);
    .roomMap-dot-inner {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      border: 2px solid #ffffff;
      background-color: #366bfd;
    }
  }
  .icon-location {
    position: absolute;
    color: #fa6017;
    font-size: 36px;
  }
}
</style>
