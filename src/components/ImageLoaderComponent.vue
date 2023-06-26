<template>
    <div class="ImageLoaderComponent">

        <!-- <img src="../assets/images/image-loader.jpg" alt=""> -->

        <div class="spinners-container">
            <div class="spinners-container__spinners">
                <SpinnerComponent :color="'red'" />
                <SpinnerComponent :color="'green'" />
                <SpinnerComponent :color="'blue'" />
                <SpinnerComponent :color="'orange'" />
            </div>
            <div class="spinners-container__text">
                <div class="spinners-container__text__content">
                    Trwa generowanie podglądu...
                </div>
                <div class="spinners-container__text__content">
                    Możesz już napisać komentarz
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import SpinnerComponent from '@/components/SpinnerComponent.vue'

export default {
    name: 'ImageLoaderComponent',
    components: {
        SpinnerComponent
    }
}
</script>

<style lang="scss">
.ImageLoaderComponent {
    position: relative;
    width: 100%;
    height: 25em;
    border: 1px solid rgba(0,0,0,0.1);
    background-color: rgba(0,0,0,0.01);
    border-radius: 1em;
}

.spinners-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &__spinners {
        display: flex;
        justify-content: center;
        margin-bottom: 1em;
        div {
            margin: 0 0.5em;
            width: 3em;
            height: 3em;
        }
    }

    &__text {
        text-align: center;

        &__content {
            font-size: 1.5em;
        }
    }


}
</style>

