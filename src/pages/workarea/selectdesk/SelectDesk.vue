<template>
  <div class="selectDesk">
    <x-header :title="title" :options="headerOption" @leftevent="returnAddDesk" @rightevent="handleComplate" />
    <div class="selectDesk-main">
      <div class="desk-image-wrap">
        <img src="../../../assets/images/desk-map.png" alt />
        <div class="selectDesk-seat-main">
          <div
            class="selectDesk-seat-item"
            v-for="(item, index) in deskBookSeatData"
            :key="index"
            @click="handleSelect(index)"
            :class="{ isActive: item.isActive, isAble: !item.isAble }"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped>
.selectDesk {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .selectDesk-main {
    width: 100%;
    height: calc(100% - 46px);
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    .desk-image-wrap {
      position: relative;
      img {
        width: 750px;
        height: 1215px;
      }
      .selectDesk-seat-main {
        position: absolute;
        right: 65px;
        top: 1000px;
        height: 0;
        display: flex;
        .selectDesk-seat-item {
          height: 148px;
          line-height: 40px;
          width: 97px;
          background: url("../../../assets/images/empty-desk.png") no-repeat;
          background-size: contain;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          span {
            font-family: PingFangSC-Regular;
            font-size: 30px;
            font-weight: normal;
            color: #333333;
          }
          &.isActive {
            background: url("../../../assets/images/select-desk.png") no-repeat;
            background-size: contain;
          }
          &.isAble {
            background: url("../../../assets/images/unable-desk.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
}