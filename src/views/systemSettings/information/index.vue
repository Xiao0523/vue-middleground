<!--  -->
<template>
  <div class="information">
    <h3 class="title">账号资料</h3>
    <el-form
      ref="form"
      :model="form"
      label-position="right"
      label-width="100px"
      class="ruleForm"
      size="medium"
    >
      <el-form-item class="search-item" label="姓名：">
        <el-input v-model.trim="form.personName" style="width:40%" />
      </el-form-item>
      <el-form-item class="search-item" label="手机号：">
        <el-input v-model.trim="form.mobilePhone" style="width:40%" />
      </el-form-item>

      <el-form-item label="短信验证码：">
        <el-input
          ref="code"
          v-model="form.code"
          type="text"
          placeholder="请输入验证码"
          name="code"
          tabindex="3"
          style="width:30%"
        />
        <el-button class="code-btn" :disabled="!isMsg" style="width:10%" @click="send"><span>{{ content }}</span></el-button>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input
          ref="email"
          v-model="form.email"
          type="text"
          placeholder="请输入邮箱"
          name="email"
          tabindex="4"
          style="width:40%"
        />
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-button class="submit" @click="submitInformation">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="isShow"
      width="392px"
      top="200px"
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
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import { getSuppliertCode, getCheck, updateUserInformation, getUserInformation } from '@/api/userCenter'

export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      content: '获取验证码',
      form: {
        personName: '',
        mobilePhone: '',
        code: '',
        email: ''
      },
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
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getWebsite()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
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
    getValidCodeImg() {
      getSuppliertCode().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.validCodeForm.codeUrl = res.data.data
      })
    },
    // 点击获取验证码按钮
    send() {
      if (!this.form.mobilePhone) {
        this.$wran('请先输入手机号')
        return
      }
      this.getValidCodeImg()
      this.isShow = true
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
        phone: this.form.mobilePhone,
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
    submitInformation() {
      updateUserInformation(this.form).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success(res.data.message)
      })
    },
    getWebsite() {
      getUserInformation().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.form = res.data.data
      })
    }

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
@import '../../../styles/store';
  .validcode{
    display: flex;
    &-input {
      flex: 1;
      & > .el-form-item {
        margin-bottom: 0;
      }
    }
    &-img{
      display: inline-block;
      width: 98px;
      height: 42px;
      background: rgba(216, 216, 216, 1);
      border-radius: 4px;
      margin-left: 20px;
    }
    &-title{
      text-align: center;
      font-size: 14px;
      margin: 10px 0 0;
    }
    &-dialog{
      & /deep/ {
        & .el-dialog__body {
          padding: 10px 30px
        }
        & .el-dialog__footer{
          padding: 10px 30px 30px
        }
      }
    }
  }
.information{
   padding-top: 40px;
   padding-left: 80px;
  .title{
   width:97px;
   height:38px;
   font-size:24px;
   font-weight:600;
   color:rgba(23,23,37,1);
   line-height:38px;
    margin: 0;
  }
}
 .ruleForm{
    padding-top: 40px;
    width: 80%;
 }
 .code-btn {
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
</style>
