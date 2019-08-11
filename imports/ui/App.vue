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
        <!-- Posts list -->
        <section class="posts">
            <div class="container">
                <!-- Post -->
                <template v-for="(post, index) in reversedItems">
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
                                <span class="rating__dislike" @click="ratingMinus(index)">[ - ]</span>
                                <span class="rating__counter">{{ post.rating }}</span>
                                <span class="rating__like" @click="ratingPlus(index)">[ + ]</span>
                            </div>
                        </template>
                        <div class="comments">
                            <div v-if="post.comments.length > 0"
                                class="comments__wrap">
                                <ul class="comments__list">
                                    <li v-for="comment in post.comments"
                                        class="comments__item">{{ comment }}</li>
                                </ul>
                            </div>
                            <span v-else
                                class="comments__empty">Комментариев пока нет</span>
                            <div class="comments__add-new">
                                <form v-on:submit="addComment(index)">
                                    <input type="text" 
                                        placeholder="Комментировать">
                                    <button>Отправить</button>
                                </form>
                            </div>
                        </div>
                    </article>
                </template>
            </div>
        </section>
    </main>
</template>

<script>

export default {
    data() {
        return {
            postTextValue: '',
            showToggle: false,
            posts: [
                {
                    "_id": "1",
                    "text": "Текст первого поста",
                    "date": "10.08.2019",
                    "author": "Andrey",
                    "rating": 0,
                    "comments": [
                        "Интересная история",
                        "Ну такое.."
                    ]
                },
                {
                    "_id": "2",
                    "text": "Текст второго поста",
                    "date": "08.08.2019",
                    "author": "Sergey",
                    "rating": 0,
                    "comments": [

                    ]
                },
                {
                    "_id": "3",
                    "text": "Текст третьего поста",
                    "date": "09.08.2019",
                    "author": "Dmitriy",
                    "rating": 0,
                    "comments": [

                    ]
                }
            ]
        };
    },
    methods: {
        showWritePost() {
            return this.showToggle = !this.showToggle;
        },
        ratingMinus(indx) {
            return this.posts[indx].rating--;
        },
        ratingPlus(indx) {
            return this.posts[indx].rating++;
        },
        addComment(indx) {
            event.preventDefault();

            let inputValue = event.target[0].value;
            this.reversedItems[indx].comments.push(inputValue);
            event.target[0].value = '';
        },
        addNewPost() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();

            today = dd + '.' + mm + '.' + yyyy;

            let postsLength = this.posts.length;

            this.posts.push({
                "_id": postsLength,
                "text": this.postTextValue,
                "date": today,
                "author": "2bash+anon"+ postsLength,
                "rating": 0,
                "comments": ""
            });
            this.showWritePost();
            this.postTextValue = '';            
        }
    },
    computed: {
        reversedItems() {
            return this.posts.slice().reverse();
        }
    }
}
</script>

<style scoped>
    
</style>
