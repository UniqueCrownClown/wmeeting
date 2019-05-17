<template>
  <div class="deskList">
    <div class="deskBook-card"
         v-for="item in getDeskBookList"
         :key="item.qrToken"
         @touchstart="showDeleteConfirm(item.qrToken)"
         @touchend="clearLoop">
      <div class="deskBook-body"
           :class="{ occupy: item.status === 1 ? true : false }">
        <div class="deskBook-body-left">
          <div class="deskBook-body-desk">
            {{item.stationNum }}号工位
          </div>
          <div class="deskBook-body-time">
            <i class="iconfont icon-clock"></i>
            {{ item.startDate }}-{{ item.endDate }}
          </div>
          <div class="deskBook-body-state">
            <i class="iconfont icon-location"></i>
            {{ deskState[item.status] }}
          </div>
        </div>
        <i class="iconfont icon-chair"></i>
      </div>
      <div class="deskBook-footer">
        <div class="deskBook-footernavigation"
             @click.stop="toRoomMap(item.stationNum)">
          导航
          <i class="iconfont icon-navigation"></i>
        </div>
        <div class="deskBook-footerchageState"
             @click.stop="handleClick(item.qrToken, item.status)">
          {{ deskStateText[item.status] }}
        </div>
      </div>
    </div>
    <div class="deskBook-card-add"
         @click="deskBookAdd">
      <div class="deskBook-card-add-cont">
        <i class="iconfont icon-hao deskBook-plus"></i>
        <div class="deskBook-card-text">新增工位预约</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
.deskList {
  height: 100%;
  overflow: auto;
  i {
    display: inline-block;
  }
  .deskBook-card {
    width: 686rpx;
    height: 306rpx;
    border-radius: 12rpx;
    margin: 0 auto;
    padding: 20rpx 0;
    .deskBook-body {
      &.occupy {
        background-image: linear-gradient(-45deg, #fe7d46 1%, #fe994e 100%),
          linear-gradient(#ffffff, #ffffff);
        background-blend-mode: normal, normal;
        .icon-chair {
          color: #fc6822;
        }
      }
      width: 686rpx;
      height: 226rpx;
      background-image: linear-gradient(-45deg, #5060fe 1%, #409cfc 100%),
        linear-gradient(#ffffff, #ffffff);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .deskBook-body-left {
        text-align: left;
        .iconfont {
          font-size: 30rpx;
          margin-right: 10rpx;
        }
        .deskBook-body-desk {
          font-family: PingFangSC-Medium;
          font-size: 36rpx;
          font-weight: normal;
          color: #ffffff;
        }
        .deskBook-body-time {
          font-family: PingFangSC-Regular;
          font-size: 30rpx;
          font-weight: normal;
          color: #ffffff;
        }
        .deskBook-body-state {
          font-family: PingFangSC-Regular;
          font-size: 30rpx;
          font-weight: normal;
          color: #ffffff;
        }
      }
      .icon-chair {
        font-size: 184rpx;
        color: #2942f1;
      }
    }
    .deskBook-footer {
      width: 686rpx;
      height: 80rpx;
      background-color: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 32rpx;
      font-weight: normal;
      color: #366bfd;
      .deskBook-footernavigation {
        .icon-navigation {
          margin-left: 6rpx;
          font-size: 28rpx;
        }
      }
    }
  }
  .deskBook-card-add {
    width: 686rpx;
    height: 306rpx;
    margin: 32rpx 32rpx 60rpx 32rpx;
    background-color: #ffffff;
    border-radius: 12rpx;
    border: solid 2rpx #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .deskBook-card-add-cont {
      text-align: center;
      .deskBook-plus {
        color: #cccccc;
        font-size: 160rpx;
      }
      .deskBook-card-text {
        font-family: PingFangSC-Medium;
        font-size: 36rpx;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39rpx;
        letter-spacing: 0rpx;
        color: #a6a6a6;
      }
    }
  }
}
</style>
