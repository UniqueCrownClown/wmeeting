<template>
  <div class="print-detail">
    <div class="print-detail-main">
      <div class="print-detail-up">
        <div class="print-detail-filetype">
          <img :src="getImgPath"
               alt />
        </div>
        <div class="print-detail-file">
          <div class="print-detail-filename">{{ item.name }}</div>
          <div class="print-detail-filemess">
            {{ item.time }}
            {{ item.size }}
          </div>
        </div>
      </div>
      <div class="print-detail-down">
        <canvas canvas-id="detailPrint"></canvas>
        <div class="print-detail-tips">
          <div class="print-detail-tips-title">
            <i class="iconfont icon-tips"></i>
            <span>TIPS</span>
          </div>
          <p>请移步至打印机旁出示二维码被扫描后，于打印机上设置并打印文件</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
.print-detail {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(-10deg, #05327b 0%, #105ab6 100%),
    linear-gradient(#e9e9e9, #e9e9e9);
  background-blend-mode: normal, normal;
  .print-detail-main {
    width: 686rpx;
    height: 947rpx;
    background-color: #ffffff;
    margin: 80rpx auto;
    border-radius: 10rpx;
    .print-detail-up {
      height: 360rpx;
      border-bottom: 2rpx #cccccc dotted;
      overflow: hidden;
      .print-detail-filetype {
        padding: 70rpx 0 30rpx 0;
        text-align: center;
        img {
          width: 124rpx;
          height: 124rpx;
        }
      }
      .print-detail-file {
        font-family: 'PingFangSC-Medium';
        text-align: center;
        .print-detail-filename {
          font-size: 38rpx;
          line-height: 50rpx;
          color: '#333333';
          margin-bottom: 10rpx;
          font-weight: 700;
          width: 80%;
          text-overflow: ellipsis;
          overflow: hidden;
          display: inline-block;
        }
        .print-detail-filemess {
          font-size: 32rpx;
          color: #888888;
          padding: 0 20rpx;
        }
      }
    }
    .print-detail-down {
      padding-top: 20rpx;
      .print-detail-tips {
        width: 600rpx;
        height: 132rpx;
        border-radius: 6rpx;
        background-color: #f2f2f2;
        margin: 80rpx auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .print-detail-tips-title {
          border-right: 1rpx solid #a6a6a6;
          font-size: 30rpx;
          padding: 0 10rpx;
          i.icon-tips {
            font-size: 32rpx;
            display: block;
          }
        }
        p {
          font-size: 26rpx;
          line-height: 40rpx;
          padding: 0 10rpx;
        }
      }
      canvas {
        width: 300rpx;
        height: 300rpx;
        margin: 20rpx auto;
      }
    }
  }
}
</style>
