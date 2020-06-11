import request from '@/http/api'

function getArticleList(data) {
  return request.post('/boss/supplier/articles', data)
}
function editArticle(data) {
  return request.post('/boss/supplier/article', data)
}
function getArticleDetail(uuid) {
  return request.get('/boss/supplier/article/' + uuid)
}
function deleteArticle(id) {
  return request.del2('/boss/supplier/article/' + id)
}
export { getArticleList, editArticle, getArticleDetail, deleteArticle }
