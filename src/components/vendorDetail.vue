<template>
  <Card>
    <Tabs value="name1">
      <TabPane label="厂商详情"
               name="name1">
        <List border>
          <ListItem>厂商全称：{{vendorInfo.name}}</ListItem>
          <ListItem>厂商简称：{{vendorInfo.shortName}}</ListItem>
          <ListItem>厂商地址：{{vendorInfo.address}}</ListItem>
          <ListItem>厂商联系人：{{vendorInfo.linkman}}</ListItem>
          <ListItem>联系人电话：{{vendorInfo.linkmanPhone}}</ListItem>
          <ListItem>厂商固话：{{vendorInfo.phone}}</ListItem>
          <ListItem>备注：{{vendorInfo.remark}}</ListItem>
        </List>
      </TabPane>
      <TabPane label="关联设备型号"
               name="name2">
        <Row class="row">
          <Table border
                 :loading="loading"
                 :columns="columns"
                 :data="tableData"
                 :total="total"
                 :pageSize="queryInfo.pageSize"
                 :pageNo="queryInfo.pageNum"
                 @on-changPageNum="changPageNum"
                 @on-changPageSize="changPageSize"></Table>
          <Page :total="total"
                show-elevator
                show-sizer
                show-total
                @on-change="changPageNum"
                @on-page-size-change="changPageSize"
                class="paging"></Page>
        </Row>
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>
import {
  selectById,
  selectDeviceTypeById
} from '../api/vendorManagerApi'
export default {
  name: 'VendorDetail',
  data () {
    return {
      columns: [
        {
          title: '设备型号名称',
          key: 'device_type_name',
          align: 'center'
        },
        {
          title: '通讯规约',
          key: 'guiyue_name',
          align: 'center'
        },
        {
          title: '规约版本',
          key: 'guiyue_version',
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
                    console.log(params.row.device_type_id)
                    this.$router.push({
                      name: 'deviceTypeUpdate',
                      params: {
                        id: params.row.device_type_id
                      }
                    })
                  }
                }
              }, '编辑'),
              h('a', {
                class: 'option-text',
                on: {
                  click: () => {
                    console.log(params.row.device_type_id)
                    this.$router.push({
                      name: 'deviceTypeDetail',
                      params: {
                        id: params.row.device_type_id
                      }
                    })
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      loading: false,
      id: '',
      vendorInfo: {},
      tableData: [],
      queryInfo: {
        pageNum: '',
        pageSize: ''
      },
      total: 0
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getVendoreInfo()
    this.getDeviceTypeByVendorId()
  },
  methods: {
    // 获取当前厂商数据
    getVendoreInfo () {
      selectById({ id: this.id }).then(resp => {
        this.vendorInfo = resp.data
        console.log(this.vendorInfo)
      })
    },
    // 获取厂商的设备型号
    getDeviceTypeByVendorId () {
      selectDeviceTypeById({ id: this.id }).then(resp => {
        this.tableData = resp.data.data
        this.total = resp.data.total
        // console.log(this.tableData)
      })
    },
    // 更换每页条数
    changPageSize (value) {
      this.queryInfo.pageSize = value
      this.getDeviceTypeByVendorId()
      console.log(this.queryInfo.pageSize)
    },
    // 更换页数
    changPageNum (value) {
      this.queryInfo.pageNum = value
      this.getDeviceTypeByVendorId()
      console.log(this.queryInfo.pageNum)
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
