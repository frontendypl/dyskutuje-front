<template>
  <div class="home">
    <div class="container">
      <TopicInputComponent
        :newTopicUrl="newTopicUrl"
        :newTopicErrors="newTopicErrors"
        :setNewTopicUrl="setNewTopicUrl"
        :postNewTopic="postNewTopic"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState, mapGetters, mapActions} from "vuex";

import TopicInputComponent from "@/components/TopicInputComponent.vue";

export default {
  name: 'HomeView',
  components: {
    TopicInputComponent,
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      newTopicUrl: state => state.topicModule.newTopicUrl,
      newTopicErrors: state => state.topicModule.newTopicErrors
    }),
    ...mapGetters(['apiUrl'])
  },
  methods: {
    ...mapActions({
      setNewTopicUrl: 'topicModule/setNewTopicUrl',
      postNewTopic: 'topicModule/postNewTopic',
    })
  }
}
</script>
