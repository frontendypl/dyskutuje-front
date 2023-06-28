<template>
    <div class="CommentComponent component">
        <div class="comment">
            <div class="comment__nick">
                <div class="comment__nick__text">
                    {{ comment.nickName }}
                </div>
            </div>
            <div class="comment__time">
                <div class="comment__time__text">
                    <!-- {{ Date(comment.createdAt).toLocaleString('PL-pl').split('GMT')[0] }} -->
                    {{ comment.createdAt | timeSince }}
                </div>
            </div>
            <div class="comment__content">
                <div class="comment__content__text">
                    {{ comment.text }}
                </div>
            </div>
            <div class="comment__answer-button" v-if="!comment.parent">
                <button class="comment__answer-button__button" @click="handleFormActive"
                    :title="!formActive ? 'odpowiedz' : 'zamknij'">

                    <svg v-if="!formActive" xmlns="http://www.w3.org/2000/svg" fill="#3290FA" height="1em"
                        viewBox="0 0 512 512">
                        <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="#3290FA" height="1em" viewBox="0 0 640 512">
                        <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L512.9 376.7C552.2 340.2 576 292.3 576 240C576 125.1 461.4 32 320 32c-67.7 0-129.3 21.4-175.1 56.3L38.8 5.1zM64 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c37 0 72.3-6.4 104-17.9L82.9 161.3C70.7 185.6 64 212.2 64 240z" />
                    </svg>

                </button>
            </div>
            <div class="comment__form" v-if="formActive">
                <slot name="commentForm"></slot>
            </div>

        </div>

    </div>
</template>

<script>
//Komentarze dobrze by było też pobierać np co minute

//Komentarze mapowac w computed, date zamieniać na czas np 10min temu. Wtedy będzie się to na bierząco zmieniało bez odświerzania.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date?retiredLocale=pl#calculating_elapsed_time

//KOmentarze posortowane od najnowszych ALE dla podkomentarzy odwrotnie, może to w samych CSS'ach np odwrotnym flexem zrobić

export default {
    name: 'CommentComponent',
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            formActive: false
        }
    },
    methods: {
        handleFormActive() {
            this.formActive = !this.formActive
        }
    },
    filters: {
        timeSince(date) {

            var seconds = Math.floor((new Date() - new Date(date)) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " lat";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " misięcy";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " dni";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " godzin";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minut";
            }

            return Math.floor(seconds) + " sekund";
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.comment {
    padding: 1em;
    background-color: rgba(#6A8166, 0.08);
    margin-bottom: 3em;
    border-radius: 2em;

    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    &__nick {
        margin-right: 1em;

        &__text {
            font-size: 1.6em;
            font-weight: 500;
        }
    }

    &__time {
        &__text {
            font-size: 1.6em;
            font-weight: 300;
        }
    }

    &__content {
        width: 100%;
        margin-top: 1em;

        &__text {
            font-size: 3em;
            font-weight: 500;
            word-wrap: break-word
        }
    }

    &__answer-button {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        &__button {
            cursor: pointer;
            font-size: 4em;
            @media screen and (min-width: 1000px) {
                font-size: 3em;
            } 
            font-weight: 700;
            border: none;
            background: none;
        }
    }

    &__form {
        width: 100%;
        margin: 0 0 0 auto;
    }
}</style>