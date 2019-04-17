<template>
  <div class="meeting">
    <x-header :title="title"
              :headerTab="headerTab"
              :options="headerOption"
              @leftevent="returnMain"
              @rightevent="addMeet"
              @handleTab="handleTab" />
    <div class="meeting-main">
      <div v-for="(item, index) in meetingData"
           :key="index"
           class="item-block">
        <h3 class="item-block-time">{{ item.day }}</h3>
        <ul>
          <li v-for="(mItem, mIndex) in item.data"
              :key="mIndex">
            <i-swipeout :actions="actions"
                        @change="showDeleteConfirm(mItem.id)">
              <view slot="content">
                <div class="meeting-blo"
                     slot="content"
                     @click="toMeetDetail(index, mIndex)">
                  <div class="meeting-blo-left">
                    <clock :time="mItem.startTime"
                           :size="clockSize"
                           :state="mItem.state"></clock>
                  </div>
                  <div class="meeting-blo-right">
                    <h4 class="meeting-blo-title">{{ mItem.subject }}</h4>
                    <div class="meeting-blo-tandl">
                      <span class="meeting-blo-time">
                        <i class="icon iconfont icon-clock"></i>
                        {{ mItem.startTime }}-{{ mItem.endTime }}
                      </span>
                      <span class="meeting-blo-location">
                        <i class="icon iconfont icon-clock"></i>
                        {{ roomMenu[mItem.room - 1] }}
                      </span>
                    </div>
                  </div>
                </div>
              </view>
            </i-swipeout>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>
<style lang="less" scoped>
.meeting {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .meeting-main {
    overflow: auto;
    height: calc(100% - 84rpx);
  }
  .item-block {
    .item-block-time {
      width: 720rpx;
      height: 80rpx;
      padding-left: 30rpx;
      line-height: 80rpx;
      text-align: left;
      background-color: #ffffff;
      font-family: PingFangSC-Regular;
      font-size: 30rpx;
      font-weight: normal;
      color: #888888;
      border-bottom: 1rpx solid #ccc;
    }
    .meeting-blo {
      width: 750rpx;
      height: 106rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      // border-bottom: 1rpx solid #ccc;
      background-color: #ffffff;
      .meeting-blo-left {
        padding: 20rpx 30rpx;
      }
      .meeting-blo-right {
        flex-grow: 1;
        .meeting-blo-title {
          text-align: left;
          height: 35rpx;
          line-height: 35rpx;
          font-family: PingFangSC-Medium;
          font-size: 36rpx;
          font-weight: normal;
          color: #333333;
          padding: 5rpx 0 25rpx 0;
        }
        .meeting-blo-tandl {
          text-align: left;
          .icon {
            font-size: 30rpx;
            color: #cecece;
          }
        }
        .meeting-blo-time {
          width: 159rpx;
          height: 29rpx;
          line-height: 29rpx;
          font-family: PingFangSC-Regular;
          font-size: 30rpx;
          font-weight: normal;
          font-weight: normal;
          color: #888888;
          text-align: left;
          i {
            display: inline;
          }
        }
        .meeting-blo-location {
          width: 107rpx;
          height: 29rpx;
          line-height: 29rpx;
          font-family: PingFangSC-Regular;
          font-size: 30rpx;
          font-weight: normal;
          color: #888888;
          padding-left: 60rpx;
          i {
            display: inline;
          }
        }
      }
    }
    //  修改一下iview的样式
    .i-swipeout-item {
      padding: 5rpx 10rpx;
    }
  }
}
</style>
