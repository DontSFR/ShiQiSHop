<template>
        <div class="left-content">
            <Carousel v-model="value1" loop style="width:100%;height:500px;margin-top:20px">
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="@/assets/index/test01.jpg" alt="">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="@/assets/index/test02.jpg" alt="">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="@/assets/index/test03.jpg" alt="">
                    </div>
                </CarouselItem>/
            </Carousel>
        </div>
</template>
<script>
import mySpecial from '@/components/mainPage/mySpecial.vue'
import myNewbook from '@/components/mainPage/myNewbook.vue'
import myRecommend from '@/components/mainPage/myRecommend.vue'
    export default{
        components: {mySpecial,myNewbook,myRecommend},
        data () {
            return {
                value1: 0
            }
        },
    }
</script>
<style lang="less" scoped>
@import "~@/style/basic.less";
.left-content{
    width:@win-width-xmin;
    margin: 0 auto;
    min-height: 1251px;
    // height: 100%;
    // float: left;
    // background: url("~@/assets/index/center_bg_1.png") repeat-y;
    background-size:100% 100%;
    img{
        width: 100%;
    }
}
</style>

