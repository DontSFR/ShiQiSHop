<template>
    <div  class="form center">
        <div class="container-login" >
            <div class="wrap-login">
                <div class="login-form">
                    <span class="title">登录</span>
                    <div class="wrap-input" data-validate="请输入邮箱">
                        <span class="label-input">邮箱：</span>
                        <input class="input" type="text" v-model="form.email" placeholder="请输入邮箱" autocomplete="off">
                        <Icon class="icon" type="md-mail" size='22'color='#448CBB' />
                    </div>
                    <div class="wrap-input validate-input " data-validate="请输入密码">
                        <span class="label-input">密码：</span>
                        <input class="input" type="password" v-model='form.password' placeholder="请输入密码">
                        <Icon class="icon" type="md-unlock" size='22'color='#448CBB' />
                    </div>
                    <div class="text-right">
                        <!-- <a>忘记密码？</a> -->
                    </div>
                    <div class="container-login-btn">
                        <a class="login-btn"  @click="submit">登 录</a>
                    </div>
                    <div class="container-regist">
                        <router-link to='/regist'>
                            立即注册
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                email:'',
                password:''
            }
        }
    },methods:{
        submit () {
            if (this.form.email && this.form.password) {
                this.$ajax({
                method: 'post',
                url: '/user/login',
                dataType:'json',
                isFormData:true,
                data: {
                    ...this.form,
                }
                }).then(res => {
                    if(res.code===200){
                        this.$cookies.set('userId', res.res.userId)
                        this.$router.push({path: '/index'})//登录成功后跳转到指定页面
                    }else{
                        this.$Notice.error({
                            title:res.reason
                        })
                    }
                })
            } else {
                this.$Notice.error({
                title: '请填写账号与密码！'
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .container-login{
        width: 100%;
        margin: 0 auto;
        padding:10% 2%;
        display: flex;
        background: url('../assets/header/bg-01.jpg') no-repeat center;
        -moz-background-size:100% 100%; 
        background-size:100% 100%;
        overflow: hidden;
        .wrap-login{
            width: 500px;
            background: #fff;
            border-radius: 10px;
            vertical-align: middle;
            overflow: hidden;
            margin: 0 auto;
            height: 70%;
            // margin:45px 55px;
            .login-form{
                margin: 45px 55px;
                .title{
                    display: block;
                    font-family: 'Microsoft Yahei';
                    font-size: 39px;
                    color: #333333;
                    line-height: 1.2;
                    text-align: center;
                    padding-bottom: 23px;
                }
                .wrap-input {
                    width: 100%;
                    position: relative;
                    border-bottom: 2px solid #d9d9d9;
                }
                .icon{
                    position:absolute;
                    top: 40px;
                    left: 10px;
                }
                .label-input{
                    font-family: 'Microsoft Yahei';
                    font-size: 14px;
                    color: #333333;
                    line-height: 1.5;
                    padding-left: 7px;
                }
                .input{
                    font-family: 'Microsoft Yahei';
                    font-size: 16px;
                    color: #333333;
                    line-height: 1.2;
                    display: block;
                    width: 100%;
                    height: 55px;
                    background: transparent;
                    padding: 0 7px 0 43px;
                    border-width: 0;//去除不点击时的边框
                    outline:none;//去除点击时的默认边框
                }
                .text-right{
                    display: flex;
                    padding-top:8px;
                    padding-bottom:25px;
                    font-size: 14px;
                    margin-left: 68%; 
                }
                .container-login-btn {
                    border-radius: 25px;
                    background:url('../assets/header/bg-01.jpg');
                    display: flex;
                    flex-wrap: wrap;
                    height: 45px;
                    justify-content: center;
                    overflow: hidden;
                    margin: 0 auto;
                }
                .login-btn{
                    font-family: 'Microsoft Yahei';
                    font-size: 16px;
                    color: #fff;
                    line-height: 1.2;
                    text-transform: uppercase;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 20px;
                    width: 100%;
                    height: 50px;
                }
                .container-regist{
                    padding-top: 25px;
                    font-size: 14px;
                    margin-left: 70%; 
                }
                .container-regist a{
                    text-align: center;
                }
            }
            
        }
    }
</style>


 