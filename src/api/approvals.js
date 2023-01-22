import request from '@/utils/request'

export function getApprovalList(data) {
  return request({
    url: `/user/process/instance/${data.page}/${data.pageSize}`,
    method: 'put',
    data
  })
}
// 获取审批信息
export function getInformation(id) {
  return request({
    url: `/user/process/instance/getById/${id}`
  })
}
export function getReviewHistory(id) {
  return request({
    url: `/approvals/flows/${id}`
  })
}
export function process(data) {
  return request({
    url: '/approvals/process',
    method: 'post',
    data
  })
}
export function getSetState(params) {
  return request({
    url: '/approvals/setting',
    params
  })
}
// 保存状态
export function saveSetState(data) {
  return request({
    url: '/approvals/setting',
    method: 'put',
    data
  })
}
// 获取流程详情
export function getApprovalsDetail(id) {
  return request({
    url: `/user/process/instance/${id}`
  })
}
// 获取流程详情
export function getApprovalsTaskDetail(id) {
  return request({
    url: `/user/process/instance/tasks/${id}`
  })
}
// 下载图片
export function downImg(picture_id) {
  return request({
    url: `//user/process/buss/showBussImgById/${picture_id}`
  })
}
// 获取流程列表
export function getFlowList(params) {
  return request({ url: `/user/process/definition`, params })
}
export function suspend(params) {
  return request({
    url: `/user/process/suspend/${params.processKey}`,
    params
  })
}
export function startProcess(data) {
  return request({
    url: `/user/process/startProcess`,
    data,
    method: 'post'
  })
}
export function applyeLave(data) {
  return request({
    url: `/user/process_leave/startProcess`,
    data,
    method: 'post'
  })
}

// 驳回
export function approvalsReject(data) {
  return request({
    url: `/user/approvals/${data.id}/reject`,
    method: 'put',
    data
  })
}
// 删除
export function approvalsDel(id) {
  return request({
    url: `/user/approvals/${id}`,
    method: 'delete'
  })
}
// 同意
export function approvalsPass(data) {
  return request({
    url: '/user/process/instance/commit',
    method: 'put',
    data
  })
}
export function applyDimission(data) {
  return request({
    url: '/user/process_dimission/startProcess',
    method: 'post',
    data
  })
}
export function applyOvertime(data) {
  return request({
    url: '/user/process_overtime/startProcess',
    method: 'post',
    data
  })
}
export function exportApprovals(data) {
  return request({
    url: `/approvals/export/${data.month}`,
    data
  })
}

export function updateUser(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
