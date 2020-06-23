<!--  -->
<template>
  <div class="material">
    <h3 class="title">基本资料</h3>
    <span class="note">*请确保以下内容文字都是英文</span>
    <el-form ref="form" :inline="true" class="search-box" :model="form" label-width="150px" label="left" :rules="rules">
      <el-form-item class="search-item" label="Company name" prop="companyName">
        <el-input v-model.trim="form.companyName" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="Company profile" prop="simpleDescription">
        <el-input v-model.trim="form.simpleDescription" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="Jump website" prop="webUrl">
        <el-input v-model.trim="form.webUrl" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="The name" prop="realName">
        <el-input v-model.trim="form.realName" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="Personal motto" prop="motto">
        <el-input v-model.trim="form.motto" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="Mobile phone no." prop="mobilePhone">
        <el-input v-model.trim="form.mobilePhone" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="Email" prop="email">
        <el-input v-model.trim="form.email" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="Twitter" prop="twitter">
        <el-input v-model.trim="form.twitter" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="Facebook" prop="facebook">
        <el-input v-model.trim="form.facebook" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="LinkedIn" prop="linkedIn">
        <el-input v-model.trim="form.linkedIn" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item class="search-item" label="whatsapp" prop="whatsapp">
        <el-input v-model.trim="form.whatsapp" placeholder="Please enter the" style="width:400px" />
      </el-form-item>
      <el-form-item label="上传照片">
        <el-upload
          class="uploader logo"
          :action="uploadUrl"
          name="multipartFile"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
        >
          <img v-if="form.businessPic" :src="form.businessPic" class="logo">
          <i v-else class="el-icon-picture uploader-icon" />
        </el-upload>
        <p class="upload-tips">只能上传jpg/png文件，建议尺寸为580x580px。</p>
        <input type="hidden">
      </el-form-item>

      <el-form-item class="search-item" label="Promotional video" prop="facebook">
        <div class="upload-box">
          <div v-for="item in form.videos " :key="item.videoUrl" class="video-box">
            <span class="icon-close" @click="closeVideo(item.videoUrl)" />
            <video class="video-border" controls autoplay :poster="item.videoCover">
              <source :src="item.videoUrl" type="video/mp4">
            </video>
          </div>
          <input v-show="false" ref="input" type="file" accept="video/*" @change="fileChange">
          <el-button size="small" type="primary" @click="$refs.input.click()">
            上传视频
          </el-button>
          <el-progress v-show="percentage" :percentage="percentage" :stroke-width="20" :color="customColors" style="width:400px" :text-inside="true" />
        </div>
      </el-form-item>
      <el-row>
        <el-col :span="9">
          <el-button class="submit" @click="submitInformation">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import axios from 'axios'
