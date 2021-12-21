<template>
    <div class="wall">
        <div class="head">
            <div class="user"><router-link to="/createprofile">{{ fullname() }}</router-link></div> | 
            <div class="newPost"><router-link to="/newpost">Créer une publication</router-link></div>|
            <button @click="disconnect">Se déconnecter</button>
        </div>
        <div class="noPost" v-if="this.posts == []">
            <h1>Aucun post à afficher</h1>
        </div>
        <div class="post" v-else>
            <h3>Fil d'actualité</h3>
            <div class="separate"></div>
            <div class="allPosts" v-for="(post, idx) in posts" :key="idx">
                <div class="seePost">
                    <div class="userName">
                        <h4>{{ post.prenom }} {{ post.nom }}</h4>
                    </div>
                    <div class="postContent">
                        <p>{{ post.content }}</p>
                    </div>
                    <div class="dateLikes">
                        <div class="postDate">
                            <p>{{ post.date }}</p>
                        </div>
                        <div class="postLikes">
                            <p><i class="fas fa-thumbs-up"></i> {{ post.likes }}</p>
                        </div>
                    </div>
                    <div class="separate"></div>
                </div>
            </div>
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
        fullname() {
            const name = ((JSON.parse(localStorage.getItem("form"))).name);
            const firstname = ((JSON.parse(localStorage.getItem("form"))).firstname);
            return `${firstname} ${name}`
        },
        async getAllPosts() {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;
            const self = this;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios.get("http://localhost:3000/api/post/", {
                headers: {
                    Authorization: "bearer " + token
                },
            })
            .then(function(response) {
                self.posts = response.data.result;
                console.log(self.posts);
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
div {
    .post, .noPost {
        margin: auto;
        height: auto;
        width: 50%;
        min-width: 380px;
        max-width: 600;
        background: white;       
        padding: 60px 45px 30px;
        border-radius: 16px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        position: relative;
    }
    .head {
        display: flex;
        justify-content: flex-start;
    }
    // .seePosts {
    //     height: auto;
    // }
}
h3 {
    border: 1px solid black;
    padding: 20px;
}
.separate {
    margin: auto;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
    height: 4px;
    //border-bottom: 4px solid linear-gradient(65deg, #f89e8c, #fc2e06);
    width: 100%;
    //max-width: 600px;
}
</style>