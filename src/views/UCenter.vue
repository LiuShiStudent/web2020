<template>
  <div class="u-center">
    <p>个人中心</p>
    <el-button type="text" @click="dialogVisible = true">查看合同</el-button>
    <el-dialog
      title="合同样本"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
        >
     <div class="parent">
        <pdf
            ref="pdf"
            :src="src"
            :page="currentPage"
            @progress="getProgress"
            @page-loaded="currentPage = $event"
            @loaded="loadPdfHandler"
        >
        </pdf>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
import pdf from 'vue-pdf'
var loadingTask = pdf.createLoadingTask("./sxt.pdf");
export default {
    data() {
      return {
        dialogVisible:false,
        currentPage: 1,
        pageCount: 1,
        src:"loadingTask"
      }
    },
   components: {
    pdf
  },
  methods:{
    getProgress(){

    },
    loadPdfHandler(){

    },
    handleClose(){
      this.dialogVisible=false;
    }
  }
}
</script>

<style>

</style>