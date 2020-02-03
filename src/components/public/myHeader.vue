<template>
    <div>
        <header>
            <div class="logo"><a><img src="~@/assets/logo.png" alt="" title="" border="0" /></a></div>
        </header>        
    </div>
</template>
<style lang="less" scoped>
@import "~@/style/basic.less";
    header{
        width: 100%;
        height: 170px;       
        margin: 0 auto; 
        -moz-background-size:100% 100%; 
        background-size:100% 100%;
        .logo{
            // padding:0;
            width:@win-width-xmin;
            margin: 0 auto;
            // padding-left:50px;
            img{
                width:170px;
                height:170px;
            }
        }
    }
</style>

