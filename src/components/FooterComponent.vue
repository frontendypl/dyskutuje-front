<template>
    <div class="FooterComponent">

        <div class="info">
            <div class="info__h3">
                <h3 class="info__h3__text">
                    Ta strona:
                </h3>
            </div>
            <div class="info__p">
                <p class="info__p__text">
                    Nie używa cookie
                </p>
            </div>
            <div class="info__p">
                <p class="info__p__text">
                    Nie śledzi
                </p>
            </div>
            <div class="info__p">
                <p class="info__p__text">
                    i nie przechowuje twoich danych
                </p>
            </div>
        </div>
        <router-link class="logo" :to="{ name: 'home' }">
            <img alt="test" class="logo__img" src="../assets/images/logo-330.png">
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'FooterComponent'
}
</script>

<style lang="scss" scoped>
.FooterComponent {
    padding: 1em;
    text-align: center;
}

.info {
    margin-bottom: 2em;
    &__h3 {
        &__text {
            font-size: 2em;
        }
    }

    &__p {
        &__text {
            font-size: 1.5em;
        }
    }
}

.logo {
    display: inline-block;


    &__img {
        display: block;
        width: 6em;
        margin: 0 auto;

    }
}
</style>