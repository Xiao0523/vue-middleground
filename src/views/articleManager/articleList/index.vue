<template>
  <div class="product">
    <el-row>
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="ruleForm"
      >
        <el-form-item label="标题：">
          <el-input v-model.trim="ruleForm.title" placeholder="标题" clearable style="width: 300px;" />
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="ruleForm.status" @change="changeTheme">
            <el-radio-button label="-1">全部</el-radio-button>
            <el-radio-button label="0">禁用</el-radio-button>
            <el-radio-button label="1"> 启用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="ruleForm.beginTime"
            type="datetime"
            placeholder="开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="dateChangeBeginTime"
          />
          <span>~</span>
          <el-date-picker
            v-model="ruleForm.endTime"
            type="datetime"
            placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="dateChangeEndTime"
          />
        </el-form-item>
        <el-button type="primary" style="margin-left: 80px" @click="search">查找</el-button>
        <el-button type="primary" style="margin-left: 80px" @click="newProduct">新增文章</el-button>
      </el-form>
    </el-row>
    <el-table :data="articlesList" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column type="index" width="50" />
      <el-table-column align="center" prop="title" label="标题" />
      <el-table-column align="center" prop="simpleDescription" label="简介" />
      <el-table-column align="center" label="添加时间" width="200">
        <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '1'" effect="dark" type="success">启用</el-tag>
          <el-tag v-if="scope.row.status === '0'" effect="dark" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status === '0'"
            type="success"
            size="mini"
            @click="changeStatus(scope.row.uuid,1)"
          >开启</el-button>
          <el-button
            v-if="scope.row.status === '1'"
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
import { getArticleList, editArticle, getArticleDetail, deleteArticle } from '@/api/article'
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
        status: '', // 状态：0禁用/1启用，不传即所有
        beginTime: '', // 开始时间，如：2019-12-06 14:40:12
        endTime: '' // 结束时间，如：2019-12-06 14:40:12
      },
      articlesList: [],
      Upload_File: Upload_File
    }
  },
  created() {
    this.fetchCategory()
  },

  methods: {
    dateChangeBeginTime(start) {
      if (!start) {
        this.ruleForm.beginTime = ''
        return
      }
      this.ruleForm.beginTime = start
      this.fetchCategory()
    },
    dateChangeEndTime(end) {
      if (!end) {
        this.ruleForm.endTime = ''
        return
      }
      this.ruleForm.endTime = end
      this.fetchCategory()
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
        title: this.ruleForm.title,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        beginTime: this.ruleForm.beginTime || '',
        endTime: this.ruleForm.endTime || '',
        status
      }
      getArticleList(data).then(res => {
        debugger
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.articlesList = res.data.data.records
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
        path: '/articleManager/articleAdd'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/articleManager/articleEdit',
        query: {
          id: row.uuid
        }
      })
    },

    changeStatus(uuid, status) {
      getArticleDetail(uuid).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        const data = res.data.data
        data.status = status
        editArticle(data).then(res => {
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
      deleteArticle(id).then(res => {
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
