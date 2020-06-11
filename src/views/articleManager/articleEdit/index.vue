<!--  -->
<template>
  <div class="product_new">
    <h3 class="title">添加文章</h3>
    <span class="note">*请确保以下内容文字都是英文</span>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-position="right"
      label-width="100px"
      class="ruleForm"
      size="medium"
    >
      <el-form-item label="文章标题">
        <el-input v-model="ruleForm.title" style="width:500px" />
        <el-input v-show="false" v-model="ruleForm.uuid" />
      </el-form-item>
      <el-form-item label="文章简介:">
        <el-input v-model="ruleForm.simpleDescription" style="width:500px" />
      </el-form-item>
      <el-form-item label="文章内容：">
        <quill-editor
          ref="myQuillEditor"
          v-model="ruleForm.content"
          :options="editorOption"
        />
      </el-form-item>
      <el-form-item label="图片：">
        <el-upload
          :action="uploadUrl"
          list-type="picture-card"
          name="multipartFile"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :on-success="handleVideoSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <p class="upload-tips">只能上传jpg/png文件</p>
      </el-form-item>
      <el-form-item label="状态：">
        <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
        <el-radio v-model="ruleForm.status" label="0">禁用</el-radio>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" style="left:200px" @click="onSubmit('ruleForm')">提交</el-button>
          <el-button type="info" style="left:100px" @click="cancel('ruleForm')">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { editArticle, getArticleDetail } from '@/api/article'
import { Upload_Pic } from '@/api/url'

export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      productCategoryList: [],
      ruleForm: {
        uuid: '',
        title: '',
        simpleDescription: '',
        content: '',
        pics: [],
        status: '1'
      },
      editorOption: {
        placeholder: '请输入文章内容...'
      },
      uploadUrl: Upload_Pic,
      dialogImageUrl: '',
      dialogVisible: false,
      query: {},
      fileList: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.query = this.$route.query
    this.inintData()
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
      debugger
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      this.$success('上传成功！！！')
      this.ruleForm.pics.push(res.data)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      debugger
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      this.ruleForm.pics = []
      fileList.forEach(item => {
        const url = item.response ? item.response.data : item.url
        this.ruleForm.pics.push(url)
      })
      this.$success('删除成功！！！')
    },
    inintData() {
      getArticleDetail(this.query.id).then(res => {
        if (res.data.code) {
          return res.data.message && this.$warn(res.data.message)
        }
        this.ruleForm = res.data.data
        const fileList = res.data.data.pics
        let fileitem = {}
        const fileListNew = []
        fileList.forEach(item => {
          fileitem = {}
          fileitem = {
            name: item.split('/').pop(),
            url: item
          }
          fileListNew.push(fileitem)
        })
        this.fileList = fileListNew
      })
    },
    onSubmit(ruleForm) {
      editArticle(this.ruleForm).then(res => {
        if (res.code) {
          return res.message && this.$warn(res.message)
        }
        this.$success(res.data.message)
        this.$router.push({
          path: '/articleManager/articleList'
        })
      })
    },
    cancel(ruleForm) {
      this.$router.push({
        path: '/articleManager/articleList'
      })
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style >
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
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.product_new{
  padding-top: 40px;
  padding-left: 80px;
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
    left: 180px;
    top: 50px;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'PingFang-SC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #FF2626;
 }
 .ruleForm{
    padding-top: 40px;
    width: 80%;
 }
</style>
