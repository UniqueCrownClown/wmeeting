<template>
  <div class="home">
    <x-header :title="title" :options="headerOption" @leftevent="leftevent" @rightevent="rightevent" />
    <calendar :deskBookDate="deskBookDate"
              @setdeskBookDate="setdeskBookDate" />
    <button @click="testDialog">测试按钮</button>
    <action-sheet :options="options"
                 @handleOptions="handleOptions"
                 :isShow="isShow"
                 @handleShow="handleShow"></action-sheet>
    <button @click="testAS">测试actionsheet展开</button>
    <button @click="link">打开main页</button>
    <check-list :linkData="personData"
               @change="handleSelect"></check-list>
    <i-button type="primary" @click="ssss">这是一个按钮</i-button>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less">
//小程序复选框样式
checkbox {
width: 32rpx;
height: 32rpx;
border-radius:50%;
}

checkbox .wx-checkbox-input {
width: 32rpx;
height: 32rpx;
border-radius:50%;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
background: #3296fa;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
width: 32rpx;
height: 32rpx;
line-height: 32rpx;
text-align: center;
font-size: 24rpx;
color: #fff;
background: transparent;
transform: translate(-50%, -50%) scale(1);
-webkit-transform: translate(-50%, -50%) scale(1);
}
</style>

