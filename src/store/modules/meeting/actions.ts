import { login } from '@/api/';
import { Commit } from 'vuex';

export default {
  async asyncsetUser(context: { commit: Commit }, params: LoginParams) {
    wx.showLoading({ title: '登录中~~', mask: true });
    const responseValue: ResponseLoginValue = await login(params);
    wx.hideLoading();
    const { status, data } = responseValue;
    if (status !== 200) {
      wx.showToast({ title: '服务器异常' });
    } else {
      if (data.status === 'success') {
        context.commit('setuser', data.data);
      } else {
        wx.showToast({ title: data.msg });
      }
    }
    return responseValue;
  },
};
