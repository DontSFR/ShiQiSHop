<template>
    <div class="footer-container">
        <div class="logo">
            <a><img src="~@/assets/header/logo.png" alt="" title="" border="0" /></a>
        </div>
        <div class="line">
        </div>
        <div class="call">
            <p>联系我们：</p>
            <p>电话：158-5899-8615</p>
        </div>
        <div class="line">
        </div>
        <div class="call">
            <p>©拾柒美妆所有</p>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import "~@/style/basic.less";
    .footer-container{
        padding: 0 200px;
        width: 100%;
        height: 180px;       
        margin: 0 auto; 
        background-color: #ede8e5;
        -moz-background-size:100% 100%; 
        background-size:100% 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .logo{
            // padding:0;
            // width:@win-width-xxmin;
            // margin: 0 auto;
            // padding-left:50px;
            img{
                width:170px;
                height:170px;
            }
        }
        .line{
            
            height: 100px;     
            border-left: 2px solid #999;
        }
        .call{
            font-size: 17px;
            text-align: center;
        }
    }
</style>
