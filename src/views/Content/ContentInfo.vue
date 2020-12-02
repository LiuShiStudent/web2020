<template>
  <div class="content-info">
    <el-table
      :tabledata="tabledata"
    >
    <el-table-column label="ID" prop="id" width="100"></el-table-column>
    <el-table-column label="PID" prop="pid" width="100"></el-table-column>
    <el-table-column label="名字" prop="name" width="300"></el-table-column>

    </el-table>
  </div>
</template>

<script>
import api from '../../api'
export default {
  data(){
    return{
      tabledata:[]
    }
  },
  methods:{

  },
  mounted(){
     this.$bus.$on("contentInfo",data=>{
      api.selectTbContentAllByCategoryId({
        pid:data.pid
      }).then(res=>{
        console.log(res.data)
        this.tabledata=res.data.result
      })
     })
    
  }
}
</script>

<style>

</style>