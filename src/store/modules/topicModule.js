import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            /**
             * The list of all topics
             */
            topics: [],
            /**
             * single topic, this data will be presented on TopicView
             */
            activeTopic: {
                _id: '',
                url: '',
                createdAt: '',
                updatedAt: '',
                comments: []
            },
            // Array of all comments belongs to activeTopic, presented on TopicView
            comments: [],
            //Array of all comments from all topics
            allComments: [],
            //Array of all screenshots
            printScreens: [],
            /**
             * Statuses for requests, if status is pending request will not be send
             */
            status: {
                setTopics: 'ready',
                setPrintScreens: 'ready',
                getTopicData: 'ready',
                setAllComments: 'ready'
            }
        }
    },
    getters: {
        /**
         * Getter, return activeTopic's screenshot to present in topicView
         * @returns {object}
         */
        activeTopicPrintScreen(state) {
            return state.printScreens.find(el => el.topic === state.activeTopic._id)
        },
        /**
         * Return array of comments objects with their subcomments
         * @returns {array}
         */
        commentsWithSubComments(state) {
            const comments = state.comments.length ? [...state.comments] : [...state.activeTopic.comments]
            comments.forEach(comment => {
                const subComments = comments.filter(el => comment._id === el.parent)
                comment.subComments = [...subComments]
                comment.subComments.reverse()
            })
            return comments
        },
        /**
         * Return array of topics objects with their screenshots
         * @returns {array}
         */
        topicsWithPrintScreens(state) {
            const topics = [...state.topics]
            const printScreens = [...state.printScreens]
            topics.forEach(topic => {
                const printScreen = printScreens.find(el => topic._id === el.topic)
                topic.printScreen = { ...printScreen }

                const comments = state.allComments.filter(el => el.topic === topic._id)
                topic.comments = [...comments]
            })
            return topics
        },
    },
    mutations: {
        setTopics(state, payload) {
            state.topics = [...payload]
        },
        setActiveTopic(state, payload) {
            state.activeTopic = { ...payload }
        },
        //set Comments for activeTopic object
        setComments(state, payload) {
            state.comments = [...payload]
        },
        setAllComents(state, payload) {
            state.allComments = [...payload]
        },
        setPrintScreens(state, payload) {
            state.printScreens = [...payload]
        }
    },
    actions: {
        /**
         * asynchronous method to get topics data from API
         */
        async setTopics({ state, rootGetters, commit, dispatch }) {
            if (state.status.setTopics === 'pending') return false

            try {
                state.status.setTopics = 'pending'
                const response = await axios.get(`${rootGetters.apiUrl}/topics`)
                commit('setTopics', response.data)
                state.status.setTopics = 'ready'

                dispatch('saveToStorage', {
                    name: 'topics',
                    data: response.data
                })

            } catch (e) {
                state.status.setTopics = 'ready'
            }
        },
        /**
         * asynchronous method to sent data to the API and create new topic in database
         */
        postNewTopic({ state, rootGetters, commit, dispatch }, url) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.post(`${rootGetters.apiUrl}/topics`, {
                        url
                    })

                    resolve(response.data)
                } catch (e) {
                    reject(e.response.data)
                }

            })
        },
        /**
         * asynchronous method to get data of single topic from API
         * @param {string} topicId 
         */
        async getTopicData({ state, rootGetters, commit }, topicId) {
            if (state.status.setTopics === 'pending') return false
            try {
                state.status.setTopics = 'pending'
                const response = await axios.get(`${rootGetters.apiUrl}/topics/${topicId}`)
                commit('setActiveTopic', {
                    ...response.data.topic,
                    comments: []
                })
                commit('setComments', response.data.comments)
                state.status.setTopics = 'ready'
            } catch (e) {
                state.status.setTopics = 'ready'

            }
        },
        /**
         * action using only to commit muttations and fill activeTopic object
         * @param {object} payload 
         */
        setActiveTopic({ commit }, payload) {
            commit('setActiveTopic', payload)
        },
        /**
         * clear activeTopic object, fill empty keys
         */
        resetActiveTopic({ commit }) {
            commit('setActiveTopic', {
                _id: '',
                url: '',
                createdAt: '',
                updatedAt: '',
                comments: []
            })
        },
        /**
         * asynchronous method to sent new comment 
         * @param {string} text new comment text
         * @param {string} nickName nick of commentc author
         * @param {string} parent id of parent comment if new comment is subcomment
         * @returns {Promise>}
         */
        postNewComment({ state, rootState, rootGetters, commit, dispatch }, { text, nickName, parent = null }) {
            return new Promise(async (resolve, reject) => {
                try {
                    // commit('setNewCommentErrors', {})
                    const response = await axios.post(`${rootGetters.apiUrl}/comments`, {
                        text,
                        nickName,
                        parent,
                        topic: state.activeTopic._id
                    })
                    dispatch('getTopicData', state.activeTopic._id)

                    resolve()

                } catch (e) {
                    // commit('setNewCommentErrors', e.response.data.errors)
                    reject({ errors: e.response.data.errors })
                }
            })
        },
        /**
         * set Comments for activeTopic object
         * @param {object} payload 
         */
        setComments({ commit }, payload) {
            commit('setComments', payload)
        },
        /**
         * asynchronous method to get all comments objects from API
         */
        async setAllComments({ rootGetters, commit, state }) {
            if (state.status.setAllComents === 'pending') return false

            try {
                state.status.setAllComents = 'pending'
                const response = await axios.get(`${rootGetters.apiUrl}/comments`)
                commit('setAllComents', response.data)
                state.status.setAllComents = 'ready'
                dispatch('saveToStorage', {
                    name: 'allComments',
                    data: response.data
                })
            } catch (e) {
                state.status.setAllComents = 'ready'
            }
            // commit('setAllComents',payload)
        },
        /**
         * asynchronous method to get all screenshots objects from API
         */
        async setPrintScreens({ state, rootGetters, dispatch, commit }, payload) {
            if (state.status.setPrintScreens === 'pending') return false

            try {
                state.status.setPrintScreens = 'pending'
                const response = await axios.get(`${rootGetters.apiUrl}/printScreens`)
                commit('setPrintScreens', response.data)
                state.status.setPrintScreens = 'ready'
                dispatch('saveToStorage', {
                    name: 'printScreens',
                    data: response.data
                })
            } catch (e) {
                state.status.setPrintScreens = 'ready'
            }
        },
        /**
         * save data to localstorage, can be used with various keys and datasets
         * @param {string} name key of item, name of dataset in localstorage 
         * @param {object} data dataset
         */
        saveToStorage({ state, rootGetters, commit }, { name, data }) {
            localStorage.setItem(name, JSON.stringify(data))

        },
        /**
         * get all topics from localstorage to improve website starting
         */
        loadTopicsFromStorage({ commit }) {
            console.log('storage setTopics')
            const topics = localStorage.getItem('topics')
            commit('setTopics', topics ? JSON.parse(topics) : [])
        },
        /**
         * get all screenshots from localstorage to improve website starting
         */
        loadPrintScreensFromStorage({ commit }) {
            console.log('storage printScreens')
            const printScreens = localStorage.getItem('printScreens')
            commit('setPrintScreens', printScreens ? JSON.parse(printScreens) : [])
        },
    },

}