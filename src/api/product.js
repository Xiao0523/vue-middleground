import request from '@/http/api'

function getSupplierCategoryList() {
  return request.get('/boss/supplier/categories')
}
function getSupplierList(data) {
  return request.post('/boss/supplier/products', data)
}
function getTagsList() {
  return request.get('/boss/supplier/tags')
}
function editProduct(data) {
  return request.post('/boss/supplier/product', data)
}
function getProductDetail(uuid) {
  return request.get('/boss/supplier/product/' + uuid)
}
function deleteProduct(id) {
  return request.del2('/boss/supplier/product/' + id)
}
export { getSupplierCategoryList, getSupplierList, getTagsList, editProduct, getProductDetail, deleteProduct }
