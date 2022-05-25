import AdminCategoryList from '../AdminCategoryList'
import AdminCategoryAdd from '../AdminCategoryAdd'
import AdminCategoryDelete from '../AdminCategoryDelete'

export default function AdminCategoriesPanel () {
  return (
    <>
      <AdminCategoryList />
      <AdminCategoryAdd />
      <AdminCategoryDelete />
    </>
  )
}
