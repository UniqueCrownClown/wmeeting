<template>
  <ul class="print-swiper-list">
    <li v-for="(item, index) in items"
        :key="index">
      <i-swipeout :actions="actions"
                  @change="handleDelete(item.id)">
        <div slot="content"
             class="print-has-upload"
             @click="handleInto(item.id)">
          <div class="filetype">
            <img :src="ImgPath"
                 alt />
          </div>
          <div class="print-main">
            <div class="print-main-filename">{{ item.name }}</div>
            <div class="print-main-filemess">
              {{ item.fileCount }}
            </div>
          </div>
          <div class="iconnavigation">
            <i class="iconfont icon-rightarrow"></i>
          </div>
        </div>
      </i-swipeout>
    </li>
  </ul>
</template>
<script lang="ts" src='./index.ts'></script>
<style lang="less">
ul.print-swiper-list {
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  li {
    width: 100%;
    position: relative;
    border-bottom: 1rpx solid #ccc;
    .print-has-upload {
      display: flex;
      align-items: center;
      height: 80rpx;
      width: 750rpx;
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

      div.iconnavigation {
        padding: 20rpx;
        i.icon-rightarrow {
          font-size: 32rpx;
          position: absolute;
          left: 650rpx;
          top: 40rpx;
        }
      }
    }
  }
}
</style>
