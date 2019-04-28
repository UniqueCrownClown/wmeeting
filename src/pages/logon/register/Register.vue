<template>
  <div class="register">
    <x-header :title="title"
              :options="headerOption"
              @leftevent="returnLogin" />
    <div class="login-ctn">
      <div class="login-info-ctn">
        <div class="login-title-logo">
          <i class="iconfont icon-logo"></i>
        </div>
        <div class="register-usercard">
          <i class="iconfont icon-admin"></i>
          <input type="text"
                 placeholder="工号/EmployeeNo"
                 cursor-spacing=320
                 v-model="usercard">
        </div>
        <div class="register-usercard">
          <i class="iconfont icon-admin"></i>
          <input type="text"
                 placeholder="用户名/Username"
                 cursor-spacing=240
                 v-model="username">
        </div>
        <div class="register-password">
          <i class="iconfont icon-lock"></i>
          <input placeholder="密码/Password"
                 type="text"
                 :password="showPassword"
                 v-model="password"
                 cursor-spacing=170>
          <i :class="['iconfont',iconEye]"
             @click="eyeOpen"></i>
        </div>
        <div class="register-password2">
          <i class="iconfont icon-lock"></i>
          <input placeholder="密码/Password"
                 type="text"
                 :password="showPassword"
                 v-model="confirmPassword"
                 cursor-spacing=100>
          <i :class="['iconfont',iconEye]"
             @click="eyeOpen"></i>
        </div>
        <div class="login-button">
          <button @click="handleRegister">注册/Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>

<style lang="less">
@import '../main.less';
</style>
