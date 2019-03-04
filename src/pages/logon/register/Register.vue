<template>
  <div class="register">
    <x-header :title="title" :options="headerOption" @leftevent="returnLogin"/>
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
          <input placeholder="密码/Password" v-model="password">
          <i :class="['icon',iconEye]" @click="eyeOpen"></i>
        </div>
        <div class="register-password2">
          <i class="icon icon-password"></i>
          <input placeholder="请再次输入密码/Password" v-model="confirmPassword">
          <i :class="['icon',iconEye]" @click="eyeOpen"></i>
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
@import "../main.less";
</style>
