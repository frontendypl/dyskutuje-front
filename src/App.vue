<template>
  <div id="app" class="app">
    <HeaderComponent />
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  data(){
    return {
      test: 1
    }
  },
  computed: {
    ...mapState({
      activeTopic: state => state.topicModule.activeTopic,
    })
  },
  methods: {

  },
  watch: {
    activeTopic: {
      handler(newValue, oldValue){
        if(newValue._id && this.$route.params.id !== newValue._id){
          this.$router.push({name: 'TopicView', params: {id: newValue._id}})
        }
        else if (newValue._id){}
        else{
          this.$router.push({name: 'home'})
        }
      }
    }
  }
}

</script>

<style lang="scss">
@import "@/assets/styles/reset.css";

@font-face {
  font-family: 'Roboto';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  src: local('Roboto'), url('@/assets/fonts/Roboto/Roboto-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  font-weight: 500;
  font-style: normal;
  font-display: auto;
  src: local('Roboto'), url('@/assets/fonts/Roboto/Roboto-Medium.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  font-weight: 700;
  font-style: normal;
  font-display: auto;
  src: local('Roboto'), url('@/assets/fonts/Roboto/Roboto-Bold.ttf') format('truetype');
}


*{
  box-sizing: border-box;
}

a{
  color: inherit;
  text-decoration: none;
}

img{
  max-width: 100%;
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