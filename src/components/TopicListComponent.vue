<template>
  <div class="TopicListComponent component">
    <router-link :to="{name:'TopicView', params:{id: topic._id}}"  class="topic" v-for="(topic, i) in topics" :key="topic._id">
      <div class="topic__image">
        <img
              :src="`data:image/jpeg;base64,${topic.printScreen.src}`"
              class="topic__image__img"
          >
      </div>
      <div class="topic__details">
        <div class="topic__details__title">
          <div class="topic__details__title__text">
            {{ topic.printScreen.title }}
          </div>
        </div>
        <div class="topic__details__url">
          <div class="topic__details__url__text">
            {{topic.url}}
          </div>
        </div>
        <div class="topic__details__domain">
          <div class="topic__details__domain__text">
            {{topic.url}}
          </div>
        </div>
        <div class="topic__details__comments">
          <div class="topic__details__domain__comments">
            5
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TopicList',
  props: {
    topics: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">

.topic {
  padding: 1em;
  display: flex;

  &__image {
    width: 30em;
    padding: 1em;
    &__img {

    }
  }

  &__details{
    padding: 1em;
    
    &__title {
      margin-bottom: 1.5em;
      &__text{
        font-size: 4em;
      }
    }

    &__url, &__domain {
      margin-bottom: 1em;
      &__text{
        font-size: 2em;
      }
    }
  }
}

</style>