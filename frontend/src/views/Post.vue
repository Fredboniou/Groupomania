<template>
    <div class="noPost" v-if="this.posts = []">
        <h1>Aucun post à afficher</h1>
    </div>
    <div class="post" v-else>
        <h3>Fil d'actualité</h3>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Post",
    data() {
        return {
            posts: [],
        }
    },
    
    mounted: function() {
        if(localStorage.getItem("form")) {
            try {
                this.getAllPosts()
            } catch(error) {
                localStorage.removeItem("form");
                this.$router.push("/")
            }
        } else {
            this.$router.push("/")
        }
    },
    methods: {
        async getAllPosts() {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios.get("http://localhost:3000/api/post/", {
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
div{
    .post, .noPost {
        margin: auto;
        width: 50%;
        min-width: 380px;
        max-width: 600px;
        background: white;       
        padding: 60px 45px 30px;
        border-radius: 16px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        position: relative;
    }
    .post {
        display: grid;
        grid-template-rows: repeat(4, 104px);
    }
}
</style>