import request from '@/http/api'

function getWeb() {
  return request.get('/boss/supplier/web')
}
function updateWeb(data) {
  return request.patch('/boss/supplier/web', data)
}
function login(data) {
  return request.post('validUser', data)
}
export { getWeb, updateWeb, login }
