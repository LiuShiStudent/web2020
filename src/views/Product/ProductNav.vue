<template>
   <div class="head">
        <el-form ref="searchForm" :model="search" @submit.native.prevent>
            <el-form-item>
                <el-input
                    v-model="search.content"
                    @keyup.enter.native="onSubmitSearch"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 查询的是搜索的文本信息 -->
                <el-button type="primary" @click="onSubmitSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitAdd">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from '../../api'
export default {
    data(){
        return{
            search:{
                content:""
            }
        }
    },
    methods:{
        //模糊查询按钮
        onSubmitSearch(){
            api.getSearch({
                search:this.search.content
            }).then(res=>{
                console.log(res.data)
                this.$bus.$emit("searchData",res.data)
            })
        },
        //与ProductAdd是兄弟关系组件之间传递数据 用eventbus 另一个在生命周期函数里面接收
        onSubmitAdd(){
            this.$bus.$emit("ProductAddVisible",true)
        }
    }
}
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 1230px;
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>