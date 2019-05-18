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
          <input type="text"
                 placeholder="工号/EmployeeNo"
                 v-model="username"
                 cursor-spacing=240>
        </div>
        <div class="login-password">
          <i class="iconfont icon-lock"></i>
          <input placeholder="密码/Password"
                 type="text"
                 :password="showPassword"
                 v-model="password"
                 cursor-spacing=180>
          <i :class="['iconfont', iconEye]"
             @click="eyeOpen"></i>
        </div>
        <div class="login-remember">
          <checkbox-group @change="checkboxChange">
            <label class="checkbox"
                   v-for="item in items"
                   :key="item.name">
              <checkbox :value="item.name"
                        :checked="item.checked" color='#3e79fb'/>
              {{item.value}}
            </label>
          </checkbox-group>
          <div>忘记密码？</div>
        </div>
        <div class="login-button">
          <button @click="handleLogin">登录/Login</button>
        </div>
        <div class="register-message">
          <span class="register-message-info">还没有账号？</span>
          <span class="register-message-to"
                @click="toRegister">立即注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>

<style lang="less">
@import '../main.less';
</style>

