<template>
    <header class="header">
        <div class="container">
            <div class="header__wrap">
                <span class="header__logo">2bash</span>
                <div class="header__btns">
                    <v-btn 
                        @click="$emit('toggleNewPost')"
                        class="header__new-post">Добавить историю</v-btn>
                    <v-btn>Войти</v-btn>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style>

</style>