<template>
  <div class="selectBookTime">
    <div class="selectBookTime-calendar">
      <!-- 年份 月份 -->
      <div class="month">
        <ul>
          <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
          <li class="arrow"
              @click.stop="pickPre(currentYear,currentMonth)">❮</li>
          <li class="year-month"
              @click.stop="pickYear(currentYear,currentMonth)">
            <span class="choose-year-month">{{ currentYear }}年{{ currentMonth }}月</span>
          </li>
          <li class="arrow"
              @click.stop="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li style="color: #fa6017;">日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color: #fa6017;">六</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li v-for="(dayobject, index) in days"
            :key="index"
            @click.stop="handleSelect(dayobject)"
            :class="{ isSelect: dayobject.isSelect }">
          <!--本月-->
          <!--如果不是本月  改变类名加灰色-->
          <span v-if="dayobject.month+ 1 != currentMonth"
                class="other-month">{{ dayobject.date }}</span>
          <!--如果是本月  还需要判断是不是这一天-->
          <span v-else>
            <!--今天  同年同月同日-->
            <span v-if="dayobject.year === today.year && dayobject.month === today.month && dayobject.date === today.date"
                  class="active">今</span>
            <span v-else>{{ dayobject.date }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.selectBookTime-calendar {
  width: 98%;
  margin: 0 auto;
  box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.14), 0 3rpx 1rpx -2rpx rgba(0, 0, 0, 0.1),
    0 1rpx 5rpx 0 rgba(0, 0, 0, 0.12);
  .month {
    width: 100%;
    background: #1978fe;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    list-style-type: none;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .arrow {
    padding: 30rpx;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 26rpx;
    text-transform: uppercase;
    letter-spacing: 3rpx;
  }

  .weekdays {
    margin: 0;
    padding: 10rpx 0;
    font-size: 26rpx;
    background-color: #1978fe;
    display: flex;
    flex-wrap: wrap;
    color: #ffffff;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 14.2%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #ffffff;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .days li {
    list-style-type: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 14.2%;
    height: 70rpx;
    text-align: center;
    padding-bottom: 15rpx;
    padding-top: 15rpx;
    span {
      font-size: 26rpx;
      color: #000;
    }
    &.isSelect {
      background-color: #1978fe;
      span {
        color: #ffffff;
      }
    }
  }

  .days li .other-month {
    padding: 5rpx;
    color: gainsboro;
  }
}
</style>
