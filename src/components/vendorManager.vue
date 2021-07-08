<template>
  <Card>
    <div>
      <Form :model="queryInfo"
            :label-width="100"
            inline>
        <Row>
          <Col span="5">
          <FormItem label="厂商全称">
            <Input v-model="queryInfo.name"
                   placeholder="请输入厂商全称"
                   style="width: 300px"></Input>
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
              @click="showAddVendorModal">新增</Button>
      <Button type="error"
              icon="md-close"
              ghost
              @click="deleteSelectedRows">删除</Button>
    </div>
    <div>
      <Table border
             ref="tableDataRef"
             height="528"
             :columns="columns"
             :data="tableData"
             :loading="loading"
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
    <Modal v-model="vendorDataModal"
           :title="modalFlag == 'add' ? '新增' : '编辑'"
           footer-hide>
      <Form :model="vendorFormData"
            :label-width="100"
            :rules="addVendorRules"
            ref="addVendorRef"
            label-position="right">
        <Row>
          <Col>
          <FormItem label="厂商全称"
                    prop="name">
            <Input v-model="vendorFormData.name"
                   placeholder="请输入厂商全称"></Input>
          </FormItem>
          </Col>
          <Col>
          <FormItem label="厂商简称"
                    prop="shortName">
            <Input v-model="vendorFormData.shortName"
                   placeholder="请输入厂商简称"></Input>
          </FormItem>
          </Col>
          <Col>
          <FormItem label="厂商地址"
                    prop="address">
            <Input v-model="vendorFormData.address"
                   placeholder="请输入厂商地址"></Input>
          </FormItem>
          </Col>
          <Col>
          <FormItem label="厂商固话"
                    prop="phone">
            <Input v-model="vendorFormData.phone"
                   placeholder="请输入厂商固话"></Input>
          </FormItem>
          </Col>
          <Col>
          <FormItem label="厂商联系人"
                    prop="linkman">
            <Input v-model="vendorFormData.linkman"
                   placeholder="请输入联系人"></Input>
          </FormItem>
          </Col>
          <Col>
          <FormItem label="联系人电话"
                    prop="linkmanPhone">
            <Input v-model="vendorFormData.linkmanPhone"
                   placeholder="联系人电话"></Input>
          </FormItem>
          </Col>
          <Col>
          <FormItem label="备注"
                    prop="remark">
            <Input v-model="vendorFormData.remark"
                   type="textarea"
                   placeholder="请输入备注"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
          <div style="float: right">
            <Button type="text"
                    @click="cancel">取消</Button>
            <Button type="primary"
                    @click="saveVendorData(vendorFormData)">提交</Button>
          </div>
          </Col>
        </Row>
      </Form>
    </Modal>
    <!-- 删除数据 -->
    <Modal v-model="deleteVendorModal"
           @on-ok="deleteVendor"
           @on-cancel="cancel">
      <p>是否删除所选记录？</p>
    </Modal>
  </Card>
</template>
<script>
import {
  list,
  saveVendor,
  selectById,
  deleteVendors
} from '../api/vendorManagerApi'
export default {
  name: 'VendorManager',
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '厂商名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '厂商简称',
          key: 'shortName',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '厂商联系人',
          key: 'linkman',
          align: 'center'
        },
        {
          title: '联系人电话',
          key: 'linkmanPhone',
          align: 'center'
        },
        {
          title: '厂商固话',
          key: 'phone',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
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
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.row.id)
                    this.getVendorData(params.row.id)
                    this.vendorDataModal = true
                  }
                }
              }, '编辑'),
              h('a', {
                class: 'option-text',
                on: {
                  click: () => {
                    console.log(params.row.id)
                    this.$router.push(
                      {
                        name: 'vendorDetail',
                        params: {
                          id: params.row.id,
                          data: params.row
                        }
                      }
                    )
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      addVendorRules: {
        name: [
          { required: true, message: '请输入厂商全称', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '请输入厂商简称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        linkman: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        linkmanPhone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入固话', trigger: 'blur' }
        ]
      },
      vendorFormData: {
        id: '',
        name: '',
        shortName: '',
        address: '',
        linkman: '',
        linkmanPhone: '',
        phone: '',
        remark: ''
      },
      tableData: [],
      dataCount: 0,
      loading: false,
      queryInfo: {
        id: '',
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      selection: [], // 多选数组
      modalFlag: 'add', // add为打开新增窗口，edit为打开编辑窗口
      vendorDataModal: false, // 新增数据窗口
      deleteVendorModal: false // 删除数据窗口
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取所有厂商数据
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
        pageNum: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 打开新增厂商窗口
    showAddVendorModal () {
      this.$refs.addVendorRef.resetFields()
      this.vendorDataModal = true
    },
    // 新增厂商
    saveVendorData (params) {
      console.log(params)
      this.$refs.addVendorRef.validate(validate => {
        if (validate) {
          saveVendor(params).then(resp => {
            if (resp) {
              if (this.modalFlag === 'add') {
                this.$Message.success('添加成功')
              } else {
                this.$Message.success('编辑成功')
              }
              this.$refs.addVendorRef.resetFields()
              this.vendorDataModal = false
              this.getTableData()
            } else {
              if (this.modalFlag === 'add') {
                this.$Message.error('添加失败')
              } else {
                this.$Message.error('编辑失败')
              }
            }
          })
        } else {
          this.$Message.error('请填写完整')
        }
      })
    },
    // 点击modal中的取消按钮，关闭窗口
    cancel () {
      this.$refs.addVendorRef.resetFields()
      this.vendorDataModal = false
      this.$Message.info('取消操作')
    },
    // 修改厂商
    getVendorData (params) {
      selectById({ id: params }).then(resp => {
        this.modalFlag = 'update'
        this.vendorFormData = resp.data
        console.log(resp)
      })
    },
    // 弹出modal判断是否执行删除操作
    deleteSelectedRows () {
      this.selection = this.$refs.tableDataRef.getSelection()
      if (this.selection.length === 0) {
        this.$Message.info('请选择要删除的数据')
      } else {
        this.deleteVendorModal = true
      }
    },
    // 执行删除操作
    deleteVendor () {
      let selectionRow = this.$refs.tableDataRef.getSelection()
      let idStr = ''
      for (let i = 0; i < selectionRow.length; i++) {
        idStr = idStr + selectionRow[i].id + ','
      }
      console.log({ idStr: idStr })
      deleteVendors({ idStr: idStr }).then(resp => {
        if (resp) {
          this.$Message.success('删除成功')
          this.getTableData()
        } else {
          this.$Message.error('删除失败')
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
