<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialogAddVisible"
    width="80%"
    :before-close="handleClose"
  >
  <!--ref点击按钮获取当前输入框的对象 -->
    <el-form
        label-width="70px"
        :label-position="labelPosition"
        :model="addForm"
        ref="ruleForm"
    >
         <el-form-item label="商品类目">
                <el-button class="category" type="primary" @click="dialogCategoryVisible=true">类目选择</el-button>
                <span class="category">{{treeData.name}}</span>
                <el-dialog
                    width="50%"
                    title="类目选择"
                    :visible.sync="dialogCategoryVisible"
                    append-to-body
                >
                <ProductTree @treeData="getTreeData"/>
                <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="getCategoryDataHandle">确 定</el-button>
                    </span>
                </el-dialog>
         </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="addForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input v-model="addForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-button class="category" type="primary" @click="dialoguploadVisible=true">图片上传</el-button>
                <el-dialog
                    width="50%"
                    title="上传图片"
                    :visible.sync="dialoguploadVisible"
                    append-to-body>
                    <ProductUpload @upload="getUpload"/>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
                <!-- 富文本编辑器 -->
                 <ProductWangEditor @onEditor="getEditor" />
            </el-form-item>
            
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureSubmit">确 定</el-button>
    </span>
</el-dialog>

</template>

<script>
import ProductWangEditor from './ProductWangEditor'
import ProductUpload from './ProductUpload'
import ProductTree from './ProductTree'
import api from '../../api'
export default {
    data(){
        return{
            //对话框是否关闭
            dialoguploadVisible:false,
            dialogAddVisible: false,
            labelPosition:"left",
            dialogCategoryVisible:false,
            addForm:{
                name:"",
                sellPoint:"",
                price:"",
                num:""
            },
            initForm:{},
            treeData:{}
        }
    },
    components:{
        ProductWangEditor,
        ProductUpload,
        ProductTree
    },
    methods:{
        handleClose(){
            this.dialogAddVisible=false 
        },
        getUpload(data){
            console.log(data)
            this.dialoguploadVisible = false
        },
        getCategoryDataHandle(){
            this.dialogCategoryVisible=false
        },
        //获取类目选择数据
        getTreeData(data){
            console.log(data)
            this.treeData=data
        },

        getEditor(data) {
            this.editorData = data;
        },
        
        sureSubmit(){
            api.getInsertTbItem({
                title: this.addForm.name,
                cid: this.treeData.cid,
                sellPoint: this.addForm.sellPoint,
                price: this.addForm.price,
                num: this.addForm.num,
                desc: this.editorData,
            }).then(res=>{
                console.log(res.data)
                if(res.data.status===200){
                    this.dialogAddVisible = false;
                    this.$bus.$emit('onRef',true)
                  this.$message('添加成功')
                }else{
                    this.$message('添加失败')
                }
                
            })
        },
        
    },
    mounted(){
        this.$bus.$on("ProductAddVisible",flag=>{
            this.dialogAddVisible=flag
        })
    }
}
</script>

<style scoped lang="less">
    .category {
        float: left;
        margin-right: 20px;
    }
    .upload-img {
        width: 400px;
        float: left;
    }
</style>