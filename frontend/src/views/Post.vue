<template>
    <div class="allPosts">
        <HeaderComponents />
        <div class="wall">
            <div class="noPost" v-if="this.posts == ''">
                <h1>Aucun post à afficher</h1>
            </div>
            <div class="post" v-else>
                <MsgComponents msg="fil d'actualité" />
                <div class="allPosts" v-for="(post, idx) in posts" :key="idx">
                    <div class="seePost">
                        <div class="userName">                       
                            <img :src="post.userPic" :alt="`${post.prenom} ${post.nom}`" id="profilePic" v-if="post.userPic != null" :aria-label="`photo de profil de ${post.prenom} ${post.nom}`">
                            <div class="replaceAvatar" v-else><span class="initials">{{ replaceAvatar(post.prenom, post.nom) }}</span></div>
                            <router-link :to="`/profile/${post.userId}`" id="userName" :aria-label="`Visitez le profil de ${post.prenom} ${post.nom}`"><h4>{{ post.prenom }} {{ post.nom }}</h4></router-link>
                        </div>
                        <div class="postContent">
                            <p>{{ post.content }}</p><br>
                            <img v-if="post.postPic != null" :src="post.postPic" alt="" id="postPicture">
                        </div>
                        <div class="date">
                            <div class="postDate">
                                <p>posté {{ post.date }}</p>
                            </div>
                        </div>
                        <div class="comments">
                            <router-link :to="`/post/${post.id}`" id="comments">Voir/laisser un commentaire</router-link>
                        </div>
                        <div class="ownerOptions" v-if="userId==post.userId || admin==1">
                            <router-link :to="`/modifpost/${post.id}`" v-if="userId==post.userId"><button class="modifDel">Modifier</button></router-link>
                            <button class="modifDel" @click="deletePost(post.id)">Supprimer</button>
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
import HeaderComponents from "@/components/HeaderComponents.vue";
import MsgComponents from "@/components/MsgComponents.vue";

export default {
    name: "Post",
    components: {
        HeaderComponents,
        MsgComponents,
    },
    data() {
        return {
            posts: [],
            userId: JSON.parse(localStorage.getItem("form")).userId,
            admin: JSON.parse(localStorage.getItem("form")).admin,
        }
    },    
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                this.getAllPosts()
                console.log(this.userId);
                console.log(this.admin);
            } catch(error) {
                localStorage.removeItem("form");
                this.$router.push("/")
            }
        } else {
            alert("Veuillez vous identifier pour accéder à cette partie")
            this.$router.push("/")
        }
    },
    computed: {
        
    },
    methods: {
        getAllPosts() {
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
        deletePost(id) {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            if (confirm("Vous êtes sur le point de supprimer votre post. Tous les commentaires qui y sont rattachés seront supprimés. Voulez vous continuer ?")) {

                axios.delete("http://localhost:3000/api/post/" + id, {
                    headers: {
                        Authorization: "bearer " + token
                    },
                })
                .then(function(response) {
                    window.location.reload();
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
        },
        replaceAvatar(firstname, name) {
            const initFirstName = firstname.substring(0, 1).toUpperCase();
            const initName = name.substring(0, 1).toUpperCase();
            return `${initFirstName} ${initName}`
        },
    }
}
</script>

<style lang="scss" scoped>
.seePost {
        margin: 30px auto;
        height: auto;
        width: 50%;
        max-width: 600px;
        background: white;       
        padding: 60px 45px 30px;
        border-radius: 16px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        position: relative;
}
.post {
    margin-top: -30px;
}
.date {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #fc2e06;
    }
.separate {
    margin: auto;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
    height: 4px;
    width: 50%;
    max-width: 600px;
}
.userName {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid #fc2e06;
    margin-top: 5px;
}
#profilePic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    margin-bottom: 5px;
}
.replaceAvatar {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    margin-bottom: 5px;
    background: #000000;
}
.initials {
    font-size: 1rem;
}
h4 {
    position: absolute;
    top: 0px;
    left: 110px;
}
#comments {
    text-decoration: none;
}
a {
    text-decoration: none;
    font-weight: bold;
    color: #000;
    margin-right: 10px;
    margin-left: 10px;

    &:hover {
        color: #fc2e06;
    }
}
.modifDel {
    margin-left: 10px;
    border: none;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
    padding: 2px;
    border-radius: 150px;
    font-size: 1rem;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      filter: brightness(105%);
      transform: translateX(2px);
    }
}
#postPicture {
    width: 90%;
}
@media all and (max-width : 480px) {
    #profilePic, .replaceAvatar {
        display: none;
    }
    .userName {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid #fc2e06;
    margin-top: 5px;
    }
    h4 {
        position: absolute;
        top: 5px;
        left: 50px;
    }
    .modifDel {
        margin-top: 5px;
    }
}
@media all and (max-width : 385px) {
    .post {
        margin-top: -80px;
    }
}
</style>