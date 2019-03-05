import { login } from '@/api/';
import { Commit } from 'vuex';

export default {
  async asyncsetUser(context: { commit: Commit }, params: any) {
    // JSON.stringify(params)
    const responseValue = await login(params);
    const { status, data } = responseValue;
    if (status !== 200) {
      console.log(this, '服务器异常');
    } else {
      if (data.status === 'success') {
        context.commit('setuser', data.data);
      } else {
        console.log(this, data.msg);
      }
    }
    return responseValue;
  },
};
