<template>
  <div class="addDesk">
    <x-header :title="title" :options="headerOption" @leftevent="backToDesk" @rightevent="handleComplate" />
    <div>
      <cell-item
        :cellData="cellTime"
        :value="timeValue"
        @insertContent="insertContent"
        @click="handleSelectTime"
      />
      <cell-item
        :cellData="cellDesk"
        :value="deskValue"
        @insertContent="insertContent"
        @click="handleSelectDesk"
      />
    </div>
    <div class="adddesk-show-calendar" v-if="showCalendar" @click="cancelTime">
      <div class="adddesk-show-bottom">
        <div class="adddesk-show-title">
          <div class="adddesk-show-certain" @click.stop="cancelTime">取消</div>
          <div>选择预约使用工位日期</div>
          <div class="adddesk-show-cancel" @click.stop="certainTime">确定</div>
        </div>
        <calendar :deskBookDate="deskBookCalendar" @setdeskBookDate="setdeskBookCalendar"></calendar>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less">
.addDesk {
  .adddesk-show-calendar {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    align-items: flex-end;
    background-color: rgba(0, 0, 0, 0.3);
    .adddesk-show-bottom {
      .adddesk-show-title {
        width: 750px;
        height: 100px;
        line-height: 100px;
        background-color: #ffffff;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        font-weight: normal;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .adddesk-show-cancel,
        .adddesk-show-certain {
          float: right;
          color: #fa6017;
          font-size: 28px;
          margin-right: 1%;
        }
      }
      width: 100%;
      background-color: #ffffff;
    }
  }
}
</style>
