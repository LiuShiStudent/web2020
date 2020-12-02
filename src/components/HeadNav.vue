<template>
  <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
        <el-menu-item index="/"><i class="el-icon-menu"></i>商品管理</el-menu-item>
        <el-menu-item index="/params"><i class="el-icon-document"></i>规格参数</el-menu-item>
        <el-menu-item index="/content"><i class="el-icon-setting"></i>内容分类管理</el-menu-item>
        <div class="user">
            <router-link to="/ucenter" tag="span" class="user-name">{{user.username}}</router-link>
            <el-button class="logout" @click="logoutHandle">退出</el-button>
        </div>
   </el-menu>
</template>

<script>
//mapState从仓库里面读取数据 并且在computed里面接收数据
//mapMutations从仓库里面读取方法 并且将读取的方法写在methods里面
import {mapState,mapMutations} from "vuex"
export default {
  name:"HeadNav",
  data(){
    return{
      //高亮
      activeIndex:"/"
    }
  },
  computed:{
    ...mapState("loginModule",{
      user:state=>state.user
    })
  },
  methods:{
    ...mapMutations("loginModule",["clearUser"]),
    handleSelect(){},
    logoutHandle(){
      //退出登录把vuex的数据清空就可以
      this.clearUser();  
      //退出登录跳到登录页面
      //退出登陆时，清空本地数据
      localStorage.removeItem("ego");
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped lang="less">
.user {
    float: right;
    margin-right: 20px;
    line-height: 60px;
    .user-name {
        color: #fff;
        margin-right: 10px;
        font-size: 15px;
        border: 1px solid #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
    }
    .logout {
    }
}

.set-lang {
    float: right !important;
}

.el-dropdown-link {
    color: #fff;
}
</style>