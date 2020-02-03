<template>
  <div class="input-search">
    <p class="searchBody">
      <Input v-model="searchName" class="serach-input" /><Button type="primary" @click="searchLampPole" shape="circle" icon="ios-search"></Button>
    </p>
  </div>
</template>
<script>
export default {
  // name: 'inputSearch',
  data () {
    return {
      searchName: '',
    }
  },
  watch: {
    // drawerStart (t) {
    //   this.$emit('drawerShow', t)
    // }
  },
  methods: {
    searchLampPole () {
      this.$router.push({path:'/search',query:{keyword:this.searchName}})
    }
  }
}
</script>

<style lang="less" scoped>
.input-search {
    height: 50px;
    padding: 18px 0;
    width: 100%;
  .searchBody {
    width: 80%;
    margin: 0 auto;
    line-height: 32px;
    .serach-input{
      width: 240px;
      margin-right: 10px;
    }
    // /deep/.ivu-input:hover{
    //   border-color: #f7a849;
    // }
    // /deep/.ivu-input-search {
    //     cursor: pointer;
    //     padding: 0 16px!important;
    //     background: #f7a849 !important;
    //     color: #fff!important;
    //     border-color: #f7a849 !important;
    //     transition: all .2s ease-in-out;
    //     position: relative;
    //     z-index: 2;
    // }
    // /deep/.ivu-input-search:hover{
    //     border-color: #f7a849;
    // }
    
  }
}
</style>
