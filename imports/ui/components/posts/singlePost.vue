<template>
    <article class="post">
        <!-- PostHead -->
        <template>
            <div class="post__top">
                <span class="post__author">{{ post.author }}</span>
                <span class="post__date">{{ post.date }}</span>
            </div>
        </template>
        <!-- PostText -->
        <template>
            <div class="post__text">
                <p style="white-space: pre-line;">
                    {{ post.text }}
                </p>
            </div>
        </template>
        <!-- PostRatio -->
        <template>
            <div class="post__rating">
                <span class="rating__dislike" @click="ratingMinus(post._id, post.rating)">[ - ]</span>
                <span class="rating__counter">{{ post.rating }}</span>
                <span class="rating__like" @click="ratingPlus(post._id, post.rating)">[ + ]</span>
            </div>
        </template>
        <div class="comments">
            <div v-if="post.comments.length > 0"
                class="comments__wrap">
                <ul class="comments__list">
                    <li v-for="comment in post.comments"
                        class="comments__item">
                        <span class="comments__item-name">Anonym</span>
                        <span class="comments__item-text">{{ comment }}</span>
                    </li>
                </ul>
            </div>
            <span v-else
                class="comments__empty">Комментариев пока нет</span>
            <div class="comments__add-new">
                <form v-on:submit="addComment(post._id, post.comments)"  class="comments-add-new__form">
                    <input type="text" 
                        placeholder="Комментировать"  class="comments-add-new__text">
                    <button class="comments-add-new__submit">Отправить</button>
                </form>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        post: Object
    }
}
</script>