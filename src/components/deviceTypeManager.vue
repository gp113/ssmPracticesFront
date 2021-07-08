<template>
  <Card>
    <div>
      <Form :model="queryInfo"
            :label-width="100">
        <Row>
          <Col span="6">
          <FormItem label="设备型号名称">
            <Input v-model="queryInfo.name"
                   placeholder="请输入设备型号名称"
                   style="width: 300px"></Input>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="厂商全称">
            <Input v-model="queryInfo.vendorName"
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
              @click="addDeviceType">新增</Button>
      <Button type="error"
              icon="md-close"
              ghost
              @click="deleteDeviceType">删除</Button>
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
  </Card>
</template>
<script>
import {
  list,
  deleteDeviceTypeById
} from '../api/deviceTypeApi'
export default {
  name: 'deviceTypeManager',
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '设备型号名称',
          key: 'deviceTypeName',
          align: 'center'
        },
        {
          title: '厂商全称',
          key: 'vendorName',
          align: 'center'
        },
        {
          title: '通讯规约',
          key: 'guiYueName',
          align: 'center'
        },
        {
          title: '规约版本',
          key: 'version',
          align: 'center'
        },
        {
          title: '备注',
          key: 'bz',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
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
                    this.$router.push(
                      {
                        name: 'deviceTypeUpdate',
                        params: {
                          id: params.row.id
                        }
                      }
                    )
                  }
                }
              }, '编辑'),
              h('a', {
                class: 'option-text',
                on: {
                  click: () => {
                    this.$router.push(
                      {
                        name: 'deviceTypeDetail',
                        params: {
                          id: params.row.id
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
      tableData: [],
      dataCount: 0,
      loading: false,
      queryInfo: {
        id: '',
        name: '',
        vendorName: '',
        pageNum: 1,
        pageSize: 10
      },
      selection: [] // 多选数组
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取所有设备型号数据
    getTableData () {
      this.loading = true
      list(this.queryInfo).then(resp => {
        this.tableData = resp.data.data
        this.dataCount = resp.data.total
        this.loading = false
      })
    },
    // 更换每页条数
    changPageSize (value) {
      this.queryInfo.pageSize = value
      this.getTableData()
    },
    // 更换页数
    changPageNum (value) {
      this.queryInfo.pageNum = value
      this.getTableData()
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
    // 打开新增设备类型页面
    addDeviceType () {
      this.$router.push(
        {
          name: 'deviceTypeAdd'
        }
      )
    },
    // 删除设备类型
    deleteDeviceType () {
      this.selection = this.$refs.tableDataRef.getSelection()
      console.log(this.selection)
      if (this.selection.length === 0) {
        this.$Message.info('请选择要删除的数据')
      } else {
        let idStr = ''
        for (let i = 0; i < this.selection.length; i++) {
          idStr = idStr + this.selection[i].id + ','
        }
        console.log(idStr)
        this.$Modal.confirm({
          title: '提示',
          content: '是否删除所选数据',
          onOk: () => {
            deleteDeviceTypeById({ idStr: idStr }).then(resp => {
              if (resp) {
                this.$Message.info('删除成功')
                this.getTableData()
              } else {
                this.$Message.info('删除失败')
              }
            })
          },
          onCancel: () => {

          }
        })
      }
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