import { Upload_Pic, Upload_Video } from '@/api/url'
import { getWeb, updateWeb } from '@/api/website'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('No null allowed, please enter!!'))
      }
      setTimeout(() => {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
          callback(new Error('Please enter English!!!'))
        }
      }, 1000)
    }
    return {
      form: {
        companyName: '', //	公司名称
        simpleDescription: '', //	公司简介
        webUrl: '', // 	跳转官网
        realName: '', // 姓名
        motto: '', // 	个人格言
        mobilePhone: '', // 手机号
        email: '', // 邮箱
        twitter: '', // Twitter
        facebook: '', // facebook
        linkedIn: '', // linkedIn
        whatsapp: '', // whatsapp
        videos: [
        ],
        videoInfo: {
          videoCoverUrl: '',
          videoUrl: '',
          videoId: ''
        },
        businessPic: ''
      },
      rules: {
        companyName: [
          { required: true, message: 'Please enter the company name', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        simpleDescription: [
          { required: true, message: 'Please enter company profile', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        webUrl: [
          { required: true, message: 'Please enter Jump website', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: 'Please enter Name', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        motto: [
          { required: true, message: 'Please enter Personal motto', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: 'Please enter Mobile phone no', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter Email', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        twitter: [
          { required: true, message: 'Please enter twitter', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        facebook: [
          { required: true, message: 'Please enter Facebook', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        linkedIn: [
          { required: true, message: 'Please enter LinkedIn', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        whatsapp: [
          { required: true, message: 'Please enter whatsapp', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      videoUrl: Upload_Video, // 视频上传地址
      uploadUrl: Upload_Pic, // 图片上传地址
      uploadFile: null,
      percentage: 0,
      uploader: null,
      disableSubmit: true,
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      securityToken: '',
      accessKeyId: '',
      accessKeySecret: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
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
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    handleVideoSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      this.$success('上传成功！！！')
      this.form.businessPic = res.data
    },
    handleVideoRemove() {
      this.videoLoading = false
      this.form.businessPic = ''
      this.form.businessPic = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    fileChange() {
      debugger
      if (!event.target.files[0]) {
        return false
      }
      if (!event.target.files[0].type.match('video.*')) {
        this.$message.error('请选择视频文件')
        return false
      }
      this.uploadFile = event.target.files[0]
      this.percentage = 0
      // 上传文件的size的单位为 字节(B)
      // 150兆字节(mb) = 157286400字节(B)
      if (this.uploadFile.size <= 157286400) {
        this.getAuth(() => {
          // 给uploader大佬addFile
          this.getUploder()
          var userData = '{"Vod":{"StorageLocation":"","Title":"' + this.uploadFile.name + '","Description":"默认描述信息暂无","CateId":"19","Tags":"测试视频"}}'
          this.uploader.addFile(this.uploadFile, '', '', '', userData)
          this.uploader.startUpload()
        })
      } else {
        this.$message.error('上传的文件大小超过150M，请重新上传')
      }
    },
    getUploder() {
      const _this = this
      /* eslint-disable no-undef */
      _this.uploader = new AliyunUpload.Vod({ // 分片大小默认1M，不能小于100K
        userId: '1402947514567452',
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 是否上报上传日志到点播，默认为true
        enableUploadProgress: true,
        // 文件上传失败
        'onUploadFailed': function(uploadInfo, code, message) {
          _this.$message.error(`文件上传失败：${message}`)
          // log(`onUploadFailed: file:${uploadInfo.file.name},code:${code}, message:${message}`)
        },
        // 文件上传完成
        'onUploadSucceed': function(uploadInfo) {
          debugger
          console.log(uploadInfo)
          // log(uploadInfo)
          // console.log(`onUploadSucceed: ${uploadInfo.file.name}, endpoint:${uploadInfo.endpoint}, bucket:${uploadInfo.bucket}, object:${uploadInfo.object}`)
          const videoUrl = `https://video.my51share.com/${uploadInfo.object}`
          const videoitem = {
            videoUrl,
            videoId: uploadInfo.videoId,
            videoCover: ''
          }
          _this.form.videos.push(videoitem)
          // _this.form.videos.push(videoitem)
          console.log(_this.form.videos)
          _this.$message.success('文件上传成功')
        },
        // 文件上传进度
        'onUploadProgress': function(uploadInfo, totalSize, loadedPercent) {
          _this.percentage = +(loadedPercent * 100).toFixed(0)
          // log(`onUploadProgress:file:${uploadInfo.file.name}, fileSize:${totalSize}, percent:${(loadedPercent * 100.00).toFixed(2)}%`)
        },
        // STS临时账号会过期，过期时触发函数
        'onUploadTokenExpired': function(uploadInfo) {
          console.log('onUploadTokenExpired STS临时账号过期了')
          // 实现时，从新获取STS临时账号用于恢复上传
          // uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, securityToken, expireTime)
        },
        'onUploadCanceled': function(uploadInfo) {
          console.log(`onUploadCanceled:file:${uploadInfo.file.name}`)
        },
        // 开始上传
        'onUploadstarted': function(uploadInfo) {
          var accessKeyId = _this.accessKeyId
          var accessKeySecret = _this.accessKeySecret
          var securityToken = _this.securityToken
          _this.uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, securityToken)
        },
        'onUploadEnd': function(uploadInfo) {
          console.log('onUploadEnd: uploaded all the files')
        }
      })
    },
    getAuth(callback) {
      const uuid = JSON.parse(localStorage.getItem('storeId')) || '023'
      // 获取上传凭证
      axios.get('https://dev.my51share.com/VodStsForApp/' + uuid).then(res => {
        debugger
        this.securityToken = res.data.credentials.securityToken
        this.accessKeyId = res.data.credentials.accessKeyId
        this.accessKeySecret = res.data.credentials.accessKeySecret
        callback()
      })
    },
    getWebsite() {
      getWeb().then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.form = res.data.data
      })
    },
    submitInformation() {
      const data = this.form
      updateWeb(data).then(res => {
        if (res.data.code) {
          return res.data.message && this.$warn(res.data.message)
        }
        this.$success(res.data.message)
      })
    },
    closeVideo(videoUrl) {
      const videos = this.form.videos
      const videosNew = videos.filter(item => {
        return item.videoUrl !== videoUrl
      })
      this.form.videos = videosNew
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import '../../../styles/store';

.material{
  padding: 30px
}
  .title{
     width:97px;
     height:38px;
     font-size:24px;
     font-weight:600;
     color:rgba(23,23,37,1);
  line-height:38px;
  margin: 0;
  }
 .note{
   position: absolute;
    left: 130px;
    top: 45px;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'PingFang-SC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #FF2626;
 }
 .search-box {
  margin-top: 20px;
  margin-left: 50px;
  /deep/ {
    .el-form-item {
      margin-bottom: 20px;
      width: 600px;
    }
    .el-icon-search:before {
      font-size: 20px;
    }
  }
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .uploader {
    display: block;
    width: 200px;
    height: 200px;
  }
  .logo {
    display: block;
    width: 200px;
    height: 200px;
  }
  .upload-tips {
    margin-top: 15px;
  }
  /deep/ {
    .el-upload--picture-card {
      width: 200px;
      height: 200px;
      line-height: 90px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 200px;
      height: 200px;
    }
  }
  .progress {
    margin-top: 10px;
  }
  .video-box{
      position: relative;;
     width: 400px;
     height: 300x;
     .icon-close{
        position:absolute;
        top:20px;
        right:20px;
        display:inline-block;
        width:20px;
        height:20px;
        background:url('https://video.my51share.com/image/default/1287D2EAF19E4A1FA737389B98F012DD-6-2.png') no-repeat center;
        cursor:pointer;
        z-index:11;
      }
     .video-border{
        width: 400px;
     }
  }
</style>
