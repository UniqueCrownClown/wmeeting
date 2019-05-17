import { login } from '@/api/';
import { Commit } from 'vuex';

export default {
  async asyncsetUser(context: { commit: Commit }, params: LoginParams) {
    try {
      wx.showLoading({ title: '登录中~~', mask: true });
      const responseValue: ResponseLoginValue = await login(params);
      wx.hideLoading();
      const { status, data } = responseValue;
      if (status !== 200) {
        wx.showToast({ title: '服务器异常' });
      } else {
        if (data.status === 'success') {
          context.commit('setuser', data.data);
        }
      }
      return responseValue;
    } catch (e) {
      wx.hideLoading();
    }
    return 'fail'

  },
};
