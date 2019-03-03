<template>
<div class="login">
  <div class="login-ctn">
    <div class="login-info-ctn">
      <div class="login-title-logo">
        <i class="iconfont icon-logo"></i>
      </div>
      <div class="login-info-title">智慧办公管理系统</div>
      <div class="login-name">
        <i class="icon icon-login"></i>
        <input type="text" placeholder="工号/EmployeeNo" v-model="username">
      </div>
      <div class="login-password">
        <i class="icon icon-password"></i>
        <input :type="loginPasswordType" placeholder="密码/Password" v-model="password">
        <i :class="['icon', iconEye]" @click="eyeOpen"></i>
      </div>
      <div class="login-remember">
        <div>
          <input type="checkbox" v-model="isRemember">
          <label>记住密码</label>
        </div>
        <div>忘记密码？</div>
      </div>
      <div class="login-button">
        <button @click="handleLogin">登录/Login</button>
      </div>
      <div class="register-message">
        <span class="register-message-info">还没有账号？</span>
        <span class="register-message-to" @click="toRegister">立即注册</span>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import Joi from "joi";
import loginSchema from "./login.schema";
const meetModule = namespace("meeting");
@Component
export default class Login extends Vue {
  private username: string = "";
  private password: string = "";
  private iconEye: string = "icon-close-eyes";
  private loginPasswordType: string = "password";
  private isRemember: boolean = false;
  @meetModule.Mutation("asyncsetUser") asyncsetUser!: (
    params: URLSearchParams
  ) => void;

  async handleLogin() {
    const { error } = Joi.validate(
      {
        username: this.username,
        password: this.password
      },
      loginSchema
    );
    if (error && error.details.length >= 1) {
      const detail = error.details[0];
      const message = detail.message;
      alert(message);
      return;
    }
    try {
      const params = new URLSearchParams();
      params.append("usercard", this.username);
      params.append("password", this.password);
      const responseValue: any = await this.asyncsetUser(params);
      const { status, data } = responseValue;
      if (status !== 200) {
        alert("服务器异常");
      } else {
        if (data.status === "success") {
          if (this.username === "A0000") {
            this.$router.push(`/supermain`);
          } else {
            this.$router.push(`/main`);
          }
        } else {
          alert(data.msg);
        }
      }
    } catch (err) {
      alert(err);
    }
  }
  toRegister() {
    this.$router.push(`/register`);
  }
  eyeOpen() {
    if (this.loginPasswordType === "password") {
      this.loginPasswordType = "text";
      this.iconEye = "icon-eyes";
    } else {
      this.loginPasswordType = "password";
      this.iconEye = "icon-close-eyes";
    }
  }
}
</script>
<style lang="less">
@import "./main.less";
</style>

