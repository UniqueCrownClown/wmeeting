<template>
  <div class="deskList">
    <div
      class="deskBook-card"
      v-for="item in getDeskBookList"
      :key="item.id"
      @touchstart="showDeleteConfirm(item.id)"
      @touchend="clearLoop"
    >
      <div
        class="deskBook-body"
        :class="{ occupy: Number(item.occupy) === 1 ? true : false }"
      >
        <div class="deskBook-body-left">
          <div class="deskBook-body-desk">
            {{ deskNumber[Number(item.station) - 1] }}
          </div>
          <div class="deskBook-body-time">
            <i class="iconfont icon-clock"></i>
            {{ item.startTime }}-{{ item.endTime }}
          </div>
          <div class="deskBook-body-state">
            <i class="iconfont icon-location"></i>
            {{ deskState[Number(item.occupy)] }}
          </div>
        </div>
        <i class="iconfont icon-chair"></i>
      </div>
      <div class="deskBook-footer">
        <div
          class="deskBook-footernavigation"
          @click.stop="toRoomMap(item.station)"
        >
          导航
          <i class="iconfont icon-navigation"></i>
        </div>
        <div
          class="deskBook-footerchageState"
          @click.stop="handleClick(item.id, item.occupy)"
        >
          {{ deskStateText[Number(item.occupy)] }}
        </div>
      </div>
    </div>
    <div class="deskBook-card-add" @click="deskBookAdd">
      <div class="deskBook-card-add-cont">
        <!-- <x-icon type="ios-plus-empty" size="100" class="deskBook-plus"></x-icon> -->
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
  .deskBook-card {
    width: 686px;
    height: 306px;
    border-radius: 12px;
    margin: 0 auto;
    padding: 20px 0;
    .deskBook-body {
      &.occupy {
        background-image: linear-gradient(-45deg, #fe7d46 1%, #fe994e 100%),
          linear-gradient(#ffffff, #ffffff);
        background-blend-mode: normal, normal;
        .icon-chair {
          color: #fc6822;
        }
      }
      width: 686px;
      height: 226px;
      background-image: linear-gradient(-45deg, #5060fe 1%, #409cfc 100%),
        linear-gradient(#ffffff, #ffffff);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .deskBook-body-left {
        text-align: left;
        .iconfont {
          font-size: 30px;
          margin-right: 10px;
        }
        .deskBook-body-desk {
          font-family: PingFangSC-Medium;
          font-size: 36px;
          font-weight: normal;
          color: #ffffff;
        }
        .deskBook-body-time {
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          color: #ffffff;
        }
        .deskBook-body-state {
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          color: #ffffff;
        }
      }
      .icon-chair {
        font-size: 184px;
        color: #2942f1;
      }
    }
    .deskBook-footer {
      width: 686px;
      height: 80px;
      background-color: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      font-weight: normal;
      color: #366bfd;
      .deskBook-footernavigation {
        .icon-navigation {
          margin-left: 6px;
          font-size: 28px;
        }
      }
    }
  }
  .deskBook-card-add {
    width: 686px;
    height: 306px;
    margin: 32px 32px 60px 32px;
    background-color: #ffffff;
    border-radius: 12px;
    border: solid 2px #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .deskBook-card-add-cont {
      .deskBook-plus {
        fill: #cccccc;
      }
      .deskBook-card-text {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39px;
        letter-spacing: 0px;
        color: #a6a6a6;
      }
    }
  }
}
</style>
