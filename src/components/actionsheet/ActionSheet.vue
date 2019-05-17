<template>
  <div class="actionsheet" v-if="isShow" @click.stop="handleMask">
    <transition name="slide-fade">
      <ul>
        <li
          v-for="(item, index) in options"
          :key="index"
          @click="handleOptions(item)"
        >
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less" scoped>
.actionsheet {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:2;
  transition: all .8s;
  ul {
    list-style-type: none;
    position: fixed;
    bottom: 0;
    width: 100%;
    li {
      width: 750rpx;
      height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      border: none;
      font-family: PingFangSC-Regular;
      font-size: 32rpx;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rpx;
      color: #333333;
    }
  }
}
</style>
