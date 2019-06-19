<template>
  <div class="login">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../assets/img/img-01.png" alt="IMG">
        </div>

        <div class="login100-form validate-form">
          <span class="login100-form-title">用户登录</span>
          <div class="wrap-input100 validate-input">
            <input class="input100" type="text" name="email" placeholder="账号" v-model="loginForm.username">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
						<i class="el-icon-user" aria-hidden="true"></i>
					</span>
          </div>
          <div class="wrap-input100 validate-input">
            <input class="input100" type="password" name="pass" placeholder="密码" v-model="loginForm.password">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
						<i class="fa fa-lock" aria-hidden="true"></i>
					</span>
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="login()">
              登陆
            </button>
          </div>
          <div class="text-center p-t-12">
            <a class="txt2" href="javascript:">
              忘记密码？
            </a>
          </div>

          <div class="text-center p-t-136">
            <a class="txt2" href="#">
              还没有账号？立即注册
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../assets/js/login.js"></script>

<style scoped>
  @import "../assets/css/login/font-awesome.min.css";
  @import "../assets/css/login/util.css";
  @import "../assets/css/login/main.css";
</style>
