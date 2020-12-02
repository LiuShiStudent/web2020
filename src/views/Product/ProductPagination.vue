<template>
  <div>
    <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '../../api'
export default {
    name:"ProductPagination",
    data(){
        return{
            currentPage:1,
            total:0
        }
    },
    methods:{
        handleSizeChange(){

            },
        handleCurrentChange(val){
            console.log(val)
            //子父级互传 用eventbus.js val是发送的数据 然后父级接收数据在生命周期里面接收
            this.$bus.$emit("page",val)
        }
    },
   mounted(){
       api.getTotal().then(res=>{
           console.log(res.data)
           this.total = res.data.result[0]['count(*)']
       })
   }
}
</script>

<style scoped>
    .block{
        margin-top:30px;
    }
</style>