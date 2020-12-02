export default{
    namespaced:true,
    state:{
        user:{
            username:"",
            token:""
        }
    },
    mutations:{
        //mutations里面把数据尽量转成对象
        //添加用户数据方法 然后直接调用就可以 
        setUser(state,user){
            state.user = {
                username:user.username,
                token:user.token
            }
        },
        //清空数据方法
        clearUser(state){
            state.user ={
                username:"",
            }
        }
    }
}