<template>
    <div class="post">
        <h3>Tous les posts</h3>
        <button @click="getLocalStorage">voir les posts</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Post",
    
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                this.form = JSON.parse(localStorage.getItem("form"))
            } catch(error) {
                localStorage.removeItem("form");
            }
        }
    },
    methods: {
        getAllPosts() {
            axios.get("http://localhost:3000/api/post")
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                })
        },
        getLocalStorage() {
            let storage = JSON.parse(localStorage.getItem("form"))
            console.log(storage);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>