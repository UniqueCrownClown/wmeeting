<template>
  <div class="select-time">
    <x-header :title="roomName"
    :options="headerOption"
    @leftevent="returnAddMeet"
    @rightevent="certainBookTime"
    @titleevent="handleSelectRoom" />
    <div class="select-time-content">
      <div class="select-time-calendar">
        <div class="week-title">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
        <div class="week-detail">
          <div
            v-for="(item, index) in weekDetail"
            :key="item.day"
            @click="handleSelectDay(index)"
            :class="{ active: item.isActive }"
          >
            <span>{{ item.day }}</span>
            <span>{{ item.lunar }}</span>
          </div>
        </div>
      </div>
      <div class="select-time-divider"></div>
      <div class="select-time-date">{{ getCurrentDay }}</div>
      <div class="select-time-tip">
        <div class="select-time-color"></div>
        <div>半小时/格</div>
      </div>
      <div class="select-time-currentSpace">
        {{ bookTime.startTime }} - {{ bookTime.endTime }}
      </div>
      <div class="select-time-block">
        <div
          v-for="(items, oindex) in timeSlot"
          :key="oindex"
          class="select-time-outter"
        >
          <span
            v-for="(item, index) in items"
            :key="index"
            class="select-time-inner"
            :class="{
              unable: !item.isAble,
              select: item.isSelect
            }"
            @click="handleSelectTime(item.text)"
            >{{ item.text }}</span
          >
        </div>
      </div>
    </div>
    <action-sheet
      :options="roomMenu"
      @handleOptions="handleOptions"
      :isShow="isShow"
      @handleShow="handleShow"
    />
  </div>
</template>
<script lang="ts" src="./index.ts">

</script>
<style lang="less" scoped>
.select-time {
  .overwrite-title-demo {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    .arrow-down {
      fill: #ccc;
      padding: 0 4rpx;
    }
  }
  .select-time-content {
    .select-time-calendar {
      .week-title {
        display: flex;
        span {
          flex-grow: 1;
          font-size: 26rpx;
          text-align: center;
        }
      }
      .week-detail {
        display: flex;
        padding: 8rpx 0;
        & > div {
          width: 106rpx;
          height: 106rpx;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          text-align: center;
          span {
            display: inline-block;
            width: 100%;
          }
          span:first-child {
            font-size: 30rpx;
          }
          span:last-child {
            font-size: 20rpx;
          }
        }
        & > div.active {
          background-color: #366bfd;
          border-radius: 50%;
          color: #fff;
        }
      }
    }
    .select-time-divider {
      width: 100%;
      height: 10rpx;
      background-color: #e9e9e9;
    }
    .select-time-date {
      margin-top: 30rpx;
      font-family: PingFangSC-Regular;
      font-size: 30rpx;
      color: #333333;
      width: 750rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
    }
    .select-time-tip {
      width: 84%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #333333;
      margin-top: 30rpx;
      font-size: 20rpx;
      .select-time-color {
        width: 30rpx;
        height: 30rpx;
        margin: 0 20rpx;
        background-color: #1978fe;
      }
    }
    .select-time-currentSpace {
      margin-top: 50rpx;
      font-size: 30rpx;
      color: #333333;
      text-align: center;
    }
    .select-time-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 10rpx;
      .select-time-outter {
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 40rpx;
        width: 84%;
        background-color: #f1f1f1;
        display: flex;
        margin: 0 0 30rpx 0;
        span:nth-child(4n + 1) {
          border-radius: 40rpx 0 0 40rpx;
        }
        span:nth-child(4n + 0) {
          border-radius: 0 40rpx 40rpx 0;
        }
        .select-time-inner {
          font-family: PingFangSC-Medium;
          font-size: 26rpx;
          font-weight: normal;
          font-stretch: normal;
          flex-grow: 1;
          letter-spacing: 0rpx;
          color: #888888;
          text-align: center;
        }
        .select-time-inner.able {
          background-color: #f1f1f1;
        }
        .select-time-inner.unable {
          background-color: #bbbbbb;
        }
        .select-time-inner.halfable {
          background-color: rgba(54, 107, 253, 0.2);
        }
        .select-time-inner.select {
          background-color: #1978fe;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
