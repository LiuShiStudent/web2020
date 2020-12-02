<template>
<div>
  <el-tree
     highlight-current
     :props="defaultProps"
     :load="loadNode"
     lazy
     show-checkbox
     @node-click="handleNodeClick">
  <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            增加子导航
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => update(node, data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
  </el-tree>
  <!-- 子导航添加对话框 -->
  <el-dialog
            title="添加子导航"
            :visible.sync="dialogAddNavVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form :model="navForm" ref="ruleForm">
                <el-form-item label="导航名字" prop="pass">
                    <el-input type="text" v-model="navForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddNavVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="sureAddNavHandle"
                    >添 加</el-button
                >
            </span>
   </el-dialog>

<!-- 修改子导航 -->
   <el-dialog
            title="修改子导航"
            :visible.sync="dialogUpdateNavVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form :model="navForm" ref="ruleForm">
                <el-form-item label="导航名字" prop="pass">
                    <el-input type="text" v-model="navForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateNavVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="sureUpdateNavHandle"
                    >修 改</el-button
                >
            </span>
   </el-dialog>
  </div>
</template>
  
<script>
import api from '../../api'
export default {
  name:"Content",
  inject: ["reload", "demo"],
  data(){
    return{
      dialogUpdateNavVisible:false,
      defaultProps:{
        label: 'name',
        children: 'zones'
      },
      dialogAddNavVisible:false,
      //增加导航数据
      navForm:{
        name:''
      },
      navContent:{

      }
    }
  },
  methods:{
    //因为这个函数没有 loadNode需要的参数 所以定义两个参数 level resolve
    http(level,resolve){
      api.selectContentCategoryByParentId(level)
      .then(res=>{
        //console.log(res)
        if(res.data.status === 200){
          return resolve(res.data.result)
        }else{
          return resolve([])
        }
      })
    },

    loadNode(node, resolve){
     
      if(node.level ===0 ){
        //第一次访问 调用组件
        this.http({
          id:1
        },resolve)
      }
      if(node.level >=1){
        //console.log(node)
        this.http({
          id:node.data.pid
        },resolve)
      }
    },
    handleClose(){
       this.dialogVisible=false;
    },
    handleNodeClick(node){
      console.log(node)
      this.$bus.$emit("contentInfo",node)
    },

    //添加子导航
    append(data) {
      console.log(data)
      this.dialogAddNavVisible =true;
      this.navContent=data
    },
    //修改
    update(node, data) {
            this.navContent = data
            this.dialogUpdateNavVisible = true;
        },
    
    //删除
    remove(node, data) {
      console.log(node,data)
      api.deleteContentCategoryById({
        pid:data.pid
      })
      .then(res=>{
        if(res.data.status===200){
          this.reload()
        }
      })
    }, 

    //点击添加按钮成功
    sureAddNavHandle(){
      api.insertContentCategory({
         pid:this.navContent.pid,
         name:this.navForm.name
      }).then(res=>{
        console.log(res)
        if(res.data.status === 200){
            this.dialogVisible=false;
            this.reload();
        }
      })
    },

    sureUpdateNavHandle(){
            api.updateContentCategory({
                pid:this.navContent.pid,
                name:this.navForm.name
            }).then(res =>{
                if(res.data.status === 200){
                    this.reload();
                }
            })
        },

  },
  mounted(){
    /**
     * 获取导航数据 将数据封装成一个函数 让其他组件方便调用
     */
    // api.selectContentCategoryByParentId()
    // .then(res=>{
    //   console.log(res)
    // })
  }
}
</script>

<style>

</style>