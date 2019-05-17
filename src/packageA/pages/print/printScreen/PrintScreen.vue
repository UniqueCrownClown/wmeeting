<template>
  <div class="print">
    <x-header title="场景列表"
              isTab="false"
              :options="headerOption"
              @leftevent="returnMain"
              @rightevent="handleAdd" />
    <div class="print-create-screen"
         :class="{printShow:isShowCreate}">
      <input type="text"
             placeholder="新建场景"
             v-model="screenName">
      <div>
        <button @click="newScreenClick">新建</button>
        <button @click="cancelScreenClick">取消</button>
      </div>
    </div>
    <SwiperList :items="fileItems"
                @handle-into="handleInto"
                @handle-delete="handleDelete" />
    <div class="print-empty-tips"
         v-if="isShowTip">
      <i class="tips-trigger"></i>
      <div>
        <i class="iconfont icon-info"></i>
        <p>
          你尚未添加任何场景，请点击【+】按钮添加打印场景
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
  .print-create-screen {
    background-color: #f5f5f5;
    height: 0;
    opacity: 0;
    transition: all 1s;
    input {
      border: 1px solid #aaaaaa;
      font-size: 18px;
      border-radius: 5px;
      width: 80%;
      margin: 10rpx 10%;
      text-align: center;
    }
    div {
      display: flex;
      justify-content: space-around;
      padding: 10rpx;
    }
  }
  .printShow {
    height: 200rpx;
    opacity: 1;
    padding: 10rpx;
  }
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
}
</style>

