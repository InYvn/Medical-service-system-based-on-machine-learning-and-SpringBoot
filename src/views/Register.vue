<template>
  <div
      style="height:100vh; overflow:hidden;display: flex;align-items: center;justify-content: center;background-color: #6ca9e0">
    <div style="display: flex;background-color: white;weight:50%; border-radius: 10px;overflow: hidden">
      <div style="flex:1">
        <img src="@/assets/login.png" alt="" style="width: 100%">
      </div>
      <div style="flex:1;display: flex;align-items: center;justify-content: center">
        <el-form :model="user" :rules="rules" style="width: 80%" ref="registerRef">
          <div style="font-size: 20px;font-weight: bold;text-align: center;margin-bottom: 20px">医疗服务系统</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入账号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码"
                      v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <div style="display: flex">
              <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请再次输入密码" style="flex:1" v-model="user.password2"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="info" @click="register">注 册</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1;text-align: left">
              已有账号？请<span style="color: #3a8ee6;cursor: pointer" @click="$router.push('/login')">登录</span>
            </div>
          </div>
        </el-form>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "Login.vue",
  data() {
      // 密码校验
      const validatePassword = (rule, password2, callback) => {
        if (password2 === '') {
          callback(new Error('请再次输入密码'))
        } else if (password2 !== this.user.password) {
          callback(new Error('两次输入的验证码不一致'))
        } else {
          callback()
        }
      }
    return {
      user: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        password2: [{validator: validatePassword, trigger: 'blur'}],
      }
    }
  },
  methods: {
    getCode(code) {
      this.code = code.toLowerCase();
    },
    register() {
      this.$refs['registerRef'].validate((valid) => {
        if (valid) {
          //验证通过
          this.$request.post('/user/register', this.user).then(res => {
            if(res.code==='200'){
              this.$router.push('/login')
              this.$message.success("注册成功")
            }else{
              this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      });

    }
  }
}
</script>

<style scoped>

</style>