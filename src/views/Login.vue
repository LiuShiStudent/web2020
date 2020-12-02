<template>
    <div class="login-container">
        <el-tabs
            v-model="activeName"
            type="border-card"
            class="login-tabs"
            stretch
            @tab-click="handleClick"
        >
            <el-tab-pane label="用户登陆" name="login">
                <el-form
                    ref="loginForm"
                    :model="user"
                    status-icon
                    :rules="rules"
                    class="login-form"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            type="text"
                            v-model="user.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="user.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('loginForm')"
                            >登陆</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="register">
                <el-form
                    ref="registerForm"
                    :model="user"
                    status-icon
                    :rules="rules"
                    class="login-form"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            type="text"
                            v-model="user.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="user.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="surePassword">
                        <el-input
                            type="password"
                            v-model="user.surePassword"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitRegForm('registerForm')"
                            >注册</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import api from "../api";
import jwt from "jwt-decode";
import { mapMutations } from "vuex";

export default {
    name: "Login",
    data() {
        var validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            }
            if (value.length <= 3) {
                callback(new Error("长度不够"));
            }
            callback();
        };
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        var validateSurePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        var validateEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入邮箱"));
            }
            callback();
        };
        return {
            activeName: "login",
            user: {
                username: "",
                password: "",
                surePassword: "",
                email: "",
            },
            rules: {
                //blur失去焦点触发
                username: [{ validator: validateUsername, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }],
                surePassword: [
                    { validator: validateSurePassword, trigger: "blur" },
                ],
                email: [{ validator: validateEmail, trigger: "blur" }],
            },
        };
    },
    methods: {
        ...mapMutations("loginModule", ["setUser"]),
        handleClick(tab) {
            console.log(tab.name);
        },
        // 登陆按钮
        submitForm() {
            console.log(this.user.username)
            console.log(this.user.password)
            api.getLogin({
                 username: this.user.username,
                 password: this.user.password,
            }).then(res=>{
                console.log(jwt(res.data))
                if(res.status === 200){
                    this.setUser({
                            username: jwt(res.data).username,
                            token: res.data,
                        });
                    //如果登录成功回到首页
                    //登录成功同时 还得将数据储存到本地
                    localStorage.setItem("ego",res.data)
                    this.$router.push('/') 
                }
                //iat创建时间
            })
            .catch((error) => {
                    this.$message({
                        message: error.data.errors,
                        type: "error",
                    });
                });
            // if (this.activeName === "login") {
            //     // 登陆
            // } else {
            //     // 注册
            // }

            // api.getLogin({
            //     username: this.user.username,
            //     password: this.user.password,
            // })
            //     .then((res) => {
            //         if (res.status === 200) {
            //             console.log(res.data)
            //             this.setUser({
            //                 username: jwt(res.data).username,
            //                 token: res.data,
            //             });
            //             // 写入本地数据
            //             localStorage.setItem("ego", res.data);
            //             this.$router.push("/");
            //         }
            //     })
            //     .catch((error) => {
            //         this.$message({
            //             message: error.data.errors,
            //             type: "error",
            //         });
            //     });
        },
        // 注册按钮
        submitRegForm() {
            api.getRegister({
                username: this.user.username,
                password: this.user.password,
                email: this.user.email,
            })
                .then((res) => {
                    if (res.status === 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success",
                        });
                    }
                })
                .catch((error) => {
                    this.$message({
                        message: error.data.msg,
                        type: "error",
                    });
                });
        },
    },
};
</script>

<style scoped lang="less">
.login-container {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    .login-form {
        padding: 40px 40px;
    }
    h3 {
        margin-top: 20px;
    }
    .login-tabs {
        border-radius: 5px;
    }
}
</style>