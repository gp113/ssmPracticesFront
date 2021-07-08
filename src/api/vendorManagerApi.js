import Vue from 'vue' // 引用vue实例，使用Vue.prototype.HOST
import axios from 'axios'

// 获取所有厂商数据
export const list = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/vendor/list',
    method: 'post',
    params: params
  })
}

// 根据厂商id查询厂商信息
export const selectById = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/vendor/selectById',
    method: 'post',
    params: params
  })
}
// 根据厂商id查询关联设备型号
export const selectDeviceTypeById = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/vendor/selectDeviceTypeById',
    method: 'post',
    params: params
  })
}
// 添加厂商
export const saveVendor = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/vendor/saveVendor',
    method: 'post',
    params: params
  })
}
// 根据id删除厂商
export const deleteVendors = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/vendor/deleteVendors',
    method: 'post',
    params: params
  })
}
