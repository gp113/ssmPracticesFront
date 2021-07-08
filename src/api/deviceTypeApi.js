import Vue from 'vue' // 引用vue实例，使用Vue.prototype.HOST
import axios from 'axios'

// 获取所有设备型号数据
export const list = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/list',
    method: 'post',
    params: params
  })
}
// 获取所有厂商
export const getVendorList = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/getVendorList',
    method: 'post',
    params: params
  })
}
// 获取所有规约
export const getTxgyList = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/getTxgyList',
    method: 'post',
    params: params
  })
}
// 新增设备型号
export const save = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/save',
    method: 'post',
    params: params
  })
}
// 获取设备型号信息
export const getDeviceTypeById = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/getDeviceTypeById',
    method: 'post',
    params: params
  })
}
// 获取设备类型信息以及关联的厂商信息
export const getDeviceTypeDetail = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/getDeviceTypeDetail',
    method: 'post',
    params: params
  })
}
// 修改设备型号信息
export const updateDeviceType = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/updateDeviceType',
    method: 'post',
    params: params
  })
}
// 删除设备型号信息
export const deleteDeviceTypeById = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/deleteDeviceTypeById',
    method: 'post',
    params: params
  })
}
// 测试备注
export const deleteDeviceTypeByIdTest = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/deviceType/deleteDeviceTypeById',
    method: 'post',
    params: params
  })
}