<template>
  <div class="mine">
    <x-header :title="title"
              :options="headerOption"
              @leftevent="returnLogin" />
    <div class="mine-cont">
      <div>
        工号:{{user.staffNum}}
      </div>
      <div>
        姓名:{{user.username}}
      </div>
    </div>
    <!-- <XTabBar/> -->
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less" scoped>
.mine {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .mine-cont {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>


