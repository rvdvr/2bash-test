<template>
    <main>
        <!-- Component Header -->
        <template>
            <header class="header">
                <div class="container">
                    <div class="header__wrap">
                        <span class="header__logo">2bash</span>
                        <div class="header__btns">
                            <v-btn 
                                @click="showWritePost"
                                class="header__new-post">Добавить историю</v-btn>
                            <v-btn>Войти</v-btn>
                        </div>
                    </div>
                </div>
            </header>
        </template>
        <!-- Component Write post -->
        <template v-if="showToggle">
            <section class="write-post">
                <div class="container">
                    <div class="write-post__wrap">
                        <h2 class="write-post__title">Вы можете написать здесь свой текст</h2>
                        <form class="write-post__form">
                            <textarea 
                                v-model="postTextValue" 
                                rows="7" 
                                class="write-post-form__textarea" 
                                placeholder="Введите текст"
                                ></textarea>
                            <v-btn 
                                @click="addNewPost"
                                class="write-post-form__btn-submit">Добавить</v-btn>
                        </form>
                    </div>
                </div>
            </section>
        </template>
        <!-- Filter for posts -->
        <template>
            <section class="filter">
                <div class="container">
                    <div class="filter__wrap">
                        <span class="filter__desc">Сортировать посты по</span>
                        <ul class="filter__list">
                            <li @click="sortOfDate" class="filter__item">[ дате ]</li>
                            <li @click="sortOfRating" class="filter__item">[ рейтингу ]</li>
                        </ul>
                    </div>
                </div>
            </section>
        </template>
        <!-- Posts list -->
        <section class="posts">
            <div class="container">
                <!-- Post -->
                <article v-for="(post, index) in reversedItems" 
                    v-bind:key="post._id" 
                    class="post">
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
            </div>
        </section>
    </main>
</template>

<script>

import Posts from "../api/posts.js";

export default {
    data() {
        return {
            postTextValue: '',
            showToggle: false
        };
    },
    meteor: {
        postList() {
            return Posts.find({});
        }
    },
    methods: {
        showWritePost() {
            return this.showToggle = !this.showToggle;
        },
        addNewPost() {
            let todayDate = () => {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let yyyy = today.getFullYear();

                return dd + '.' + mm + '.' + yyyy;
            }           

            let postsLength = this.postList.length;
            let newPost = {
                "text": this.postTextValue,
                "date": todayDate(),
                "author": "2bash+anon"+ postsLength,
                "rating": 0,
                "comments": []
            };

            Posts.insert(newPost);

            this.showWritePost();
            this.postTextValue = '';            
        },
        addComment(postId, postComments) {
            event.preventDefault();

            let inputValue = event.target[0].value;
            let totalComments = postComments.map(elem => elem);

            totalComments.push(inputValue);
            Posts.update(postId, { $set: { comments: totalComments }});
            event.target[0].value = '';
        },
        ratingMinus(postId, postRating) {
            Posts.update(postId, { $set: { rating: postRating - 1 }});
        },
        ratingPlus(postId, postRating) {
            Posts.update(postId, { $set: { rating: postRating + 1 }});
        },
        sortOfRating() {
            let sortArray = this.postList;

            return sortArray.sort((a, b) => a.rating - b.rating);
        },
        sortOfDate() {
            let sortArray = this.postList;

            return sortArray.sort((a, b) => {
                let aTempDate = a.date;
                let bTempDate = b.date;

                aTempDate = new Date(aTempDate.split('.').reverse().join('-'));
                bTempDate = new Date(bTempDate.split('.').reverse().join('-'));

                return aTempDate - bTempDate;
            });
        }
    },
    computed: {
        reversedItems() {
            return this.postList.slice().reverse();
        }
    }
}
</script>

<style scoped>
    
</style>
