<template>
  <div class="TopicListComponent component">
    <router-link :to="{ name: 'TopicView', params: { id: topic._id } }"  v-for="(topic, i) in topics"
      :key="topic._id">
      <div class="topic" @click="$emit('topicSelected', topic)">
        <div class="topic__image">
          <img :src="`data:image/jpeg;base64,${topic.printScreen.src}`" class="topic__image__img"
            v-if="topic?.printScreen?.src">
          <div class="topic__image__loader" v-else>
            <SpinnerBorderComponent :color="'#3290FA'" />
          </div>

        </div>
        <div class="topic__details">
          <div class="topic__details__title">
            <div class="topic__details__title__text">
              {{ topic.printScreen.title }}
            </div>
          </div>
          <div class="topic__details__url">
            <div class="topic__details__url__text">
              {{ topic.url.slice(0, 50) }}
              {{ topic.url.length > 50 ? '...' : '' }}
            </div>
          </div>
          <!-- <div class="topic__details__domain">
          <div class="topic__details__domain__text">
            {{topic.url}}
          </div>
        </div> -->
          <div class="topic__details__comments">
            <div class="topic__details__domain__comments">
              5
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import SpinnerBorderComponent from '@/components/SpinnerBorderComponent.vue'

export default {
  name: 'TopicList',
  components: {
    SpinnerBorderComponent
  },
  props: {
    topics: {
      type: Array,
      required: true
    }
  },
  methods: {
    test() {
      console.log('test')
    }
  }
}
</script>

<style lang="scss">
.topic {
  padding: 1em;
  display: flex;

  &:nth-of-type(even) {
    background-color: rgba(0, 0, 0, 0.03);
  }

  &__image {
    position: relative;
    flex: 1;
    padding: 1em;

    &__img {}

    &__loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
  }

  &__details {
    flex: 2;
    padding: 1em;

    &__title {
      margin-bottom: 1.5em;

      &__text {
        font-size: 4em;
      }
    }

    &__url,
    &__domain {
      margin-bottom: 1em;

      &__text {
        font-size: 2em;
      }
    }
  }
}
</style>