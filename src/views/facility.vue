<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal"
              theme="dark"
              active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
            </MenuItem>
            <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
            </MenuItem>
            <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            Item 3
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider ref="side1"
               hide-trigger
               collapsible
               :collapsed-width="78"
               v-model="isCollapsed">
          <Menu active-name="1-1"
                theme="dark"
                width="auto"
                :class="menuitemClasses">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper" />
                设备管理
              </template>
              <MenuItem name="1-1"
                        to="/facility/vendorManager">厂商管理</MenuItem>
              <MenuItem name="1-2"
                        to="/facility/deviceTypeManager">设备型号管理</MenuItem>
              <MenuItem name="1-3"
                        to="/facility/helloWorld">设备列表</MenuItem>
              <MenuItem name="tencentClouds"
                        to="/facility/tencentClouds">云服务器管理
              </MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-people" />
                用户管理
              </template>
              <MenuItem name="2-1">新增用户</MenuItem>
              <MenuItem name="2-2">活跃用户</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-stats" />
                统计分析
              </template>
              <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
              </MenuGroup>
              <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
              </MenuGroup>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <Header :style="{padding: 0}"
                  class="layout-header-bar">
            <Icon @click.native="collapsedSider"
                  :class="rotateIcon"
                  :style="{margin: '0 20px'}"
                  type="md-menu"
                  size="24"></Icon>
          </Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '776px'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
// import tencentClouds from '@/components/tencentClouds'
export default {
  name: 'facility',
  // components: { tencentClouds },
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    }
  }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  /* margin-right: 20px; */
  margin-left: 20px;
  float: left;
}
.layout-footer-center {
  text-align: center;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
