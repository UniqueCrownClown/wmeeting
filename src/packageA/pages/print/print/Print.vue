<template>
  <div class="print">
    <x-header title="云打印列表"
              isTab="false"
              :options="headerOption"
              @leftevent="returnMain"
              @rightevent="handleAdd" />
    <PrintList :items="fileItems"
               @handle-into="handleInto"
               @file-reupload="fileReupload"
               @file-uploadCancel="fileUploadCancel" />
    <div class="print-empty-tips"
         v-if="isShowTip">
      <i class="tips-trigger"></i>
      <div>
        <i class="iconfont icon-info"></i>
        <p>
          你尚未添加任何打印文件，请点击【+】按钮添加打印文件
        </p>
        <span @click="setShowTip">我知道了</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
.print {
  background-color: #e9e9e9;
  width: 100vw;
  height: 100vh;
  .print-empty-tips {
    background-color: #ffffff;
    font-size: 36rpx;
    color: #888888;
    width: 450rpx;
    height: 450rpx;
    position: absolute;
    top: 120rpx;
    right: 20rpx;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    i.tips-trigger {
      background-image: url(https://nanyan.agree.cn:10443/images/down-arrow.png);
      background-size: 100%;
      width: 50rpx;
      height: 50rpx;
      position: absolute;
      top: -36rpx;
      right: 40rpx;
    }
    div {
      width: 80%;
      i {
        display: block;
        font-size: 80rpx;
        color: #bbbbbb;
        margin: 10rpx;
      }
      p {
        margin: 20rpx 0;
      }
      span {
        color: #366bfd;
        float: right;
      }
    }
  }
}
</style>

