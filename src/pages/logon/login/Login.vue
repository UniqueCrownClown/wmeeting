<template>
<div class="login">
  <div class="login-ctn">
    <div class="login-info-ctn">
      <div class="login-title-logo">
        <i class="iconfont icon-logo"></i>
      </div>
      <div class="login-info-title">智慧办公管理系统</div>
      <div class="login-name">
        <i class="iconfont icon-admin"></i>
        <input type="text" placeholder="工号/EmployeeNo" v-model="username">
      </div>
      <div class="login-password">
        <i class="iconfont icon-lock"></i>
        <input placeholder="密码/Password" type="password" v-model="password" v-if="showPassword">
        <input placeholder="密码/Password" type="text" v-model="password" v-else>
        <i :class="['iconfont', iconEye]" @click="eyeOpen"></i>
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
<script lang="ts" src="./index.ts">
</script>

<style lang="less">
@import "../main.less";
</style>

