import request from '@/utils/request'
export function imgDownload(data) {
  debugger
  return request({
    url: `/system/upfile/${data.id}`
  })
}
export function imgUpload(data) {
  return request({
    url: '/system/upfile',
    data,
    type: 'post'
  })
}

export function getCityJSON() {
  return request({
    url: '../../static/json/map.json'
  })
}
export function getCityList() {
  return request({
    url: '/sys/city'
  })
}

