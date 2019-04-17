<template>
  <div class="add-meet">
    <x-header :title="title"
              :options="headerOption"
              @leftevent="returnMeet"
              @rightevent="handleComplate" />
    <div class="cell-content">
      <span class="cell-title">会议主题</span>
      <input type="text"
             placeholder="请输入会议主题"
             :value="subject"
             @input="handlebind" />
    </div>
    <cell-item :cellData="cellRoom"
               :value="roomValue"
               @insertContent="insertContent" />
    <cell-item :cellData="cellTime"
               :value="timeValue"
               @insertContent="insertContent" />
    <cell-item :cellData="cellPerson"
               :value="personValue"
               @insertContent="insertContent" />
    <action-sheet :options="roomMenu"
                  @handleOptions="handleOptions"
                  :isShow="isShow"
                  @handleShow="handleShow" />
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>
<style lang="less" scoped>
.cell-content {
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 439rpx;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 32rpx;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rpx;
    color: #333333;
    outline: none;
  }
}
</style>
