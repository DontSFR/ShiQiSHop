<template>
    <div>
        <header>
            <div class="logo"><a><img src="~@/assets/index/logo.gif" alt="" title="" border="0" /></a></div>
        </header>        
    </div>
</template>
<style lang="less" scoped>
@import "~@/style/basic.less";
    header{
        width: @win-width-xmin;
        height: 170px;       
        margin: 0 auto; 
        background:url("~@/assets/index/header.png") no-repeat center;
        -moz-background-size:100% 100%; 
        background-size:100% 100%;
        .logo{
            padding:30px 0 0 250px;
        }
    }
</style>
