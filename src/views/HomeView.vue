<template>
  <div class="HomeView">
    <div class="container">
      <div class="description">

        <div class="description__h1">
          <h1 class="description__h1__content">
            Komentuj co chcesz...
          </h1>
        </div>
        <div class="description__h2">
          <h2 class="description__h2__content">
            ...artykuły, produkty, filmy ...
          </h2>
        </div>
        <div class="description__h3">
          <h3 class="description__h3__content">
            ... wystarczy wkleić link.
          </h3>
        </div>
      </div>

      <div class="components">
        <TopicInputComponent
            class="components__input"
            :newTopicErrors="newTopicErrors"
            :postNewTopic="postNewTopic"
        />
        <TopicListComponent
          :topics="topicsWithPrintScreens"
          @topicSelected="setActiveTopic"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState, mapGetters, mapActions} from "vuex";

import TopicInputComponent from "@/components/TopicFormComponent.vue";
import TopicListComponent from "@/components/TopicListComponent.vue";

export default {
  name: 'HomeView',
  components: {
    TopicInputComponent,
    TopicListComponent
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      newTopicErrors: state => state.topicModule.newTopicErrors,
      topics: state => state.topicModule.topics,
    }),
    ...mapGetters({
      apiUrl: 'apiUrl',
      topicsWithPrintScreens: 'topicModule/topicsWithPrintScreens'
    })
  },
  methods: {
    ...mapActions({
      postNewTopic: 'topicModule/postNewTopic',
      resetActiveTopic: 'topicModule/resetActiveTopic',
      setActiveTopic: 'topicModule/setActiveTopic',
      setComments: 'topicModule/setComments',
      setTopics: 'topicModule/setTopics',
      setPrintScreens: 'topicModule/setPrintScreens',
    })
  },
  mounted(){
    this.resetActiveTopic()
    this.setComments([])

    // this.setTopics();
    // this.setPrintScreens();

    // const time = setInterval(() => {
    //   this.setTopics();
    //   this.setPrintScreens();
    // }, 5000);
  },
}
</script>

<style lang="scss" scoped>

.HomeView{

}

.description {
  text-align: center;
  margin-bottom: 3em;
   &__h1 {
      &__content {
        font-size: 5em;
        line-height: 120%;
      }
   }
   &__h2 {
      &__content {
        font-size: 3.5em;
        line-height: 120%;
      }
   }
   &__h3 {
      &__content {
        font-size: 2.5em;
        line-height: 120%;
      }
   }
   
}

.components{
  width: 100%;
  
  &__input{
    margin-bottom: 3em;
  }
}

</style>
