<template>
  <element-table
  :tableData="tableData">
      <!-- 产品列表数据 -->
      <el-table-column show-overflow-tooltip prop="id" label="商品ID" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="商品名称" width="200"></el-table-column>
      <el-table-column show-overflow-tooltip prop="image" label="商品图片" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点" width="300"></el-table-column>
      <el-table-column show-overflow-tooltip prop="price" label="商品价格" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="num" label="商品数量" width="100"></el-table-column>
      <el-table-column show-overflow-tooltip prop="descs" label="商品描述">
          <template slot-scope="scope">
              <div v-html="scope.row.descs"></div>
          </template>
      </el-table-column>
      <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
  </element-table>
</template>

<script>
import api from "../../api";
import ElementTable from '../../components/element-table/ElementTable'
export default {
    data() {
        return {
            tableData: [],
        };
    },
    components:{
        ElementTable
    },
    mounted() {
        //在生命周期里面一进入就刷新页面
        this.http(1);
        this.$bus.$on("page", (val) => {
            this.http(val);
        });
        this.$bus.$on("searchData",data =>{
            this.tableData = data
        });
        //接收ProductNav传递的数据
        this.$bus.$on("searchData",data=>{
            this.tableData = data
        });
        this.$bus.$on("onRef",data=>{
            this.http(1)
        })
    },
    methods: {
        http(page) {
            //开启loading 拿到数据的时候关闭loading
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            api.getSelectTbItemAllByPage({
                page,
            }).then((res) => {
                this.tableData = res.data;
                 loading.close();
            });
        },
        // 修改事件 需要调用预更新事件 瞅瞅之前有人传入数据没有
        handleEdit(index,row){
            // console.log(row)
            // api.preUpdateItem({
            //     id:row.id
            // })
            // .then(res=>{
            //     console.log(res.data)
            // })
            //把id传过去
            this.$bus.$emit("onEditor",row)
        },

        //删除事件
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    api.deleteProduct({
                        id: row.id,
                    }).then((res) => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.http(1); // 刷新页面
                        } else {
                            this.$message({
                                type: "error",
                                message: "删除失败!",
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
};
</script>

<style>
    .all {
    float: left;
    margin-top: 10px;
}
</style>