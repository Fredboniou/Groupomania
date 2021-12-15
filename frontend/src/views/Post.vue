<template>
    <div class="post">
        <h3>Tous les posts</h3>
        <button @click="getAllPosts">voir les posts</button>
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
        async getAllPosts() {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("http://localhost:3000/api/post", {
                headers: {
                    Authorization: "bearer " + token
                },
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>