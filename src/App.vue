<template>
  <div id="app">
    <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
       <router-view/>      
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
a {
  text-decoration: none;
}
a:hover {
  color: black;
}
</style>
