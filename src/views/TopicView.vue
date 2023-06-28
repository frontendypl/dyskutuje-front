<template>
  <div class="TopicView">
    <div class="container">
      
      <div class="TopicView__image" v-if="!!activeTopicPrintScreen?.src">
        <img class="TopicView__image__img" :src="`data:image/jpeg;base64,${activeTopicPrintScreen?.src}`" />
      </div>
      <ImageLoaderComponent v-else/>

      <div class="TopicView__comment-form">
        <CommentFormComponent :postNewComment="postNewComment" />
      </div>
      <div class="TopicView__comment-list" v-if="commentsWithSubComments.length">
        <div class="TopicView__comment-list__comment" v-for="(comment, i) in commentsWithSubComments">
        
          <CommentComponent
          :comment="comment" 
          :key="comment._id" 
          :data-key="comment._id"
          :ref="`comment--${comment._id}`"
          v-if="!comment.parent"
          >
            <template v-slot:commentForm>
              <CommentFormComponent 
              :postNewComment="postNewComment"
              :parent="comment._id" 
              @commentFormSent="commentFormSent(comment._id)"
              />
            </template>
          </CommentComponent>

          <div class="TopicView__comment-list__comment__subcomments">
            <CommentComponent
            v-for="(subComments,i) in comment.subComments"
            :comment="subComments" 
            :key="subComments._id" 
            :data-key="subComments._id"
            :ref="`comment--${subComments._id}`"
          >
            <!-- <template v-slot:commentForm>
              <CommentFormComponent 
              :postNewComment="postNewComment"
              :parent="subComments._id" 
              @commentFormSent="commentFormSent(subComments._id)"
              />
            </template> -->
          </CommentComponent>
          </div>

        </div>
        
      </div>
      <div v-else>
        Nie ma jeszcze żadnych komentarzy.
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src3 
import { mapState, mapGetters, mapActions } from "vuex";
import CommentFormComponent from "@/components/CommentFormComponent.vue";
import CommentComponent from "@/components/CommentComponent.vue";
import ImageLoaderComponent from "@/components/ImageLoaderComponent.vue";


export default {
  name: 'TopicView',
  components: {
    CommentFormComponent,
    CommentComponent,
    ImageLoaderComponent
  },
  data() {
    return {
      timeInterval: ''
    }
  },
  computed: {
    ...mapState({
      activeTopic: state => state.topicModule.activeTopic,
      // newCommentErrors: state => state.topicModule.newCommentErrors,
      comments: state => state.topicModule.comments,
    }),
    ...mapGetters({
      apiUrl: 'apiUrl',
      commentsWithSubComments: 'topicModule/commentsWithSubComments',
      activeTopicPrintScreen: 'topicModule/activeTopicPrintScreen',
    })
  },
  methods: {
    ...mapActions({
      setTopics: 'topicModule/setTopics',
      getTopicData: 'topicModule/getTopicData',
      
      postNewTopic: 'topicModule/postNewTopic',
      postNewComment: 'topicModule/postNewComment',
      setPrintScreens: 'topicModule/setPrintScreens',
    }),
    commentFormSent(id){
      console.log(this.$refs[`comment--${id}`][0].handleFormActive());
    }
  },
  mounted() {
      
      this.setTopics()
      this.getTopicData(this.$route.params.id)

      this.timeInterval = setInterval(() => {

        this.getTopicData(this.$route.params.id)

    }, 2000);
  },
  beforeDestroy(){
    clearInterval(this.timeInterval)
  }
}
</script>

<style lang="scss" >
.TopicView {

  &__image {
    border-radius: 2em;
    border: 1px solid rgba(0,0,0,0.1);

    &__img{
      border-radius: 2em;
    }
  }

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

    &__comment{
      
      &__subcomments{
        width: 90%;
        margin: 0 0 0 auto;
      }
    }

  }

}
</style>