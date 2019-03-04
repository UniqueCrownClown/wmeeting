import { Vue, Component } from 'vue-property-decorator';
import { inArray } from '@/utils/consts';
import { getPosition } from '@/api';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const debug = require('debug')('log:Index');
const workModule = namespace('workarea');

// 必须使用装饰器的方式来指定component
@Component
export default class BLE extends Vue {
  @workModule.State('position') position!: any;
  @workModule.Mutation('setPosition') setPosition!: (data: any) => void;
  private sid: any;
  private devices: Array<any> = [];
  private _discoveryStarted: boolean = false;
  private deviceMap: Map<string, Array<object>> = new Map();
  get positiondata() {
    console.log('apple');
    return this.position;
  }
  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
    this.openBluetoothAdapter();
    // this.timedTask();
  }

  private stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
      success: (res) => {
        console.log(res);
      },
    });
  }

  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res);
        debug('openBluetoothAdapter success' + res);
        this.startBluetoothDevicesDiscovery();
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange((res) => {
            console.log('onBluetoothAdapterStateChange', res);
            if (res.available) {
              this.startBluetoothDevicesDiscovery();
            }
          });
        }
      },
    });
  }

  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return;
    }
    this._discoveryStarted = true;
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res);
        this.onBluetoothDeviceFound();
      },
    });
  }

  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach((device) => {
        if (!device.name && !(device as any).localName) {
          return;
        }
        // const foundDevices = this.devices;
        // const idx = inArray(foundDevices, 'deviceId', device.deviceId);
        // console.log(idx);
        // 只收集ble为183的蓝牙
        // if (new RegExp(/^183\d{4}$/).test(device.name)) {
        //   if (idx === -1) {
        //     // this.devices[`${foundDevices.length}`] = device;
        //     Vue.set(this.devices, `${foundDevices.length}`, device);
        //     console.log(device);
        //   } else {
        //     // this.devices[`${idx}`] = device;
        //     Vue.set(this.devices, `${idx}`, device);
        //   }
        // }
        //限制deviceMap的长度为10个
        //deviceMap的数据结构是不是要改？
        const { name, deviceId, RSSI } = device;
        if (new RegExp(/^183\d{4}$/).test(name)) {
          let deviceList = this.deviceMap.get(name);
          if (!deviceList) {
            deviceList = []
            this.deviceMap.set(name, deviceList)
          }
          if (deviceList.length === 10) {
            //长度每到10就开始删，只保留最新的10个
            deviceList.shift();
          }
          (deviceList as any).push({
            name,
            mac: deviceId,
            RSSI,
          });
          this.deviceMap.delete(name)
          this.deviceMap.set(name, deviceList as any);
        }
      });
    });
  }

  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter({
      success: () => {
        this._discoveryStarted = false;
      },
    });
  }

  // get computedevices() {
  //   return this.devices;
  // }

  // 开启定时服务
  private timedTask(timeout = 5000) {
    // 每隔5秒钟请求一次位置
    clearTimeout(this.sid);
    this.sid = setTimeout(() => {
      // 判断5秒内，是否满足3个蓝牙设备
      if (!this.isSatisfiedThreeDevice()) {
        this.timedTask(5000);
        return;
      }
      // 计算10秒钟内，rssi最强的前三蓝牙设备
      const deviceList = this.computedStrongestSignalDeviceList();
      this.getXY(deviceList)
        .then((response) => {
          const { data } = response;
          // 实现定位
          this.positioning(data);
          // 清除deviceMap中的所有值
          this.deleteMapValue();
          return this.$nextTick();
        })
        .then(() => {
          // 重新计时
          this.timedTask();
        })
        .catch((reason) => {
          console.log('定时发送请求错误' + reason);
        });
    }, timeout);
  }
  // 计算rssi前三蓝牙设备列表
  computedStrongestSignalDeviceList() {
    const signalDeviceList: any = [];
    const iterator = this.deviceMap.entries();
    // console.log(JSON.stringify(this.deviceMap))
    // 求平均值
    for (
      let iteratorResult = iterator.next();
      !iteratorResult.done;
      iteratorResult = iterator.next()
    ) {
      const deviceName = iteratorResult.value[0];
      const deviceList = iteratorResult.value[1];
      // 求平均值
      let sumRssi = 0;
      deviceList.forEach((device: any) => {
        sumRssi += device.RSSI;
      });
      const averageDevice = {
        name: deviceName,
        mac: deviceList[0]['mac'],
        rssi: (sumRssi / deviceList.length).toFixed(6),
      };
      // averageDevice['name'] = deviceName
      // averageDevice['mac'] = deviceList[0]['mac']
      // averageDevice['rssi'] = (sumRssi / deviceList.length).toFixed(6)
      signalDeviceList.push(averageDevice);
    }
    // console.log('排序前')
    // console.log(JSON.stringify(signalDeviceList))
    // 排序
    signalDeviceList.sort((a, b) => {
      return Number(b.rssi) - Number(a.rssi);
    });
    // console.log('排序后')
    // console.log(JSON.stringify(signalDeviceList));
    return JSON.stringify(signalDeviceList.slice(0, 3));
  }
  // 上传前三最强信号蓝牙设备
  getXY(deviceList) {
    return getPosition(deviceList);
  }
  // 清除deviceMap数据
  deleteMapValue() {
    const iterator = this.deviceMap.keys();
    for (
      let iteratorResult = iterator.next();
      !iteratorResult.done;
      iteratorResult = iterator.next()
    ) {
      this.deviceMap.delete(iteratorResult.value);
    }
  }
  // 判断是够满足3个蓝牙外设
  isSatisfiedThreeDevice() {
    return this.deviceMap.size >= 3;
  }
  // 实现定位
  positioning(coordinate: any) {
    if (!coordinate) return;
    // 实现换算
    const { x, y } = coordinate;
    // const roomMapWidth = this.$refs['roomMapRef'].offsetWeight
    // 坐标1代表的多少vw
    const scale = 12.12;
    const leftOffset = x * scale;
    const topOffset = y * scale;

    const left = 100 - leftOffset;
    const top = 59.5 + topOffset;

    this.setPosition({
      leftValue: left + 'vw',
      topValue: top + 'vw',
    });
  }
}
