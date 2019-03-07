<template>
  <div class="check-list">
    <checkbox-group @change="checkboxChange">
      <div v-for="(items, oindex) in personList"
           :key="oindex">
        <div class="check-list-letter">{{ items.letter }}</div>
        <label class="checkbox"
               v-for="(item, index) in items.data"
               :key="index">
          <checkbox :value="item.name"
                    :checked="item.isCheck" />
          {{item.name}}
        </label>
      </div>
    </checkbox-group>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>

<style lang="less">
.check-list {
  .check-list-letter {
    height: 52rpx;
    background-color: #f0f0f0;
    font-family: PingFangSC-Regular;
    font-size: 36rpx;
    font-weight: 700;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    text-align: left;
    text-indent: 36rpx;
  }
  label {
    display: block;
    border-bottom: 1rpx solid #ccc;
    padding: 20rpx;
    font-size: 36rpx;
    background-color: #ffffff;
  }
}
</style>
