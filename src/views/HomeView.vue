<template>
  <div class="home">
    <div class="container">
      <TopicInputComponent
        :newTopicErrors="newTopicErrors"
        :postNewTopic="postNewTopic"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState, mapGetters, mapActions} from "vuex";

import TopicInputComponent from "@/components/TopicFormComponent.vue";

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
      postNewTopic: 'topicModule/postNewTopic',
    })
  }
}
</script>
