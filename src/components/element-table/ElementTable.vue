<template>
  <el-table 
    :data="tableData" 
    style="width:100%" 
    :header-cell-style="{background:'#eef1f6', color:'#606266'}"
  >
      <slot></slot>
  </el-table>
</template>

<script>
export default {
    props:{
        tableData:{
            type:Array,
            default:function(){
                return[]
            }
        }
    }
}
</script>

<style>

</style>