<template>
  <el-tree
    highlight-current
    :props="defaultProps"
    :load="loadNode"
    lazy
    show-checkbox
    @node-click="handleNodeClick">
</el-tree>
</template>

<script>
import api from '../../api'
export default {
    data(){
        return{
            defaultProps:{
                children:"children",
                label: 'name',
            }
        }
    },
    methods:{
        //异步处理事件 第一次请求和非第一次请求 第一次请求加载第一页

        //第一层级处理
        //节点等于0时 代表第一次请求数据
        loadNode(node, resolve){
            if (node.level === 0) {
                api.getSort().then((res)=>{
                    console.log(node)
                    console.log(res.data)
                    if(res.data.status===200){
                        //如果数据接口显示成功 返回数据
                        return resolve(res.data.result)
                    }else{
                        return resolve([])
                    }
                })
            }
            
            if(node.level>=1){
                console.log(node)
               api.getSort({
                   id:node.data.cid
               }).then(res=>{
                   if(res.data.status===200){
                        //如果数据接口显示成功 返回数据
                        return resolve(res.data.result)
                    }else{
                        return resolve([])
                    }
               })
                //懒加载 一直转的时候 要是没有空数据 会停下来的
               .catch((error)=>{
                   resolve([])
               });
            }
            
        },
        handleNodeClick(data){
            console.log(data)
            //通过子传父 将数据data返回
            this.$emit('treeData',data)
        }

    }
}
</script>

<style>

</style>