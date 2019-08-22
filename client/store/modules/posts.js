

export default {
    namespaced: true,
    state: {
        posts: [
            {
                _id: "1",
                text: "Первый пост",
                date: "01.02.2019",
                author: "anonym",
                rating: 0,
                comments: [
                    "Какой-то комментарий",
                    "Еще комментарий"
                ]
            },
            {
                _id: "2",
                text: "Второй пост",
                date: "02.02.2019",
                author: "anonym2",
                rating: 0,
                comments: []
            },
            {
                _id: "3",
                text: "Третий пост",
                date: "03.02.2019",
                author: "anonym3",
                rating: 0,
                comments: []
            }

        ]
    },
    getters: {
        posts(state) {
            return state.posts;
        }
    },
    mutations: {
        
    },
    actions: {
        
    }
}