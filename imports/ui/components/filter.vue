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

<script>
export default {
    //TODO Обработка кликов перенести во VUEX
}
</script>