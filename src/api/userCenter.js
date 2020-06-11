import request from '@/http/api'

function getSuppliertCode() {
  return request.get('/boss/supplier/pic')
}
function getCheck({ phone, code }) {
  return request.get('/boss/supplier/send/' + phone + '/' + code)
}
function updateUserInformation(data) {
  return request.patch('/boss/supplier', data)
}
function getUserInformation() {
  return request.get('/boss/supplier/detail')
}
export { getSuppliertCode, getCheck, updateUserInformation, getUserInformation }
