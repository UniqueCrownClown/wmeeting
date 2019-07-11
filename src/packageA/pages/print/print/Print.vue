<template>
  <div class="print">
    <x-header :title="currentSceneData.name"
              isTab="false"
              :options="headerOption"
              @leftevent="returnMain"
              @rightevent="handleAdd" />
    <div class="print-swiper-tips"
         v-if="isShowSwiperTip">
      <div class="print-swiper-tips-text">
        <span class="iconfont icon-tips"></span>
        <span>下拉展示打印二维码</span>
      </div>
      <div class="print-swiper-tips-nomore"
           @click="setShowSwiperTip">不再提示</div>
    </div>
    <PrintList :items="fileItems"
               @handle-into="handleInto"
               @file-reupload="fileReupload"
               @file-uploadCancel="fileUploadCancel"
               @handle-delete="handleDelete" />
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
  overflow: hidden;
  .print-swiper-tips {
    width: 100%;
    background-color: #dff2ff;
    display: flex;
    justify-content: center;
    div {
      height: 60rpx;
      line-height: 60rpx;
    }
    .print-swiper-tips-text {
      color: #366bfd;
      flex: 1;
      text-align: center;
      font-size: 32rpx;
    }
    .print-swiper-tips-nomore {
      color: #888888;
      font-size: 28rpx;
    }
  }
  .print-empty-tips {
    background-color: #ffffff;
    font-size: 36rpx;
    color: #888888;
    width: 450rpx;
    height: 450rpx;
    position: absolute;
    top: 290rpx;
    right: 20rpx;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    i.tips-trigger {
      background-image: url(https://nanyan.agree.cn:10080/images/down-arrow.png);
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
  .print-swiper-list {
    height: calc(100%-224rpx);
  }
}
</style>

