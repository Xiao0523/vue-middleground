<template>
  <div class="pageBox">
    <el-pagination
      v-if="isShow"
      :current-page="currentPage"
      :page-sizes="[5,10,50,100,200,300,400,500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { setSession, getSession } from '@/utils/session'
export default {

  components: {},
  props: {
    // 当前页
    currentPage: {
      type: Number
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default() {
        return []
      }
    },
    // 每页显示条目个数
    pageSize: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  watch: {
    total(val) {
      console.log('total', val)
      if (val != 0) {
        this.isShow = true
      }
    }
  },
  mounted() {

  },
  updated() {
    console.log('分页组件', this.currentPage)
    console.log('分页组件', this.pageSize)
  },
  created() {
  },
  methods: {
    handleSizeChange(val) {
      setSession('currentSize', val)
      const currentSize = getSession('currentSize')
      this.$emit('sizeChange', currentSize)
    },
    handleCurrentChange(val) {
      setSession('currentPage', val)
      const currentPage = getSession('currentPage')
      this.$emit('currentChange', currentPage)
    }
  }
}

</script>
<style lang="scss" scoped>
  .pageBox{
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
