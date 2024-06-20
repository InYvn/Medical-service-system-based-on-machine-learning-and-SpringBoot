<template>
  <div
      style="height:100vh; overflow:hidden;display: flex;align-items: center;justify-content: center;background-color: #2c3e50">
    <div style="display: flex;background-color: white;weight:50%; border-radius: 10px;overflow: hidden">
      <div style="flex:1">
        <img src="@/assets/login.png" alt="" style="width: 100%">
      </div>
      <div style="flex:1;display: flex;align-items: center;justify-content: center">
        <el-form :model="user" :rules="rules" style="width: 80%" ref="loginRef">
          <div style="font-size: 20px;font-weight: bold;text-align: center;margin-bottom: 20px">医疗服务系统</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入账号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码"
                      v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <el-input prefix-icon="el-icon-check" size="medium" placeholder="请输入验证码" style="flex:1" v-model="user.code"></el-input>
              <div style="flex:1;height: 36px">
                <valid-code @update:value="getCode"/>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1;text-align: left">
              还没有账号？请<span style="color: #3a8ee6;cursor: pointer" @click="$router.push('/register')">注册</span>
            </div>
<!--            <div style="flex: 1;text-align: right"><span style="color: #3a8ee6;cursor: pointer">忘记密码</span></div>-->
          </div>
        </el-form>

      </div>

    </div>
  </div>
</template>

<script>
import ValidCode from "@/components/ValidCode";

export default {
  name: "Login.vue",
  components: {
    ValidCode
  },
  data() {
    // 验证码校验
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value.toLowerCase() !== this.code) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }

    return {
      code: '',
      user: {
        code: '',
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{validator: validateCode, trigger: 'blur'}],
      }
    }
  },
  methods: {
    getCode(code) {
      this.code = code.toLowerCase();
    },
    login() {
      this.$refs['loginRef'].validate((valid) => {
        if (valid) {
          //验证通过
          this.$request.post('/user/login', this.user).then(res => {
            if(res.code==='200'){
              this.$router.push('/')
              this.$message.success("登陆成功")
              localStorage.setItem("user",JSON.stringify(res.data))
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