<template>
  <div class="TopicListComponent component">
    <router-link :to="{name:'TopicView', params:{id: topic._id}}"  class="topic" v-for="(topic, i) in topics" :key="topic._id">
      <div class="topic__image">
        <img class="topic__image__img" src="https://newsblog.pl/wp-content/uploads/2022/02/1644700511_239_Jak-wyslac-wiadomosc-na-YouTube.png" alt="">
      </div>
      <div class="topic__details">
        <div class="topic__details__title">
          <div class="topic__details__title__text">
            Najnowsze informacje z YT.
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