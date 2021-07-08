<template>
  <Card>
    <p slot="title">基本信息</p>
    <Form ref="addDeviceTypeRef"
          :model="deviceTypeFormData"
          :rules="addDeviceTypeRules"
          :label-width="110">
      <Row>
        <Col span="12">
        <FormItem label="设备型号名称"
                  prop="name">
          <Input v-model="deviceTypeFormData.name"
                 placeholder="请输入设备型号名称"></Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="厂商全称"
                  prop="vendorId">
          <Select v-model="deviceTypeFormData.vendorId"
                  placeholder="请选择厂商">
            <Option v-for="(item) in vendorList"
                    :key="item.id"
                    :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="通讯规约"
                  prop="txgyId">
          <Select v-model="deviceTypeFormData.txgyId"
                  placeholder="请选择通讯规约"
                  @on-change="changTxgyVersion()">
            <Option v-for="(item) in txgyList"
                    :key="item.id"
                    :value="item.id">
              {{item.name}}
            </Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="规约版本"
                  prop="version">
          <Input v-model="deviceTypeFormData.version"
                 readonly></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="设备电压"
                  prop="dy">
          <Input v-model="deviceTypeFormData.dy"
                 placeholder="请输入设备电压">
          <span slot="append">V</span></Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="设备分辨力"
                  prop="fbl">
          <Input v-model="deviceTypeFormData.fbl"
                 placeholder="请输入设备分辨力">
          <span slot="append">cm</span></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="设备量程"
                  prop="lc">
          <Input v-model="deviceTypeFormData.lc"
                 placeholder="请输入设备量程">
          <span slot="append">cm</span></Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="通讯方式"
                  prop="txfs">
          <!-- <Input v-model="deviceTypeFormData.txfs"
                   placeholder="请输入通讯方式"></Input> -->
          <Select v-model="deviceTypeFormData.txfs"
                  multiple>
            <Option value="2G">2G</Option>
            <Option value="3G">3G</Option>
            <Option value="4G">4G</Option>
            <Option value="5G">5G</Option>
            <Option value="NB-IoT">NB-IoT</Option>
            <Option value="LoRa">LoRa</Option>
            <Option value="北斗">北斗</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="
                    12">
        <FormItem label="维保期"
                  prop="wbq">
          <Input v-model="deviceTypeFormData.wbq"
                 placeholder="请输入维保期"></Input>
        </FormItem>
        </Col>
      </Row>
      <FormItem label="备注"
                prop="bz">
        <Input v-model="deviceTypeFormData.bz"
               type="textarea"
               :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入备注"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary"
                @click="saveDeviceType()">提交</Button>
        <Button @click="cancelConfirm()"
                style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import {
  getVendorList,
  getTxgyList,
  updateDeviceType,
  getDeviceTypeById
} from '../api/deviceTypeApi'
export default {
  name: 'deviceTypeUpdate',
  data () {
    return {
      addDeviceTypeRules: {
        name: [
          { required: true, message: '请输入设备型号名称', trigger: 'blur' }
        ],
        vendorId: [
          { required: true, message: '请选择厂商', trigger: 'change', type: 'number' }
        ],
        txgyId: [
          { required: true, message: '请选择通讯规约', trigger: 'change', type: 'number' }
        ]
      },
      deviceTypeFormData: {
        id: '',
        name: '',
        vendorId: '',
        txgyId: '',
        version: '',
        dy: '',
        fbl: '',
        lc: '',
        txfs: [],
        wbq: '',
        bz: ''
      },
      vendorList: [],
      txgyList: []
    }
  },
  created () {
    this.deviceTypeFormData.id = this.$route.params.id
    this.getAllVendor()
    this.getAllTxgy()
    this.getDeviceTytpeData()
  },
  methods: {
    // 获取所有厂商数据
    getAllVendor () {
      getVendorList().then(resp => {
        this.vendorList = resp.data
      })
    },
    // 获取所有通讯规约数据
    getAllTxgy () {
      getTxgyList().then(resp => {
        this.txgyList = resp.data
      })
    },
    // 根据通讯规约改变规约版本
    changTxgyVersion () {
      this.txgyList.forEach((item) => {
        if (item.id === this.deviceTypeFormData.txgyId) {
          this.deviceTypeFormData.version = item.version
        }
      })
    },
    // 点击提交按钮，新增设备型号
    saveDeviceType () {
      this.$refs.addDeviceTypeRef.validate(validate => {
        if (validate) {
          let params = {}
          for (const key in this.deviceTypeFormData) {
            if (this.deviceTypeFormData.hasOwnProperty(key)) {
              if (key === 'txfs') {
                params[key] = this.deviceTypeFormData[key].join(',')
              } else {
                params[key] = this.deviceTypeFormData[key]
              }
            }
          }
          updateDeviceType(params).then(resp => {
            if (resp) {
              this.$Message.success('编辑成功')
              this.$refs.addDeviceTypeRef.resetFields()
              this.$router.push({
                name: 'deviceTypeManager'
              })
            } else {
              this.$Message.error('编辑失败')
            }
          })
        } else {
          this.$Message.error('请填写完整')
        }
      })
    },
    // 根据id获取设备类型信息，数据回显示
    getDeviceTytpeData (params) {
      getDeviceTypeById({ id: this.deviceTypeFormData.id }).then(resp => {
        this.deviceTypeFormData = resp.data
        this.deviceTypeFormData.txfs = resp.data.txfs.split(',')
        this.changTxgyVersion()
      })
    },
    // 点击取消按钮
    cancelConfirm () {
      this.$Modal.confirm({
        title: '提示',
        content: '是否退出数据操作',
        onOk: () => {
          this.$router.push({
            name: 'deviceTypeManager'
          })
          this.$Message.info('取消编辑')
        },
        onCancel: () => {
        }
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
