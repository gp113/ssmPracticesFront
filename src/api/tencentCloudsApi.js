import Vue from 'vue' // 引用vue实例，使用Vue.prototype.HOST
import axios from 'axios'

export const login = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/loginTest.do',
    method: 'post',
    params: params
  })
}
export const getAllClouds = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/tencent/getAllClouds.do',
    method: 'post',
    params: params
  })
}

// 获取所有服务器数据
export const list = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/tencent/list.do',
    method: 'post',
    params: params
  })
}

// 获取服务器类型列表
export const getTypeList = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/tencent/getTypeList.do',
    method: 'post',
    params: params
  })
}

// 获取行业类型列表
export const getHangYeTypeList = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/tencent/getHangYeTypeList.do',
    method: 'post',
    params: params
  })
}

// 添加云服务器
export const saveCloudData = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/tencent/saveCloudData.do',
    method: 'post',
    params: params
  })
}

// 删除云服务器
export const deleteCloudData = (params) => {
  return axios.request({
    url: Vue.prototype.HOST + '/tencent/deleteCloudData.do',
    method: 'post',
    params: params
  })
}

// 根据id获取服务器信息
export const getCloudInfo = params => {
  return axios.request({
    url: Vue.prototype.HOST + '/tencent/getCloudInfo.do',
    method: 'post',
    params: params
  })
}
