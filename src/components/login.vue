<template>
  <div class="login">
    <div class="login-dialog">
      <h2 class="sys-title">后台管理系统</h2>
      <el-input placeholder="用户名"  v-model="userName"   class="login-input" clearable></el-input>
      <el-input placeholder="密码" class="login-input" v-model="password" show-password></el-input>
      <div class="login-input"><el-button type="primary" @click="login">登 录</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userName:"admin",
      password:'123456',
      extendsRoutes: [{
      path: '/',
      component: resolve => require(['@/components/home'], resolve),//懒加载
      children:[
        {
          path:"/user",
          name:'user',
          component:resolve=>require(['@/components/user/user'], resolve),
          meta:{
            text:"用户管理",
            icon:"el-icon-setting"
          }
        },
        {
          path:"/order",
          name:'order',
          component:resolve=>require(['@/components/order/order'], resolve),
           meta:{
            text:"订单管理",
            icon:"el-icon-document"
          }
        },
        {
          path:"/menu",
          name:'menu',
          component:resolve=>require(['@/components/menu/menu'], resolve),
          meta:{
            text:"菜单管理",
            icon:"el-icon-menu"
          }
        }
        
      ]
    }]
    }
  },
  created(){

  },
  methods:{
    login(){
      console.log(this.userName,this.password)
      // this.$router.addRoutes(this.extendsRoutes);
      // sessionStorage.setItem('userRouter',JSON.stringify(this.extendsRoutes))
      console.log(this.$router)
   
      let params={
        username:this.userName,
        password:this.password
      }
      this.$axios.post('/ajaxLogin',params).then(res=>{
        console.log(res)
        this.$router.push({name:"user"})
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sys-title{
    position: relative;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin:24px 0;
    font-size: 24px;
  }
</style>
