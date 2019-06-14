<template>
  <div class="superMain">
    <x-header :title="title"
              :options="headerOption"
              @leftevent="returnLogin" />
    <div class="superMain-cont">
      <canvas width="150"
              height="150"
              canvas-id="detailMeet"></canvas>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less" scoped>
.superMain {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(-10deg, #05327b 0%, #105ab6 100%),
    linear-gradient(#e9e9e9, #e9e9e9);
  .superMain-cont {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>


