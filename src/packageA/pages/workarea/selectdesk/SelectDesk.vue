<template>
  <div class="selectDesk">
    <x-header :title="title"
              :options="headerOption"
              @leftevent="returnAddDesk"
              @rightevent="handleComplate" />
    <div class="selectDesk-main">
      <div class="desk-image-wrap">
        <img src="../../../../assets/images/desk-map.png"
             alt />
        <div class="selectDesk-seat-main">
          <div class="selectDesk-seat-item"
               v-for="(item, index) in deskBookSeatData"
               :key="index"
               @click="handleSelect(index)"
               :class="{ isActive: item.isActive, isAble: !item.isAble }">
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less">
.selectDesk {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .selectDesk-main {
    width: 100%;
    height: calc(100% - 224rpx);
    background-color: #f2f2f2;
    .desk-image-wrap {
      position: relative;
      img {
        object-fit: cover;
        width: 750rpx;
        height: 1215rpx;
      }
      .selectDesk-seat-main {
        position: absolute;
        right: 65rpx;
        top: 1000rpx;
        height: 0;
        display: flex;
        .selectDesk-seat-item {
          height: 148rpx;
          line-height: 40rpx;
          width: 97rpx;
          background: url(https://nanyan.agree.cn:10080/images/empty-desk.png)
            no-repeat;
          background-size: contain;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          div {
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: 30rpx;
            font-weight: normal;
            color: #333333;
          }
          &.isActive {
            background-image: url(https://nanyan.agree.cn:10080/images/select-desk.png);
            background-size: contain;
          }
          &.isAble {
            background-image: url(https://nanyan.agree.cn:10080/images/unable-desk.png);
            background-size: contain;
          }
        }
      }
    }
  }
}
</style>
