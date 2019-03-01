import { Vue, Component } from 'vue-property-decorator';
import { inArray } from '@/utils/consts';
const debug = require('debug')('log:Index');

// 必须使用装饰器的方式来指定component
@Component
export default class BLE extends Vue {
  devices: Array<any> = [];
  _discoveryStarted: boolean = false;

  onShow() {
    // 小程序 hook
    debug('onShow');
  }

  mounted() {
    // vue hook
    debug('mounted');
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
        const foundDevices = this.devices;
        const idx = inArray(foundDevices, 'deviceId', device.deviceId);
        console.log(idx);
        //只收集ble为183的蓝牙
        if (new RegExp(/^183\d{4}$/).test(device.name)) {
          if (idx === -1) {
            // this.devices[`${foundDevices.length}`] = device;
            Vue.set(this.devices, `${foundDevices.length}`, device);
            console.log(device);
          } else {
            // this.devices[`${idx}`] = device;
            Vue.set(this.devices, `${idx}`, device);
          }
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

  get computedevices() {
    return this.devices;
  }
}
