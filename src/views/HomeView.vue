<template>
  <div class="home">
    <div class="container">
      <TopicInputComponent/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TopicInputComponent from "@/components/TopicInputComponent.vue";

export default {
  name: 'HomeView',
  components: {
    TopicInputComponent,
    HelloWorld
  }
}
</script>
