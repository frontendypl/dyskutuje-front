<template>
  <div class="TopicView">
    <div class="container">

      <div class="meta">
        <div class="meta__title">
          <div class="meta__title__text">
            {{ activeTopicPrintScreen?.title }}
          </div>
        </div>
        <div class="meta__url">
          <div class="meta__url__text">
            <a :href="activeTopic?.url" target="_blank">
              {{ activeTopic?.url }}
            </a>
          </div>
        </div>
      </div>

      <div class="TopicView__image" v-if="!!activeTopicPrintScreen?.src">
        <img class="TopicView__image__img" :src="`data:image/jpeg;base64,${activeTopicPrintScreen?.src}`" />
      </div>
      <ImageLoaderComponent v-else />

      <div class="TopicView__comment-form" v-if="activeTopic._id">
        <div class="TopicView__comment-form__heading">
          <div class="TopicView__comment-form__heading__text">
            Dodaj komentarz
          </div>
        </div>
        <CommentFormComponent :postNewComment="postNewComment" />
      </div>
      <div class="TopicView__comment-list" v-if="commentsWithSubComments.length">
        <div class="TopicView__comment-list__comment" v-for="(comment, i) in commentsWithSubComments">

          <CommentComponent :comment="comment" :key="comment._id" :data-key="comment._id" :ref="`comment--${comment._id}`"
            v-if="!comment.parent">
            <template v-slot:commentForm>
              <CommentFormComponent :postNewComment="postNewComment" :parent="comment._id"
                @commentFormSent="commentFormSent(comment._id)" :textAreaPlaceholder="'Wpisz treść odpowiedzi'" />
            </template>
          </CommentComponent>

          <div class="TopicView__comment-list__comment__subcomments">
            <CommentComponent v-for="(subComments, i) in comment.subComments" :comment="subComments"
              :key="subComments._id" :data-key="subComments._id" :ref="`comment--${subComments._id}`">
            </CommentComponent>
          </div>

        </div>

      </div>
      <div class="no-comment" v-else>
        <div class="no-comment__text">
          {{!activeTopic._id? 'Trwa ładowanie komentarzy': 'Nie ma jeszcze żadnych komentarzy.'}}
        </div>
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
    /**
     * This method will be called on commentFormSent event emited after form send. The form will hide.
     * @param {string} id - id of the comment with form.
     */
    commentFormSent(id) {
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
  beforeDestroy() {
    clearInterval(this.timeInterval)
  }
}
</script>

<style lang="scss" >
.TopicView {

  .meta {
    margin-bottom: 2em;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 3em 1em;
    border-radius: 2em;

    &__title {
      margin-bottom: 2em;

      &__text {
        font-size: 3em;
        font-weight: 600;
      }
    }

    &__url {
      &__text {
        font-size: 2em;
      }
    }
  }

  &__image {
    border-radius: 2em;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &__img {
      border-radius: 2em;
    }
  }

  &__comment-form {

    &__heading {
      text-align: center;
      margin-bottom: 2em;

      &__text {
        font-size: 3em;
        font-weight: 600;
      }
    }

    margin: 7em 0;
  }

  &__comment-list {

    .CommentComponent {
      .comment {
        &__form {
          width: 90%;

          @media screen and (min-width: 1000px) {
            width: 70%;
          }
        }

        .input__field{
          padding: 1em 7em 1em 1em;
        }
      }
    }

    .CommentFormComponent {
      font-size: 7px;

      .input__button {

        width: 7em;

        @media screen and (min-width: 1000px) {
          width: 6em;
        }

        svg {
          
          font-size: 1.5em;
          @media screen and (min-width: 1000px) {
            font-size: 2em;
          }
        }
      }
    }

    &__comment {

      &__subcomments {
        width: 90%;
        margin: 0 0 0 auto;
      }
    }

  }

  .no-comment {
    margin-top: 2em;
    &__text {
      font-size: 2em;
    }
  }

}
</style>