<!--  -->
<template>
  <div class="product_new">
    <h3 class="title">产品详情</h3>
    <span class="note">*请确保以下内容文字都是英文</span>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-position="right"
      label-width="100px"
      class="ruleForm"
      size="medium"
    >
      <el-form-item label="产品类目：" prop="category">
        <el-select v-model="ruleForm.categoryUuid" clearable placeholder="请选择产品类目" style="width:500px">
          <el-option
            v-for="item in productCategoryList"
            :key="item.uuid"
            :label="item.nameCn"
            :value="item.uuid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称:">
        <el-input v-show="false" v-model="ruleForm.uuid" />
        <el-input v-model="ruleForm.name" style="width:500px" />
      </el-form-item>
      <el-form-item label="产品图片：">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          name="multipartFile"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
        >
          <img v-if="ruleForm.pic" :src="ruleForm.pic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <p class="upload-tips">只能上传jpg/png文件</p>
      </el-form-item>
      <el-form-item label="标签：">
        <el-select v-model="ruleForm.tags" multiple placeholder="请选择" style="width:500px">
          <el-option
            v-for="item in TagsList"
            :key="item.uuid"
            :label="item.nameCn"
            :value="item.uuid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品描述：">
        <el-input
          v-model="ruleForm.description"
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          style="width:500px"
        />
      </el-form-item>
      <el-form-item label="附件：">
        <el-upload
          style="width:500px"
          :on-success="handleSuccess"
          :file-list="ruleForm.fileList"
          :action="Upload_File"
          :on-remove="handleRemove"
          class="upload-demo"
          name="multipartFile"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
import { getSupplierCategoryList, getTagsList, editProduct, getProductDetail } from '@/api/product'
import { Upload_Pic, Upload_File } from '@/api/url'

export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      productCategoryList: [],
      ruleForm: {
        uuid: '',
        categoryUuid: '',
        name: '',
        pic: '',
        tags: [],
        attachement: '',
        status: '1',
        fileList: []
      },
      uploadUrl: Upload_Pic,
      Upload_File: Upload_File,
      TagsList: [],
      query: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCategory()
    this.getTags()
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
    inintData() {
      getProductDetail(this.query.id).then(res => {
        if (res.data.code) {
          return res.data.message && this.$warn(res.data.message)
        }
        const ruleForm = res.data.data
        const tagsNew = ruleForm.tags
        const tags = []
        tagsNew.forEach(item => {
          tags.push(item.tagUuid)
        })
        ruleForm.tags = tags
        let fileitem = {}
        const fileList = []
        fileitem = {
          name: ruleForm.attachement.split('/').pop(),
          url: ruleForm.attachement
        }
        fileList.push(fileitem)
        ruleForm.fileList = fileList
        ruleForm.status = String(ruleForm.status)
        this.ruleForm = ruleForm
      })
    },
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
      this.ruleForm.pic = res.data
    },
    handleVideoRemove() {
      this.ruleForm.pic = ''
    },
    handlePictureCardPreview(file) {
      this.ruleForm.pic = file.url
    },
    // 获取产品类目
    getCategory() {
      getSupplierCategoryList().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.productCategoryList = res.data.data
      }).catch(res => {

      })
    },
    getTags() {
      getTagsList().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        console.log(res.data.data)
        this.TagsList = res.data.data
      })
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      this.$success('删除成功！！！')
      this.ruleForm.attachement = ''
      this.fileLst = []
    },
    handleSuccess(res, file) {
      debugger
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      this.$success('上传成功！！！')
      this.ruleForm.attachement = res.data
      const fileitem = {
        name: file.name,
        url: res.data
      }
      this.fileList = []
      this.fileList.push(fileitem)
    },
    cancel(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    },
    onSubmit(formName) {
      debugger
      const tags = this.ruleForm.tags
      const tagsNew = []
      tags.forEach(item => tagsNew.push({ tagUuid: item }))
      this.ruleForm.tags = tagsNew
      editProduct(this.ruleForm).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success(res.data.message)
        this.$router.go(-1)
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
     width: 50%;
 }
</style>
