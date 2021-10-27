<template>
  <div>
      {{message}}
      <div><router-link to="/spa/sample" >Sample</router-link></div>

       <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: 'Hello World Vue SPA'
      }
    }
  }
</script>