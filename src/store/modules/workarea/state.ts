const initalState: WorkAreaState = {
  deskBookRecord: [],
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

export default initalState
