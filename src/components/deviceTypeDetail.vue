<template>
  <Card>
    <Tabs value="name1">
      <TabPane label="设备型号详细"
               name="name1">
        <List border>
          <Row>
            <Col span="8">
            <ListItem>设备型号名称：{{DeviceTypeDetailData.name}}</ListItem>
            </Col>
            <Col span="8">
            <ListItem>通讯规约：{{DeviceTypeDetailData.guiYueName}}</ListItem>
            </Col>
            <Col span="8">
            <ListItem>规约版本：{{DeviceTypeDetailData.version}}</ListItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <ListItem>设备电压：{{DeviceTypeDetailData.dy}}</ListItem>
            </Col>
            <Col span="8">
            <ListItem>设备分辨力：{{DeviceTypeDetailData.fbl}}</ListItem>
            </Col>
            <Col span="8">
            <ListItem>设备量程：{{DeviceTypeDetailData.lc}}</ListItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <ListItem>通讯方式：{{DeviceTypeDetailData.txfs}}</ListItem>
            </Col>
            <Col span="8">
            <ListItem>维保期：{{DeviceTypeDetailData.wbq}}</ListItem>
            </Col>
            <Col span="8">
            <ListItem>备注：{{DeviceTypeDetailData.bz}}</ListItem>
            </Col>
          </Row>
        </List>
      </TabPane>
      <TabPane label="关联厂商"
               name="name2">
        <List border>
          <ListItem>厂商全称：{{DeviceTypeDetailData.vendorName}}</ListItem>
          <ListItem>厂商简称：{{DeviceTypeDetailData.shortName}}</ListItem>
          <ListItem>厂商地址：{{DeviceTypeDetailData.address}}</ListItem>
          <ListItem>厂商联系人：{{DeviceTypeDetailData.linkman}}</ListItem>
          <ListItem>联系人电话：{{DeviceTypeDetailData.linkmanPhone}}</ListItem>
          <ListItem>厂商固话：{{DeviceTypeDetailData.phone}}</ListItem>
          <ListItem>备注：{{DeviceTypeDetailData.remark}}</ListItem>
        </List>
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>
import {
  getDeviceTypeDetail
} from '../api/deviceTypeApi'
export default {
  name: 'deviceTypDetail',
  data () {
    return {
      DeviceTypeDetailData: {
        id: '',
        name: '',
        dy: '',
        fbl: '',
        lc: '',
        txfs: '',
        wbq: '',
        bz: '',
        vendorName: '',
        shortName: '',
        address: '',
        linkman: '',
        linkmanPhone: '',
        phone: '',
        remark: '',
        guiYueName: '',
        version: ''
      }
    }
  },
  created () {
    this.DeviceTypeDetailData.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    // 获取设备类型信息以及关联的厂商信息
    getDetail () {
      getDeviceTypeDetail({ id: this.DeviceTypeDetailData.id }).then(resp => {
        this.DeviceTypeDetailData = resp.data
      })
    }
  }
}
</script>
<style scoped>
.paging {
  /* float: right; */
  margin-top: 10px;
}
.btn-group {
  margin-bottom: 10px;
}
/* Table中的 操作按钮样式*/
/deep/ .option-text {
  margin-left: 10px;
  color: #169aff;
  font-weight: 500;
}
/deep/ .option-text:after {
  content: "";
  display: inline-block;
  height: 12px;
  width: 1px;
  background: #e0e3e9;
  margin-left: 10px;
  top: 1px;
}
/deep/ .option-text:last-child:after {
  height: 0;
}
</style>
