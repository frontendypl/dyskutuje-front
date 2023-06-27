<template>
  <div class="HomeView">
    <div class="container">
      <div class="components">
        <TopicInputComponent
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

.components{
  width: 100%;
  //display: flex;
  //flex-direction: column;
}

</style>
