<template>
  <div class="container">
      <HeadNav />
      <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue'
export default {
  components:{
    HeadNav,
  }
}
</script>

<style>

</style>
