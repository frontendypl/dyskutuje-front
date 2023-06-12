<template>
  <div id="app" class="app">
    <HeaderComponent />
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/reset.css";

@font-face {
  font-family: 'Roboto';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  src: local('Roboto'), url('@/assets/fonts/Roboto/Roboto-Regular.ttf') format('truetype');
}

*{
  box-sizing: border-box;
}

html {
  font-size: 8px;

  @media screen and (min-width: 1000px) {
    font-size: 10px;
  }

}

.app {
  display: flex;
  flex-direction: column;
  padding: 1em;

  font-family: Roboto, sans-serif;
}

.container{
  display: flex;
  @media screen and (min-width: 1000px) {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }
}

.component {
  width: 100%;
}
</style>

<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";

</script>