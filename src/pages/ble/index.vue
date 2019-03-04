<template>
  <div class="ble">
    <p>Mpvue</p>
    <button @click="openBluetoothAdapter">开始扫描</button>
    <button @click="stopBluetoothDevicesDiscovery">停止扫描</button>
    <button @click="closeBluetoothAdapter">结束流程</button>
    <!-- <ul>
      <li v-for="item in computedevices"
          :key="item.RSSI">
        <div>{{item.name||item.localName}}</div>
        <div>信号强度: {{item.RSSI}}dBm</div>
        <div>UUID: {{item.deviceId}}</div>
        <div>Service数量: {{item.advertisServiceUUIDs}}</div>
      </li>
    </ul> -->
    <div>
      <div>{{positiondata.top}}</div>
      <div>{{positiondata.left}}</div>
    </div>
  </div>
</template>
<!--必须指定为ts-->
<script lang="ts" src="./ble.ts">
</script>
<style lang="less">
</style>
