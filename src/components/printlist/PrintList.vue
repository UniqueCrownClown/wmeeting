<template>
  <ul class="print-list">
    <li v-for="(item, index) in items"
        :key="index">
      <i-swipeout :actions="actions"
                  @change="handleDelete(item.id)">
        <div slot="content"
             class="print-has-upload"
             @click="handleInto(item)">
          <div class="filetype">
            <img :src="getImgPath[index]"
                 alt />
          </div>
          <div class="print-main">
            <div class="print-main-filename">{{ item.name }}</div>
            <div class="print-main-filemess">
              {{ item.time }} | {{ item.size }} B
            </div>
          </div>
        </div>
        <div v-if="!item.isUploaded"
             class="print-upload-mask">
          <div class="upload-percent"
               v-if="item.percent">
            <div class="upload-outcircle">
              <div class="upload-incircle"></div>
            </div>
            <span>{{ item.percent }}</span>
          </div>
          <div class="upload-fail"
               v-else>
            <i class="iconfont icon-am-error"></i>
            <span>上传失败</span>
            <button class="reupload-btn"
                    @click="fileReupload(item.name)">
              重新上传
            </button>
          </div>
          <i class="iconfont icon-del"
             @click="fileUploadCancel(item.name)"></i>
        </div>
      </i-swipeout>
    </li>
  </ul>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less">
ul.print-list {
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  li {
    width: 100%;
    height: 120rpx;
    position: relative;
    border-bottom: 1rpx solid #ccc;
    div.print-has-upload {
      display: flex;
      align-items: center;
      div.filetype {
        padding: 24rpx 40rpx;

        img {
          width: 62rpx;
          height: 54rpx;
        }
      }

      div.print-main {
        width: 500rpx;
        text-align: left;
        line-height: 40rpx;

        div.print-main-filename {
          width: 100%;
          font-size: 30rpx;
          font-weight: 700;
          color: #333333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        div.print-main-filemess {
          margin-top: 4rpx;
          font-size: 24rpx;
          color: #a6a6a6;
        }
      }
    }

    div.print-upload-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
      font-size: 36rpx;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;

      div.upload-percent {
        display: inline-block;
        position: relative;

        div.upload-outcircle {
          width: 100rpx;
          height: 100rpx;
          border-radius: 100%;
          background-image: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(0, 0, 0, 1) 100%
          );
          animation: rotate 2s linear infinite;

          div.upload-incircle {
            width: 90rpx;
            height: 90rpx;
            position: absolute;
            top: 5rpx;
            left: 5rpx;
            border-radius: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            text-align: center;
            line-height: 80rpx;
            font-size: 24rpx;
            color: #666666;
            letter-spacing: 2rpx;
          }
        }

        span {
          position: absolute;
          top: 30rpx;
          left: 30rpx;
          font-size: 24rpx;
        }
      }

      div.upload-fail {
        font-size: 32rpx;
        color: #ffffff;
        width: 360rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        i.icon-am-error {
          font-size: 36rpx;
        }

        button.reupload-btn {
          background-color: rgba(255, 255, 255, 0);
          color: #ffffff;
          border: 2rpx solid #ffffff;
          border-radius: 6rpx;
          outline: none;
          padding: 4rpx 10rpx;
          font-size: 32rpx;
        }
      }

      i.icon-del {
        position: absolute;
        top: 40rpx;
        right: 100rpx;
        font-size: 36rpx;
        color: #ffffff;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) skew(0deg) scale(1);
  }

  100% {
    transform: rotate(360deg) skew(0deg) scale(1);
  }
}
</style>
