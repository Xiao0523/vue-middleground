import request from '@/http/api'

function getCode(phone) {
  return request.get('code/' + phone)
}
function getCheck({ phone, code }) {
  return request.get('check/' + phone + '/' + code)
}
function login(data) {
  return request.post('validUser', data)
}
export { getCode, getCheck, login }
