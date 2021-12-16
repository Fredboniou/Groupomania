<template>
    <div class="wall">
        <div class="head">
        <div class="user">{{ sayHello() }}</div> | 
        <div class="newPost"><router-link to="/newpost">Créer une publication</router-link></div>|
        <button @click="disconnect">Se déconnecter</button>
        </div>
        <div class="noPost" v-if="this.posts = []">
            <h1>Aucun post à afficher</h1>
        </div>
        <div class="post" v-else>
            <h3>Fil d'actualité</h3>
        </div>
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
    mounted() {
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
        sayHello() {
            const name = ((JSON.parse(localStorage.getItem("form"))).name);
            const firstname = ((JSON.parse(localStorage.getItem("form"))).firstname);
            return `${firstname} ${name}`
        },
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
        },
        disconnect() {
            localStorage.clear();
            this.$router.push("/");
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
    .head {
        display: flex;
        justify-content: flex-start;
    }
}
</style>