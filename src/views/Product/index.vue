<template>
  <div class="product-container">
      <ProductNav/>
      <ProductList/>
      <ProductPagination/>
      <ProductAdd/>
      <ProductEditor />
  </div>
</template>

<script>
import ProductNav from './ProductNav'
import ProductAdd from './ProductAdd'
import ProductList from './ProductList'
import ProductPagination from './ProductPagination'
import ProductEditor from'./ProductEditor';
export default {
  components:{
    ProductNav,
    ProductList,
    ProductPagination,
    ProductAdd,
    ProductEditor
  }
}
</script>

<style>

</style>