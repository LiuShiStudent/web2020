<template>
  <el-dialog
    title="编辑商品"
    :visible.sync="dialogEditorVisible"
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
            dialogEditorVisible: false,
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
            
        },
        
    },
    mounted(){
        //编辑显示
        this.$bus.$on("onEditor",row=>{
            //先显示对话框
            this.dialogEditorVisible=true;
            api.preUpdateItem({
                id:row.id
            }).then(res=>{
                console.log(res.data)
                 this.treeData={
                     name:res.data.result[0].cid
                 };
                 this.addForm = {
                    name:res.data.result[0].title,
                    sellPoint:res.data.result[0].sellPoint,
                    price:res.data.result[0].price,
                    num:res.data.result[0].num
                 },
                 this.editorData=res.data.result[0].descs
            })
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