<template>
  <div id="app" class="app">
    <HeaderComponent />
    <router-view class="main-view" />
    <FooterComponent />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      test: 1
    }
  },
  computed: {
    ...mapState({
      activeTopic: state => state.topicModule.activeTopic,
      topics: state => state.topicModule.topics,
      printScreens: state => state.topicModule.printScreens,
    })
  },
  methods: {
    ...mapActions({
      setTopics: 'topicModule/setTopics',
      setAllComments: 'topicModule/setAllComments',
      setPrintScreens: 'topicModule/setPrintScreens',
      loadTopicsFromStorage: 'topicModule/loadTopicsFromStorage',
      loadPrintScreensFromStorage: 'topicModule/loadPrintScreensFromStorage',
    })
  },
  watch: {
    // activeTopic: {
    //   handler(newValue, oldValue) {
    //     if (newValue._id && this.$route.params.id !== newValue._id) {
    //       this.$router.push({ name: 'TopicView', params: { id: newValue._id } })
    //     }
    //     else if (newValue._id) { }
    //     else {
    //       this.$router.push({ name: 'home' })
    //     }
    //   }
    // },

    // topics: {
    //   handler(newValue, oldValue) {
    //     if(newValue.length !== oldValue.length)
    //     this.setPrintScreens();
    //   },
    // },
  },
  created() {

  },
  mounted() {
    this.loadPrintScreensFromStorage()
    this.loadTopicsFromStorage()

    this.setTopics();
    this.setAllComments();

    const timeTopics = setInterval(() => {
      if (this.$route.name === 'home') {
        this.setTopics();
      }
    }, 3000);

    const timeComments = setInterval(() => {
      if (this.$route.name === 'home') {
        this.setAllComments();
      }    
    }, 4000);

    const timePrintScreens = setInterval(() => {
      if (this.topics.length !== this.printScreens.length) {
        this.setPrintScreens();
      }
    }, 5000);

    

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
  src: local('Roboto'), url('@/assets/fonts/Roboto/Roboto-Light.ttf') format('truetype');
}

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


* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
}

html {
  font-size: 4px;

  @media screen and (min-width: 321px) {
    font-size: 6px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 10px;
  }

}

.app {
  overflow: hidden;
  display: flex;
  flex-direction: column;

  font-family: Roboto, sans-serif;
}

.container {

  @media screen and (min-width: 1000px) {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }

  &--flex {
    display: flex;
  }

  &--column {
    flex-direction: column;
  }
}

.component {
  width: 100%;
}

.main-view {
  margin: 4em 0;
  padding: 1em;
}
</style>