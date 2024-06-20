<template>
  <div>
    <el-container>
      <el-aside style="width:200px;min-height: 100vh;background-color:#e6effb">
        <div style="height: 60px;  display: flex; align-items: center; justify-content: center">
          <img src="@/assets/logo.png" style="width: 30px;" alt="">
          <span class="logo-title" style="margin-left: 5px;font-size:20px">医疗服务系统</span>
        </div>
        <el-menu background-color="#e6effb" router :default-active="$route.path" style="border:none">

          <el-menu-item index="/home"><i class="el-icon-menu"></i> <span slot="title">系统首页</span></el-menu-item>
          <el-menu-item index="/office"><i class="el-icon-office-building"></i> <span slot="title">科室管理</span></el-menu-item>
          <el-menu-item index="/user"><i class="el-icon-user"></i> <span slot="title">用户管理</span></el-menu-item>
          <el-menu-item index="/doctor"><i class="el-icon-user"></i> <span slot="title">医生管理</span></el-menu-item>
          <el-menu-item index="/vwreservation"><i class="el-icon-time"></i> <span slot="title">预约管理</span></el-menu-item>
          <el-submenu index="">
            <template slot="title"><i class="el-icon-first-aid-kit"></i> <span>药品管理</span></template>
<!--            <el-menu-item index="/medicine"><span slot="title">药品管理</span></el-menu-item>-->
            <el-menu-item index="/jdmedicine">药品管理</el-menu-item>
<!--            <el-menu-item index="/vwmedicine">药单管理</el-menu-item>-->
            <el-menu-item index="/vwjdmedicine">药单管理</el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator="/" style="margin-left: 10px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="flex:1;width: 0;display: flex;align-items: center;justify-content: flex-end">
            <el-dropdown>
              <div style="display: flex;align-items: center;justify-content: flex-end">
                <span class="el-dropdown-link"> {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>  </span>
              </div>
              <el-dropdown-menu slot="dropdown">
<!--                <el-dropdown-item>个人信息</el-dropdown-item>-->
<!--                <el-dropdown-item>修改密码</el-dropdown-item>-->
<!--                <el-dropdown-item >退出登录</el-dropdown-item>-->
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>


  </div>


</template>

<script>


export default {
  name: 'Manager',
  data() {
    return {
      user:JSON.parse(localStorage.getItem('user')||'{}') ,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    }, handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.el-menu--inline .el-menu-item {
  background-color: #ebebff !important;
}

.el-menu-item:hover, .el-submenu__title:hover {
  color: #637caf !important;
}

.el-submenu__title:hover i {
  color: #fff !important;
}

.el-menu-item:hover i {
  color: #fff !important;
}

.el-menu-item.is-active {
  background-color: rgb(43, 70, 146) !important;
  border-radius: 5px !important;
  width: calc(100% - 8px);
  margin-left: 4px;
}

.el-menu-item.is-active i, .el-menu-item.is-active .el-tooltip {
  margin-left: -4px;
}

.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu .el-menu-item {
  min-width: 0 !important;
}

.el-menu--inline .el-menu-item.is-active {
  padding-left: 45px !important;
}

.el-aside {
  transition: width .3s;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
}

.el-header {
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>