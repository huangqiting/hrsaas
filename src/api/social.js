import request from '@/utils/request'

export function getArchivingCont(params) {
  return request({
    url: `/social_securitys/historys/${params.month}`,
    params
  })
}

export function getArchivingList(data) {
  return request({
    url: `/social_securitys/historys/${data.year}/list`,
    data
  })
}
export function newReport(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/newReport`,
    method: 'put',
    data
  })
}
export function getHistorysData(data) {
  return request({
    url: `/social_securitys/historys/archiveDetail/${data.userId}/${data.yearMonth}`,
    data
  })
}
export function getArchivingExport(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/export`,
    data
  })
}
export function getArchivingFirst(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/first`,
    data
  })
}
export function getSocialList(data) {
  return request({
    url: '/social_securitys/list',
    method: 'post',
    data
  })
}
export function getArchivingArchive(data) {
  return request({
    url: `/social_securitys/historys/${data.yearMonth}/archive`,
    method: 'post',
    data
  })
}

export function getTips(yearMonth) {
  return request({
    url: `/social_securitys/tips/${yearMonth}`
  })
}
export function saveContent(data) {
  return request({
    url: `/social_securitys/${data.userId}`,
    method: 'put',
    data
  })
}
export function getContent(userId) {
  return request({
    url: `/social_securitys/${userId}`
  })
}
export function getPaymentItemList(id) {
  return request({
    url: `/social_securitys/payment_item/${id}`
  })
}
export function getSettings() {
  return request({
    url: '/social_securitys/settings'
  })
}
export function saveSettings(data) {
  return request({
    url: '/social_securitys/settings',
    data,
    method: 'post'
  })
}
