<template>
    <div class="SpinnerBorderComponent"
    :style="{'border-color': color}"
    ></div>
</template>

<script>
export default {
    name: 'SpinnerBorderComponent',
    props: {
        color: {
            type: String,
            default: 'black'
        },
    }
}

</script>

<style lang="scss">

@keyframes spinner-border {
  to {
    transform: rotate(360deg) /* rtl:ignore */;
  }
}
.SpinnerBorderComponent{
  width: 2rem;
  height: 2rem;
  vertical-align: -0.125em;
  border-width: 0.25em;
  border: 0.25em solid currentColor;
  border-right-color: transparent !important;
  animation: 0.75s linear infinite spinner-border;
  border-radius: 50%;
  display: inline-block;
}


</style>