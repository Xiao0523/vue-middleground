<template>
  <div class="product">
    <el-row>
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="ruleForm"
      >
        <el-form-item>
          <el-input v-model.trim="ruleForm.title" placeholder="请输入产品名称" clearable style="width: 400px;" />
        </el-form-item>
        <el-form-item label="产品类目：" prop="category">
          <el-select v-model="ruleForm.productCategoryId" clearable placeholder="请选择产品类目" @change="changeTheme">
            <el-option
              v-for="item in productCategoryList"
              :key="item.uuid"
              :label="item.nameCn"
              :value="item.uuid"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="ruleForm.status" @change="changeTheme">
            <el-radio-button label="-1">全部</el-radio-button>
            <el-radio-button label="0">禁用</el-radio-button>
            <el-radio-button label="1"> 启用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary" style="margin-left: 80px" @click="search">查找</el-button>
        <el-button type="primary" style="margin-left: 80px" @click="newProduct">新增产品</el-button>
      </el-form>
    </el-row>
    <el-table :data="productList" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column type="index" width="50" align="center" />
      <el-table-column align="center" prop="name" label="产品名称" />
      <el-table-column align="center" label="产品图片">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.pic"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="categoryName" label="产品类目" />
      <el-table-column align="center" prop="description" label="产品描述" />
      <el-table-column align="center" label="附件">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            :action="Upload_File"
            :file-list="scope.row.fileList"
            :limit="1"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="标签">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tags"
            :key="item.tagUuid"
            type="success"
            effect="plain"
          >
            {{ item.tagName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" effect="dark" type="success">启用</el-tag>
          <el-tag v-if="scope.row.status === 0" effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status === 0"
            type="success"
            size="mini"
            @click="changeStatus(scope.row.uuid,1)"
          >开启</el-button>
          <el-button
            v-if="scope.row.status === 1"
            type="danger"
            size="mini"
            @click="changeStatus(scope.row.uuid,0)"
          >禁用</el-button>
          <el-button type="warning" size="mini" @click="del(scope.row.uuid)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pageNumBox">
      <pageNum
        :current-page="pageNo"
        :page-size="pageSize"
        :total="totalNum"
        @sizeChange="sizeChangeFn"
        @currentChange="currentPageChange"
      />
    </div>
  </div>
</template>

<script>
import { getSupplierCategoryList, getSupplierList, getProductDetail, editProduct, deleteProduct } from '@/api/product'
import { Upload_File } from '@/api/url'

import pageNum from '@/components/pageNum'
export default {
  components: {
    pageNum
  },
  data() {
    return {
      totalNum: null, // 数据总条数
      pageNo: 1, // 当前页
      pageSize: 10, // 每页的条数
      tabHeader: {
        'background-color': '#F4F4F4',
        'color': '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      ruleForm: {
        title: '', // 产品名称
        productCategoryId: '' // 类目ID
      },
      productCategoryList: [], // 类目列表
      productList: [],
      Upload_File: Upload_File
    }
  },
  created() {
    this.getCategory()
    this.fetchCategory()
  },

  methods: {
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
    // 点击搜索 获取文章列表 列表置为第一页
    search() {
      this.pageNo = 1
      this.fetchCategory()
    },
    //
    changeTheme() {
      this.pageNo = 1
      this.fetchCategory()
    },
    fetchCategory() {
      const status = (this.ruleForm.status === '-1') ? '' : this.ruleForm.status
      const data = {
        productCategoryId: this.ruleForm.productCategoryId,
        title: this.ruleForm.title,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        status
      }
      getSupplierList(data).then(res => {
        debugger
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        const productListNew = res.data.data.records
        const productList = []
        productListNew.forEach(item => {
          let fileitem = {}
          const fileList = []
          fileitem = {
            name: item.attachement.split('/').pop(),
            url: item.attachement
          }
          fileList.push(fileitem)
          item.fileList = fileList
          productList.push(item)
        })
        this.productList = productList
        this.totalNum = res.data.data.total
      })
    },
    // 分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchCategory()
    },

    // 分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchCategory()
    },
    newProduct() {
      this.$router.push({
        path: '/product/new'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/product/edit',
        query: {
          id: row.uuid
        }
      })
    },

    changeStatus(uuid, status) {
      getProductDetail(uuid).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        const data = res.data.data
        data.status = status
        editProduct(data).then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success(res.data.message)
          this.pageNo = 1
          this.fetchCategory()
        })
      })
    },
    del(id) {
      deleteProduct(id).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success(res.data.message)
        this.pageNo = 1
        this.fetchCategory()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.product{
  padding: 30px;
}
</style>
