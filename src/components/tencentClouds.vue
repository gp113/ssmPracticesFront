<template>
  <Card>
    <div>
      <Form :model="queryInfo"
            :label-width="100"
            inline>
        <Row>
          <Col span="4">
          <FormItem label="服务器名称">
            <Input v-model="queryInfo.name"
                   placeholder="请输入服务器名称"></Input>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem label="负责人">
            <Input v-model="queryInfo.manager"
                   placeholder="请输入负责人"></Input>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem label="服务器类型">
            <Select v-model="queryInfo.type"
                    style="width:100px"
                    filterable>
              <Option value="0">全部</Option>
              <Option v-for="temp in typeList"
                      :key="temp.id"
                      :value="temp.id">{{temp.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem label="行业">
            <Select v-model="queryInfo.hangYeType"
                    style="width:200px"
                    filterable>
              <Option value="0">全部</Option>
              <Option v-for="temp in hangYeTypeList"
                      :key="temp.id"
                      :value="temp.id">{{temp.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem>
            <Button type="primary"
                    @click="getTableData">查询</Button>
            <Button @click="queryReset">重置</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="btn-group"
         align="left">
      <Button type="primary"
              icon="md-add"
              @click="showAddCloudModal">新增</Button>
      <Button type="error"
              icon="md-close"
              ghost
              @click="deleteSelectedRows">删除</Button>
    </div>
    <div>
      <Table border
             ref="tableDataRef"
             :columns="columns"
             :data="tableData"
             :loading="loading"
             height="528"
             :pageSize="queryInfo.pageSize"
             :pageNo="queryInfo.pageNum"></Table>
      <div>
        <Page :total="dataCount"
              show-elevator
              show-sizer
              show-total
              @on-change="changPageNum"
              @on-page-size-change="changPageSize"
              class="paging"></Page>
      </div>
    </div>
    <!-- 新增数据或编辑数据 -->
    <Modal v-model="cloudDataModal"
           :title="modalFlag == 'add' ? '新增' : '编辑'"
           footer-hide>
      <Form :model="cloudFormData"
            :label-width="100"
            :rules="addCloudRules"
            ref="addCloudRef"
            label-position="right">
        <Row>
          <Col span="12">
          <FormItem label="服务器名称"
                    prop="name">
            <Input v-model="cloudFormData.name"
                   placeholder="请输入服务器名称"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="负责人"
                    prop="manager">
            <Input v-model="cloudFormData.manager"
                   placeholder="请输入负责人名称"></Input>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="IP地址"
                  prop="IPAddress">
          <Input v-model="cloudFormData.IPAddress"
                 placeholder="请输入IP地址"></Input>
        </FormItem>
        <FormItem label="行业"
                  prop="hangYeType">
          <Select v-model="cloudFormData.hangYeType">
            <Option v-for="temp in hangYeTypeList"
                    :key="temp.id"
                    :value="temp.id">{{temp.name}}</Option>
          </Select>
        </FormItem>
        <Row>
          <Col span="12">
          <FormItem label="服务器类型"
                    prop="type">
            <Select v-model="cloudFormData.type">
              <Option v-for="temp in typeList"
                      :key="temp.id"
                      :value="temp.id">{{temp.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="到期时间"
                    prop="endTime">
            <DatePicker type="date"
                        placeholder="请选择日期"
                        v-model="cloudFormData.endTime"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
          <div style="float: right">
            <Button type="text"
                    @click="cancelSaveCloud">取消</Button>
            <Button type="primary"
                    @click="saveCloud(cloudFormData)">提交</Button>
          </div>
          </Col>
        </Row>
      </Form>
    </Modal>
    <!-- 删除数据 -->
    <Modal v-model="deleteCloudModal"
           @on-ok="deleteCloud"
           @on-cancel="deleteCloudCancel">
      <p>是否删除所选记录？</p>
    </Modal>
    <!-- 查看数据详情 -->
    <Modal v-model="cloudDetailModal"
           title='详情'
           @on-cancel="cloudDetailCancel">
      <List>
        <ListItem>服务器名称：{{cloudFormData.name}}</ListItem>
        <ListItem>负责人：{{cloudFormData.manager}}</ListItem>
        <ListItem>IP地址：{{cloudFormData.IPAddress}}</ListItem>
        <ListItem>行业：{{cloudFormData.hangYeType == '1' ? '平台研发与开源社区中心' : '行业产品研发中心'}}</ListItem>
        <ListItem>服务器类型：{{cloudFormData.type == '1' ? '云服务器' : '云硬盘'}}</ListItem>
        <ListItem>到期日期：{{cloudFormData.endTime}}</ListItem>
      </List>
    </Modal>
  </Card>
</template>
<script>
import {
  list,
  getTypeList,
  getHangYeTypeList,
  saveCloudData,
  deleteCloudData,
  getCloudInfo
} from '../api/tencentCloudsApi'
export default {
  data () {
    return {
      addCloudRules: {
        name: [
          { required: true, message: '请输入服务器名称', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入负责人名称', trigger: 'blur' }
        ],
        IPAddress: [
          { required: true, message: '请输入IP地址', trigger: 'blur' }
        ],
        hangYeType: [
          { required: true, message: '请选择行业', trigger: 'blur', type: 'number' }
        ],
        type: [
          { required: true, message: '请选择服务器类型', trigger: 'blur', type: 'number' }
        ],
        endTime: [
          { required: true, message: '请选择到期日期', trigger: 'blur', type: 'date' }
        ]
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '行业',
          key: 'hangYeType',
          render: (h, params) => {
            let resultStr = ''
            if (params.row.hangYeType === 1) {
              resultStr = '平台研发与开源社区中心'
            } else if (params.row.hangYeType === 2) {
              resultStr = '行业产品研发中心'
            } else {
              resultStr = '项目'
            }
            return h('div', resultStr)
          }
        },
        {
          title: '服务器名称',
          key: 'name'
        },
        {
          title: '负责人',
          key: 'manager'
        },
        {
          title: 'IP地址',
          key: 'IPAddress'
        },
        {
          title: '服务器类型',
          key: 'type',
          render: (h, params) => {
            let resultStr = ''
            if (params.row.type === 1) {
              resultStr = '云服务器'
            } else {
              resultStr = '云硬盘'
            }
            return h('div', resultStr)
          }
        },
        {
          title: '到期日期',
          key: 'endTime'
        },
        {
          title: '剩余天数',
          key: 'hasDate',
          render: (h, params) => {
            let hasDate = params.row.hasDate
            if (hasDate > 30) {
              return h('div', {
                style: {
                  color: 'green'
                }
              }, hasDate)
            } else if (hasDate > 7) {
              return h('div', {
                style: {
                  color: 'orange'
                }
              }, hasDate)
            } else {
              return h('div', {
                style: {
                  color: 'red'
                }
              }, hasDate)
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                class: 'option-text',
                on: {
                  click: () => {
                    console.log(params.row.id)
                    this.getCloudData(params.row.id)
                    this.cloudDataModal = true
                  }
                }
              }, '编辑'),
              h('a', {
                class: 'option-text',
                on: {
                  click: () => {
                    this.getCloudData(params.row.id)
                    this.cloudDetailModal = true
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      tableData: [],
      dataCount: 0,
      loading: false,
      queryInfo: {
        id: '',
        name: '',
        manager: '',
        type: '0',
        hangYeType: '0',
        pageNum: 1,
        pageSize: 10
      },
      typeList: [], // 服务器类型下拉框数组
      hangYeTypeList: [], // 行业类型下拉框数组
      selection: [], // 多选数组
      cloudFormData: {
        id: '',
        name: '',
        manager: '',
        hangYeType: '',
        type: '',
        IPAddress: '',
        endTime: ''
      },
      modalFlag: 'add', // add为打开新增窗口，edit为打开编辑窗口
      cloudDataModal: false, // 新增数据窗口
      deleteCloudModal: false, // 删除数据确认窗口
      cloudDetailModal: false // 查看数据详情窗口
    }
  },
  created () {
    this.getTableData()
    this.getTypeList()
    this.getHangYeTypeList()
  },
  methods: {
    // 获取所有服务器数据
    getTableData () {
      this.loading = true
      list(this.queryInfo).then(resp => {
        this.tableData = resp.data.data
        this.dataCount = resp.data.total
        this.loading = false
        console.log(this.tableData)
        console.log(this.dataCount)
      })
    },
    // 更换每页条数
    changPageSize (value) {
      this.queryInfo.pageSize = value
      this.getTableData()
      console.log(this.queryInfo.pageSize)
    },
    // 更换页数
    changPageNum (value) {
      this.queryInfo.pageNum = value
      this.getTableData()
      console.log(this.queryInfo.pageNum)
    },
    // 重置按钮
    queryReset () {
      this.queryInfo = {
        name: '',
        manager: '',
        type: '0',
        hangYeType: '0',
        pageNum: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 获取服务器类型列表
    getTypeList () {
      getTypeList().then(resp => {
        this.typeList = resp.data
        console.log(resp.data)
      })
    },
    // 获取行业类型列表
    getHangYeTypeList () {
      getHangYeTypeList().then(resp => {
        this.hangYeTypeList = resp.data
      })
    },
    // 打开新增数据窗口
    showAddCloudModal () {
      this.getTypeList()
      this.getHangYeTypeList()
      this.cloudDataModal = true
      this.$refs.addCloudRef.resetFields()
    },
    // 新增/编辑云服务器
    saveCloud (params) {
      this.$refs.addCloudRef.validate((valid) => {
        if (valid) {
          saveCloudData(params).then(resp => {
            if (resp) {
              if (this.modalFlag === 'add') {
                this.$Message.success('添加成功 ')
              } else {
                this.$Message.success('编辑成功 ')
              }
              this.getTableData()
            } else {
              if (this.modalFlag === 'add') {
                this.$Message.error('添加失败 ')
              } else {
                this.$Message.error('编辑失败 ')
              }
            }
          })
        } else {
          // this.cloudDataModal = true
          this.$Message.error('请填写完整')
        }
      })
    },
    cancelSaveCloud () {
      this.$refs.addCloudRef.resetFields()
      this.cloudDataModal = false
      this.$Message.info('取消操作')
    },
    // 判断是否执行删除数据操作
    deleteSelectedRows () {
      this.selection = this.$refs.tableDataRef.getSelection()
      if (this.selection.length === 0) {
        this.$Message.error('请选择要删除的数据')
      } else {
        this.deleteCloudModal = true
      }
    },
    // 执行删除操作
    deleteCloud () {
      let selectRow = this.$refs.tableDataRef.getSelection()
      let idArr = []
      let idStr = ''
      for (let i = 0; i < selectRow.length; i++) {
        idArr.push(selectRow[i].id)
      }
      idStr = idArr.join(',')
      console.log({ idStr: idStr })
      deleteCloudData({ idStr: idStr }).then(resp => {
        if (resp) {
          this.$Message.success('删除成功')
          this.getTableData()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    // 取消执行删除操作
    deleteCloudCancel () {
      this.$Message.info('取消删除操作')
    },
    // 根据id获取服务器信息
    getCloudData (id) {
      getCloudInfo({ cloudID: id }).then(resp => {
        this.cloudFormData = resp.data
        this.modalFlag = 'edit'
        console.log(resp)
      })
    },
    cloudDetailCancel () {
      this.$Message.info('取消详情操作')
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
