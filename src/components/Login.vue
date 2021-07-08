<template>
  <div class="login">
    <Form ref="formInline"
          :model="userData"
          :rules="ruleInline"
          inline>
      <FormItem prop="user">
        <Input type="text"
               v-model="userData.username"
               placeholder="用户名">
        <Icon type="ios-person-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password"
               v-model="userData.password"
               placeholder="密码"
               @on-enter="login(userData)">
        <Icon type="ios-lock-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary"
                @click="login(userData)">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { login } from '../api/tencentCloudsApi'
export default {
  data () {
    return {
      userData: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (params) {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          login(params).then(resp => {
            if (resp.data) {
              this.$Message.success('登录成功')
              this.$router.push(
                { name: 'facility' }
              )
            } else {
              this.$Message.error('用户名或密码错误')
              params.username = ''
              params.password = ''
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$Message.error('请填写用户名或密码')
        }
      })
    }
  }
}
</script>
<style>
.login {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
