<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!--  <div class="title-container">
         <el-image :src="url" lazy />
       </div> -->
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="phone">
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="请输入手机号"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-row>
        <el-col :span="14">
          <el-form-item>
            <el-input
              ref="code"
              v-model="loginForm.code"
              type="text"
              placeholder="请输入验证码"
              name="code"
              tabindex="2"
            />
          </el-form-item>
        </el-col>
        <el-col class="back" :span="1" />
        <el-col :span="8">
          <el-button class="code-btn" :disabled="!isMsg" @click="send"><span>{{ content }}</span></el-button>
        </el-col>
      </el-row>
      <el-button :loading="loading" type="primary" class="btn" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
    <el-dialog
      :visible.sync="isShow"
      width="392px"
      top="334px"
      custom-class="validcode-custom"
      class="validcode-dialog"
      @closed="closedCode"
      @keyup.enter.native="codeClick"
    >
      <div slot="title">
        <h5 class="validcode-title">请在下方输入图片验证码</h5>
      </div>
      <div class="validcode">
        <el-form class="validcode-input">
          <el-form-item>
            <el-input v-model="validCodeForm.code" />
          </el-form-item>
        </el-form>
        <img class="validcode-img" :src="validCodeForm.codeUrl" alt="" @click="getValidCodeImg">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="btn" @click="codeClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validPhone } from '@/utils/validate'
import { getCode, getCheck } from '@/api/login'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请验证您手机号输入是否正确'))
      } else {
        callback()
      }
    }
    return {
      content: '获取验证码',
      loginForm: {
        phone: '',
        code: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }]
      },
      loading: false,
      redirect: undefined,
      url: 'https://video.my51share.com/image/default/4A45F6D0B064458589C54EBFC839DFC1-6-2.png',
      validCodeForm: {
        codeUrl: '',
        code: ''
      },
      isShow: false,
      isMsg: true,
      clock: 60,
      clocks: null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    countDown() {
      if (!this.isMsg) return
      this.isMsg = false
      this.content = this.clock + 's后重新发送'
      this.clocks = window.setInterval(() => {
        this.clock--
        this.content = this.clock + 's后重新发送'
        if (this.clock < 0) {
          window.clearInterval(this.clocks)
          this.content = '重新发送验证码'
          this.clock = 60
          this.isMsg = true // 这里重新开启
        }
      }, 1000)
    },
    // 关闭验证码对话框
    closedCode() {
      this.validcode.code = ''
    },
    // 验证码获取
    getValidCodeImg() {
      if (!this.loginForm.phone) return
      getCode(this.loginForm.phone).then(res => {
        if (res.data.code) {
          this.validCodeForm.codeUrl = ''
          return res.message && this.$warn(res.message)
        }
        this.validCodeForm.codeUrl = res.data.data
      })
    },
    // 点击获取验证码按钮
    send() {
      debugger
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.isShow = true
          this.getValidCodeImg()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 验证码确定
    codeClick() {
      debugger
      if (!this.validCodeForm.code) {
        this.$wran('请先输入验证码')
        this.isShow = true
        return false
      }
      const data = {
        phone: this.loginForm.phone,
        code: this.validCodeForm.code
      }
      getCheck(data).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.isShow = false
        this.isMsg = true
        this.countDown()
      })
    },
    //
    loginSuccess() {
      this.$router.replace({ path: '/' })
    },
    // 登录
    handleLogin() {
      if (!this.loginForm.code) {
        this.$wran('请先输入您手机短信里验证码')
        return false
      }
      debugger
      const loginForm = this.loginForm
      this.loading = true
      this.$store
        .dispatch('user/login', loginForm)
        .then(res => {
          debugger
          this.loading = false
          if (res.data.code) {
            return res.data.message && this.$warn(res.data.message)
          }
          this.$success(res.data.message)
          // this.initObj.token = res.data.data.uuid
          // this.$store.commit('user/SET_USERID', res.data.data.uuid)
          // this.initCloud(null)
          // this.getStatus(false)
          this.$router.replace({ path: '/' })
          // this.loginSuccess()
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../styles/login-global';

 .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .code-box {
    display: flex;
  }
  .code-btn {
    display: block;
    width:115px;
    height:42px;
    background:rgba(0,210,165,1);
    box-shadow:0px 1px 4px 0px rgba(44,90,74,0.21),0px -1px 0px 0px rgba(126,167,146,1);
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:42px;
    padding: 0;
    margin: 0;
  }
  .back {
    height: 10px;
  }
  .checked {
    margin-right: 10px;
  }
  .doc {
    color: #BDBDBD;
    font-size: 13px;
    line-height: 13px;
    margin: 6px 0 15px;
    &-link {
      font-size:13px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color: #00D2A5;
      line-height:13px;
    }
  }
  /deep/ {
    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
      background:rgba(238,238,238,1);
      border-radius:4px;
      box-shadow: none;
      & > span {
        font-size:13px;
        font-weight:400;
        color:rgba(187,187,187,1);
        line-height:18px;
      }
    }
  }
</style>
