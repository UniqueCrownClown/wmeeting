import { Vue, Component } from 'vue-property-decorator';
const debug = require('debug')('log:App');
import { inArray, cinArray } from '@/utils/consts';
import { getPosition } from '@/api';
import { namespace } from 'vuex-class';
import { list } from 'postcss';
const workModule = namespace('workarea');

declare module 'vue/types/vue' {
  interface Vue {
    $mp: any;
  }
}

// 必须使用装饰器的方式来指定components
@Component({
  mpType: 'app', // mpvue特定
} as any)
class App extends Vue {
  @workModule.Mutation('setPosition') setPosition!: any;
  devices: Array<any> = [];
  devicesCollection: Array<Array<any>> = [];
  _discoveryStarted: boolean = false;
  // app hook
  onLaunch() {
    // let opt = this.$root.$mp.appOptions;
    // debug('onLaunch', opt);
  }

  onShow() {
    debug('onShow');
  }

  onHide() {
    debug('onHide');
  }

  mounted() {
    // vue hook
    // debug('mounted');
    this.openBluetoothAdapter();
    this.timedTask();
  }

  private stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
      success: (res) => {
        console.log(res);
      },
    });
  }

  private openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res);
        debug('openBluetoothAdapter success' + res);
        this.startBluetoothDevicesDiscovery();
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.showModal({
            title: '提示',
            content: '请先开启一下蓝牙和定位~~~',
            showCancel: false,
          });
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

  private startBluetoothDevicesDiscovery() {
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

  private onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      //这里的res.devices的长度为1
      res.devices.forEach((device) => {
        if (!device.name && !(device as any).localName) {
          return;
        }
        const foundDevices = this.devices;
        const cfoundDevices = this.devicesCollection;
        const idx = inArray(foundDevices, 'deviceId', device.deviceId);
        const cidx = cinArray(cfoundDevices, 'deviceId', device.deviceId);
        //只收集ble为183的蓝牙
        if (new RegExp(/^183\d{4}$/).test(device.name)) {
          if (idx === -1) {
            // this.devices[`${foundDevices.length}`] = device;
            Vue.set(this.devices, `${foundDevices.length}`, device);
            this.devicesCollection[cfoundDevices.length] = [device];
          } else {
            // this.devices[`${idx}`] = device;
            Vue.set(this.devices, `${idx}`, device);
            this.devicesCollection[cidx].push(device);
          }
        }
      });
    });
  }

  private closeBluetoothAdapter() {
    wx.closeBluetoothAdapter({
      success: () => {
        this._discoveryStarted = false;
      },
    });
  }

  // 开启定时服务
  timedTask(timeout = 5000) {
    // 每隔10秒钟请求一次位置
    setTimeout(() => {
      // 判断10秒内，是否满足3个蓝牙设备
      if (this.devices.length < 3) {
        this.timedTask(5000);
        return;
      }
      // 计算10秒钟内，rssi最强的前三蓝牙设备
      // const deviceList = this.computedStrongestSignalDeviceList();
      const cdeviceList = this.ccomputedStrongestSignalDeviceList();
      this.getXY(cdeviceList)
        .then((response) => {
          const { data } = response;
          // 实现定位
          this.positioning(data);
          // 清除devices中的所有值
          this.devices = [];
          return this.$nextTick();
        })
        .then(() => {
          // 重新计时
          this.timedTask();
        })
        .catch((reason) => {
          console.log(reason);
        });
    }, timeout);
  }
  private computedStrongestSignalDeviceList() {
    let aaa: Array<any> = [];
    this.devices.sort((a, b) => {
      return b.RSSI - a.RSSI;
    });
    this.devices.forEach((element) => {
      aaa.push({
        name: element.name,
        mac: element.deviceId,
        rssi: element.RSSI.toString(),
      });
    });
    return aaa.splice(0, 3);
  }

  private ccomputedStrongestSignalDeviceList() {
    let haha: Array<any> = [];

    this.devicesCollection.forEach((lists:Array<any>) => {
      let totalRssi = 0;

      lists.forEach(element => {
        totalRssi += element.RSSI;
      });

      const averageRssi = (totalRssi/lists.length).toFixed(6);
      haha.push({
        name: lists[0].name,
        mac: lists[0].deviceId,
        rssi: averageRssi,
      })
    });
    haha.sort((a, b) => {
      return b.RSSI - a.RSSI;
    });

    return haha.splice(0, 3);
  }

  // 上传前三最强信号蓝牙设备
  private getXY(deviceList) {
    // console.log(deviceList);
    return getPosition(deviceList);
  }

  // 实现定位
  private positioning(coordinate) {
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

export default App;
