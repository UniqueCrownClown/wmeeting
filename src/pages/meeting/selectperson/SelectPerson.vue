<template>
  <div class="select-person">
    <div class="select-person-main">
      <x-header :title="title" :options="headerOption" @leftevent="returnAddMeet" @rightevent="certainBookPersonList" />
      <div class="select-person-fixpart">
        <div class="select-person-search">
          <input
            type="text"
            placeholder="搜索"
            v-model="searchText"
            @change="handleSearch"
          />
        </div>
        <div class="select-person-list">
          <div class="select-person-list-inner">
            <div
              class="select-persion-item"
              v-for="item in pagebookPersonList"
              :key="item"
            >
              <span>{{ item }}</span>
              <i-icon type="close" @click="removePerson(item)"/>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!showSearch" class="select-person-directory">
        <check-list :linkData="personData" @change="handleSelect" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
<style lang="less">
.select-person {
  width: 100vw;
  height: 100vh;
  background: #f0f0f0;
  overflow: hidden;
  .select-person-main {
    height: calc(100% - 64rpx);
  }
  .select-person-fixpart {
    height: 194rpx;
    .select-person-search {
      width: 710rpx;
      height: 64rpx;
      margin: 18rpx 20rpx;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        text-indent: 60rpx;
        background-color: #ffffff;
        border: none;
        border-radius: 8rpx;
        outline: none;
        font-family: PingFangSC-Regular;
        font-size: 30rpx;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 3rpx;
        color: #a6a6a6;
      }
    }
    .select-person-list {
      width: 750rpx;
      .select-person-list-inner {
        background-color: #ffffff;
        height: 90rpx;
        line-height: 90rpx;
        white-space: nowrap;
        overflow-x: auto;
        text-align: left;
        .select-persion-item {
          display: inline-flex;
          align-items: center;
          margin: 15rpx 10rpx 0 10rpx;
          background-color: #f0f0f0;
          border-radius: 38rpx;
          font-family: PingFangSC-Regular;
          font-size: 32rpx;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rpx;
          color: #333333;
          height: 60rpx;
          span {
            text-indent: 10rpx;
          }
          i {
            font-size: 32rpx;
          }
        }
      }
    }
  }
  .select-person-directory {
    overflow: auto;
    height: calc(100% - 214rpx);
  }
}
//小程序复选框样式
checkbox {
width: 32rpx;
height: 32rpx;
border-radius:50%;
}

checkbox .wx-checkbox-input {
width: 32rpx;
height: 32rpx;
border-radius:50%;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
background: #3296fa;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
width: 32rpx;
height: 32rpx;
line-height: 32rpx;
text-align: center;
font-size: 24rpx;
color: #fff;
background: transparent;
transform: translate(-50%, -50%) scale(1);
-webkit-transform: translate(-50%, -50%) scale(1);
}
</style>
