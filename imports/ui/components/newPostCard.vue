<template>
    <section v-if="showToggle" class="write-post">
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
                        class="write-post-form__btn-submit"
                    >Добавить</v-btn>
                    
                </form>
            </div>
        </div>
    </section>
</template>

<script>

//TODO: Отправка данных в БД через VUEX

export default {
    props: {
        showToggle: Boolean
    }
}
</script>