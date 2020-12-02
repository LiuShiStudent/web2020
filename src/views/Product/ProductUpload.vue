<template>
<!-- ref 获取当前组件的结构 -->
<!--/api/api: 第一个api代表我们跨域的地址 第二个api代表接口的地址  -->
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:3050/api/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="handleSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</template>

<script>
export default {
    data(){
        return{
            fileList:[]
        }
    },
    methods:{
        handlePreview(file){
            console.log(file)
        },
        handleRemove(file, fileList){
            console.log(file, fileList)
        },
        submitUpload(){
            this.$refs.upload.submit();
        },
        handleSuccess(response, file, fileList){
            console.log(response)
            //把response响应回去
            this.$emit("upload",response)
        }
    }
}
</script>

<style>

</style>