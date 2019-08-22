<template>
    <section class="posts">
        <div class="container">
            <!-- Post -->
            <singlePost v-for="post in reversedItems" :post="post" />
        </div>
    </section>
</template>

<script>
import singlePost from "./singlePost";

export default {
    components: {
        singlePost
    },
    computed: {
        reversedItems() {
            let postList = this.$store.getters['posts/posts']
            
            return postList.slice().reverse();           
        }
    }
}
</script>