<template>
  <ul class="verticalBox">
    <li v-for="(item, index) in data"
        :key="index"
        :style="{ width: vsize,height:vsize }"
        @click="handleRouter(item.link)">
      <div class="vertical-box-item">
        <div class="img-box">
          <img :src="item.path"
               alt />
        </div>
        <div class="img-title">{{ item.name }}</div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
.verticalBox {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  li {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    div.vertical-box-item {
      div.img-box {
        margin: 20rpx 0;
        width: 120rpx;
        height: 120rpx;
        border-radius: 120rpx;
        background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        img {
          width: 100%;
          height: 100%;
        }
      }
      div.img-title {
        margin: 20rpx 0;
        font-family: PingFangSC-Regular;
        font-size: 30rpx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39rpx;
        letter-spacing: 0rpx;
        color: #333333;
        text-align: center;
      }
    }
  }
}
</style>
