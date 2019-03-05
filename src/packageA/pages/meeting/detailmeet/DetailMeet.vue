<template>
  <div class="detail-meet">
    <x-header :title="title" :options="headerOption" @leftevent="returnMeeting" />
    <div class="detail-meet-main">
      <div class="detail-meet-content">
        <div class="detail-meet-up">
          <canvas width="150" height="150" canvas-id="detailMeet"></canvas>
        </div>
        <div class="detail-meet-down">
          <div class="detail-meet-down-inner">
            <h3 class="detail-meet-title">{{ detail.subject }}</h3>
            <div class="detail-meet-down-left">
              <div class="detail-meet-time">
                <i class="icon iconfont icon-clock"></i>
                <span>{{ detail.startTime }}-{{ detail.endTime }}</span>
              </div>
              <div class="detail-meet-location">
                <i class="icon iconfont icon-location"></i>
                <span>{{ roomMenu[detail.room - 1] }}</span>
                <span
                  class="detail-meet-location-direct"
                  @click="toRoomMap(detail.room)"
                >
                  导航
                  <i class="iconfont icon-navigation"></i>
                </span>
              </div>
              <div class="detail-meet-personList">
                <i class="icon iconfont icon-man"></i>
                <span>{{ detail.participants }}</span>
              </div>
            </div>
            <clock :time="detail.startTime" :size="clockSize"></clock>
          </div>
        </div>
      </div>
      <div class="detail-meet-light">
        <div class="detail-meet-light-title">会议室顶灯</div>
        <div class="switch-light-block">
          <input
            class="switch-component"
            type="checkbox"
            v-model="lightState"
            @change="handleLight"
            :disabled="isUseful"
          />
        </div>
      </div>
      <div class="detail-meet-tv">
        <div class="detail-meet-tv-title">会议室TV</div>
        <div class="switch-tv-block">
          <i
            class="icon iconfont icon-hdmi"
            @click="handleDevice('channel', isUseful)"
            :class="{ active: !isUseful }"
          ></i>
          <i
            class="icon iconfont icon-power"
            @click="handleDevice('ton', isUseful)"
            :class="{ active: !isUseful }"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">

</script>
<style lang="less" scoped>
.detail-meet {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(-10deg, #05327b 0%, #105ab6 100%),
    linear-gradient(#e9e9e9, #e9e9e9);
  background-blend-mode: normal, normal;
  .detail-meet-main {
    width: 100%;
    height: calc(100% - 64rpx);
    .detail-meet-content {
      width: 686rpx;
      height: 824rpx;
      margin: 40rpx auto;
      background: #ffffff;
      border-radius: 10rpx;
      .detail-meet-up {
        height: 404rpx;
        border: 1rpx dotted #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        canvas{
          margin-left:75px;
        }
      }
      .detail-meet-down {
        height: 420rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .detail-meet-down-inner {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          width: 558rpx;
          height: 307rpx;
          .detail-meet-title {
            width: 100%;
            padding: 20rpx 0;
            font-family: PingFangSC-Medium;
            font-size: 38rpx;
            font-weight: 700;
            letter-spacing: 0rpx;
            color: #333333;
            border-bottom: 1rpx solid #cccccc;
            margin-bottom: 20rpx;
          }
          .detail-meet-down-left {
            flex-grow: 1;
            width: 80%;
            i{
              display: inline;
            }
            & > div {
              text-align: left;
              font-family: PingFangSC-Medium;
              font-size: 32rpx;
              font-weight: normal;
              font-stretch: normal;
              line-height: 39rpx;
              letter-spacing: 0rpx;
              color: #333333;
              padding: 10rpx 0;
              // white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              span {
                margin-left: 10rpx;
              }
              .icon {
                font-size: 32rpx;
                color: #cecece;
              }
              .detail-meet-location-direct {
                width: 62rpx;
                height: 30rpx;
                font-size: 32rpx;
                font-weight: normal;
                font-stretch: normal;
                line-height: 39rpx;
                letter-spacing: 0rpx;
                color: #366bfd;
                .icon-navigation {
                  font-size: 28rpx;
                }
              }
            }
            & > div.detail-meet-personList {
              height: 68rpx;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }

    .detail-meet-light,
    .detail-meet-tv {
      background-color: #ffffff;
      width: 686rpx;
      height: 104rpx;
      margin: 10rpx auto;
      border-radius: 10rpx;
      display: flex;
      .detail-meet-light-title,
      .detail-meet-tv-title {
        height: 37rpx;
        font-size: 38rpx;
        line-height: 38rpx;
        letter-spacing: 0rpx;
        margin-left: 20rpx;
        color: #333333;
      }
      justify-content: space-between;
      align-items: center;
      .switch-light-block,
      .switch-tv-block {
        width: 220rpx;
        height: 56rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .switch-component {
          margin: 0 20rpx;
        }
        .icon-power,
        .icon-hdmi {
          font-size: 46rpx;
          color: #cccccc;
          margin: 0 20rpx;
        }
        .icon-power.active,
        .icon-hdmi.active {
          color: #05327b;
        }
      }
    }
  }
}
/*switch start*/
.switch-component {
  position: relative;
  width: 120rpx;
  height: 56rpx;
  background-color: #dadada;
  border-radius: 56rpx;
  border: none;
  outline: none;
  -webkit-appearance: none;
  transition: all 0.2s ease;
}

// 按钮
.switch-component::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.2s ease;
}

// checked状态时，背景颜色改变
.switch-component:checked {
  background-color: #05327b;
}

// checked状态时，按钮位置改变
.switch-component:checked::after {
  left: 50%;
}
/*switch end*/
</style>
