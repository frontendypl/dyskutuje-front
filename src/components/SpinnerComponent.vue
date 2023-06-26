<template>
    <div class="SpinnerComponent"
    :style="{'color': color}"
    ></div>
</template>

<script>
export default {
    name: 'SpinnerComponent',
    props: {
        color: {
            type: String,
            default: 'black'
        },
    }
}

</script>

<style lang="scss">

@keyframes spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: none;
  }
}
.SpinnerComponent {
  width: 2em;
  height: 2em;
  display: inline-block;
  vertical-align: -0.125em;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: 0.75s linear infinite spinner-grow;
  animation: 0.75s linear infinite spinner-grow;
}

</style>