<template>
    <div class="main-content">
        <div></div>
        <div class="left-content">
            <div class="item">
                <img src="@/assets/index/line.png" >
                <Tooltip content="点击查看LOREAL品牌故事" placement="top">
                    <a href="https://www.lorealparis.com.cn/BrandStory/AboutLorealParis.loreal" class="item-a" target="_blank">
                        <img src="@/assets/brand/logo-loreal.jpg" >
                    </a>
                </Tooltip>
                <div style="margin-left:50px;">
                    <p>创办于<span style="font-size:24px; font-weight: bold;">1907</span>年</p>
                    <p>法国化妆品公司</p>
                </div>
            </div>

            <div class="item">
                <img src="@/assets/index/line.png" >
                <Tooltip content="点击查看LANCOME品牌故事" placement="top">
                    <a href="https://www.lancome.com.cn/landingpage/join-us" class="item-a" target="_blank">
                        <img src="@/assets/brand/logo-lancome.jpg" style="width:500px;">
                    </a>
                </Tooltip>
                <div style="margin-left:50px;">
                    <p>创办于<span style="font-size:24px; font-weight: bold;">1935</span>年</p>
                    <p>法国化妆品公司</p>
                </div>
            </div>

            <div class="item">
                <img src="@/assets/index/line.png" >
                <Tooltip content="点击查看LAMER品牌故事" placement="top"> 
                    <a href="https://www.lamer.com.cn/brand-story" target="_blank">
                        <img src="@/assets/brand/logo-lamer2.jpg" >
                    </a>
                </Tooltip>
                <div style="margin-left:50px;">
                    <p>创办于<span style="font-size:24px; font-weight: bold;">1946</span>年</p>
                    <p>美国化妆品公司</p>
                </div>
            </div>

            <div class="item">
                <img src="@/assets/index/line.png" >
                <Tooltip content="点击查看SKI-II品牌故事" placement="top">
                    <a href="https://www.skii.com.cn/sc/the-miracle-of-pitera.aspx" class="item-a" target="_blank">
                        <img src="@/assets/brand/logo-ski.jpg">
                    </a>
                </Tooltip>
                <div style="margin-left:50px;">
                    <p>创办于<span style="font-size:24px; font-weight: bold;">1980</span>年</p>
                    <p>日本化妆品公司</p>
                </div>
            </div>
            <div style="margin-left:1000px;font-size:25px;padding-bottom:20px;">等...</div>
            
        </div>
    </div>
</template>
<script>
    export default{
    }
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.main-content{
    width: 100%;
    
}
.left-content{
    width:@win-width-xmin;
    margin: 0 auto;
    min-height: 1080px;
    background-size:100% 100%;
    
    .item{
        margin: 0 auto;
        width:@win-width-xxmin;
        // background-color: aquamarine;
        height: 500px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
            p{
                font-size: 18px;
            }
        .item-a{
            display: flex;
            flex-direction: row;
            align-items: center;
           
        }
    }
}
</style>

