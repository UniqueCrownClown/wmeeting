<template>
  <div class="register">
    <Header title="会议室预约" :leftOptions="{ backText: '' }">
      <a slot="left" @click="returnLogin">返回</a>
      <a slot="right"></a>
    </Header>
    <div class="login-ctn">
      <div class="login-info-ctn">
        <div class="login-title-logo">
          <i class="iconfont icon-logo"></i>
        </div>
        <div class="register-usercard">
          <i class="icon icon-login"></i>
          <input type="text" placeholder="工号/EmployeeNo" v-model="usercard">
        </div>
        <div class="register-usercard">
          <i class="icon icon-login"></i>
          <input type="text" placeholder="用户名/Username" v-model="username">
        </div>
        <div class="register-password">
          <i class="icon icon-password"></i>
          <input :type="loginPasswordType" placeholder="密码/Password" v-model="password">
          <i :class="['icon',iconEye]" @click="eyeOpen"></i>
        </div>
        <div class="register-password2">
          <i class="icon icon-password"></i>
          <input :type="loginPasswordType" placeholder="请再次输入密码/Password" v-model="confirmPassword">
          <i :class="['icon',iconEye]" @click="eyeOpen"></i>
        </div>
        <div class="login-button">
          <button @click="handleRegister">注册/Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import Joi from "joi";
import registerSchema from "./register.schema";
const meetModule = namespace("meeting");
@Component
export default class Register extends Vue {
  private usercard: string = "";
  private username: string = "";
  private password: string = "";
  private confirmPassword: string = "";
  private iconEye: string = "icon-close-eyes";
  private loginPasswordType: string = "password";
  eyeOpen() {
    if (this.loginPasswordType === "password") {
      this.loginPasswordType = "text";
      this.iconEye = "icon-eyes";
    } else {
      this.loginPasswordType = "password";
      this.iconEye = "icon-close-eyes";
    }
  }
  returnLogin(){
    this.$router.push(`/`);
  }
  async handleRegister() {
    const { error } = Joi.validate(
      {
        usercard: this.usercard,
        password: this.password,
        confirmPassword: this.confirmPassword,
        username: this.username
      },
      registerSchema
    );
    if (error && error.details.length >= 1) {
      const message = error.details[0].message;
      vuxInfo(this, message);
      return;
    }
    let responseValue;
    try {
      const params = new URLSearchParams();
      params.append("usercard", this.usercard);
      params.append("username", this.username);
      params.append("password", this.password);
      responseValue = await register(params);
    } catch (err) {
      vuxInfo(this, err);
      return;
    }
    let { status, data } = responseValue;
    if (status !== 200) {
      vuxInfo(this, "服务器异常");
    } else {
      if (data.status === "fail") {
        vuxInfo(this, data.msg);
      } else {
        vuxInfo(this, data.msg, () => {
          this.$router.replace(`/`);
        });
      }
    }
  }
}
</script>
<style lang="less">
@import "./main.less";
</style>
