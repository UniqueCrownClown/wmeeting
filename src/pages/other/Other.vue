<template>
  <div class="other">
    <x-header :title="title"
              :options="headerOption"
              @leftevent="returnLogin" />
    <div class="other-cont">
      <div>建设中~~~~</div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less" scoped>
.other {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .other-cont {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>


