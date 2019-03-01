export default {
  deskBookRecord: [
    {
      id: 1,
      station: '1',
      deskNumber: '5号工位',
      startTime: '2018/12/03',
      endTime: '2018/12/06',
      occupy: '0',
      state: '0'
    },
    {
      id: 2,
      station: '2',
      deskNumber: '4号工位',
      startTime: '2018/12/08',
      endTime: '2018/12/15',
      occupy: '1',
      state: '0'
    }
  ],
  deskBookDateCertain: false, // 是否确认提交
  deskSeatCertain: false, // 是否确认选择位置
  deskBookDate: [], // 预约时间数组
  deskBookSeatData: [
    {
      name: '1号',
      isActive: false,
      isAble: true
    },
    {
      name: '2号',
      isActive: false,
      isAble: true
    },
    {
      name: '3号',
      isActive: false,
      isAble: true
    },
    {
      name: '4号',
      isActive: false,
      isAble: true
    }
  ], // 当前所有工位状态
  position: {
    topValue: '59.5vw',
    leftValue: '100vw'
  }
}
