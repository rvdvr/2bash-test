<template>
    <main>
        <!-- Component Header -->
        <Header @toggleNewPost="showWritePost"/>
        <!-- Component Write post -->
        <newPostCard :showToggle="showToggle"/>
        <!-- Filter for posts -->
        <FilterComponent />
        <!-- Posts list -->
        <postList />
    </main>
</template>

<script>

// import Posts from "../api/posts.js";

import Header from "./components/header";
import newPostCard from "./components/newPostCard";
import FilterComponent from "./components/filter";
import postList from "./components/posts/postList"

export default {
    data() {
        return {
            postTextValue: '',
            showToggle: false
        };
    },
    components: {
        Header,
        newPostCard,
        FilterComponent,
        postList
    },
    meteor: {
        postList() {
            // return Posts.find({});
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
    // computed: {
    //     reversedItems() {
    //         let postList = this.$store.getters['posts/posts']
            
    //         return postList.slice().reverse();           
    //     }
    // }
}
</script>

<style scoped>
    
</style>
