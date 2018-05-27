<template>
  <div id="app">
     <transition name="slide-fade">
        <router-view></router-view>
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
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translate(50px, 50px);
  opacity: 0;
}
</style>
