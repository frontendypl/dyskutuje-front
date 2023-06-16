<template>
  <div class="home">
    <div class="container">
    <CommentFormComponent
        :postNewComment="postNewComment"
        :newCommentErrors="newCommentErrors"
    />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState, mapGetters, mapActions} from "vuex";
import CommentFormComponent from "@/components/CommentFormComponent.vue";

export default {
  name: 'TopicView',
  components: {
    CommentFormComponent
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      activeTopic: state => state.topicModule.activeTopic,
      newCommentErrors: state => state.topicModule.newCommentErrors,
    }),
    ...mapGetters(['apiUrl'])
  },
  methods: {
    ...mapActions({
      getTopicData: 'topicModule/getTopicData',
      postNewTopic: 'topicModule/postNewTopic',
      postNewComment: 'topicModule/postNewComment',
    })
  },
  created() {
    if(this.$route.params.id && !this.activeTopic._id){
      this.getTopicData(this.$route.params.id)
    }

  }
}
</script>
