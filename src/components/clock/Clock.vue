<template>
  <div class="circle-clock" :style="{ width: vsize, height: vsize }">
    <div
      class="circle-clock-cont"
      :style="{ background: background, transform: hourDeg }"
    >
      <div class="hour"></div>
    </div>
    <div
      class="minue"
      :class="{ isHalf: isHalf, isZero: !isHalf }"
      :style="{ height: hvsize }"
    ></div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
.circle-clock {
  position: relative;
  .circle-clock-cont {
    width: 100px;
    height: 100px;
    background-color: #fba;
    border-radius: 100%;
    position: relative;
    .hour {
      width: 2px;
      height: 30%;
      background-color: #f5f5f5;
      position: absolute;
      bottom: 50%;
      left: 50%;
    }
  }
  .minue {
    width: 2px;
    background-color: #e5e5e5;
    position: absolute;
    left: 50%;
  }
  .minue.isHalf {
    bottom: 6px;
  }
  .minue.isZero {
    top: 10px;
  }
}
</style>
