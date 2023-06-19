<template>
  <div class="TopicView">
    <div class="container">
      <div class="TopicView__comment-form">
        <CommentFormComponent :postNewComment="postNewComment" />
      </div>
      <div class="TopicView__comment-list">
        <CommentComponent v-for="(comment, i) in comments" 
        :comment="comment" 
        :key="comment._id" 
        :data-key="comment._id"
        :ref="`comment--${comment._id}`"
        >
          <template v-slot:commentForm>
            <CommentFormComponent 
            :postNewComment="postNewComment"
             :parent="comment._id" 
             @commentFormSent="commentFormSent(comment._id)"
             />
          </template>
        </CommentComponent>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src3 
import { mapState, mapGetters, mapActions } from "vuex";
import CommentFormComponent from "@/components/CommentFormComponent.vue";
import CommentComponent from "@/components/CommentComponent.vue";


export default {
  name: 'TopicView',
  components: {
    CommentFormComponent,
    CommentComponent
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      activeTopic: state => state.topicModule.activeTopic,
      // newCommentErrors: state => state.topicModule.newCommentErrors,
      comments: state => state.topicModule.comments,
    }),
    ...mapGetters(['apiUrl'])
  },
  methods: {
    ...mapActions({
      getTopicData: 'topicModule/getTopicData',
      postNewTopic: 'topicModule/postNewTopic',
      postNewComment: 'topicModule/postNewComment',
    }),
    commentFormSent(id){
      console.log(this.$refs[`comment--${id}`][0].handleFormActive());
    }
  },
  created() {
    if (this.$route.params.id && !this.activeTopic._id) {
      this.getTopicData(this.$route.params.id)
    }

  }
}
</script>

<style lang="scss" >
.TopicView {
  &__comment-form {
    margin: 7em 0;
  }

  &__comment-list {

    .CommentComponent {
      .comment {
        &__form {
          width: 70%;
        }
      }
    }

    .CommentFormComponent {
      font-size: 7px;

      .input__button {
        width: 6em;
        svg {
        font-size: 2em;
      }
      }
    }
  }

}
</style>