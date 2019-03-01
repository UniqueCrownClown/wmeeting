<template>
  <div class="meeting">
    <!-- <Header title :leftOptions="{ backText: '' }">
      <a slot="left" @click="returnMain">首页</a>
      <div slot="middle" class="tabSwitch" @click="switchstate">
        <span :class="{ active: this.tabIndex === 0 }">已完成</span>
        <span :class="{ active: this.tabIndex === 1 }">未完成</span>
      </div>
      <a slot="right" @click.prevent="addMeet">新增</a>
    </Header> -->
    <x-header
    :title="title"
    :headerTab="headerTab"
    :options="headerOption"
    @leftevent="returnMain"
    @rightevent="addMeet"
    @handleTab="handleTab"/>
    <div class="meeting-main">
      <div v-for="(item, index) in meetingData" :key="index" class="item-block">
        <h3 class="item-block-time">{{ item.day }}</h3>
        <ul>
          <li v-for="(mItem, mIndex) in item.data" :key="mIndex">
            <div
              class="meeting-blo"
              slot="content"
              @click="toMeetDetail(index, mIndex)"
            >
              <div class="meeting-blo-left">
                <clock
                  :time="mItem.startTime"
                  :size="clockSize"
                  :state="mItem.state"
                ></clock>
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
    height: calc(100% - 56px);
  }
  .item-block {
    .item-block-time {
      width: 720px;
      height: 80px;
      padding-left: 30px;
      line-height: 80px;
      text-align: left;
      background-color: #ffffff;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      font-weight: normal;
      color: #888888;
      border-bottom: 1px solid #ccc;
    }
    .meeting-blo {
      width: 750px;
      height: 136px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
      background-color: #ffffff;
      .meeting-blo-left {
        padding: 20px 30px;
      }
      .meeting-blo-right {
        flex-grow: 1;
        .meeting-blo-title {
          text-align: left;
          height: 35px;
          line-height: 35px;
          font-family: PingFangSC-Medium;
          font-size: 36px;
          font-weight: normal;
          color: #333333;
          padding: 5px 0 25px 0;
        }
        .meeting-blo-tandl {
          text-align: left;
          .icon {
            font-size: 30px;
            color: #cecece;
          }
        }
        .meeting-blo-time {
          width: 159px;
          height: 29px;
          line-height: 29px;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          font-weight: normal;
          color: #888888;
          text-align: left;
        }
        .meeting-blo-location {
          width: 107px;
          height: 29px;
          line-height: 29px;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          color: #888888;
          padding-left: 60px;
        }
      }
    }
  }
}
</style>
