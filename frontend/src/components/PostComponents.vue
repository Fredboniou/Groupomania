<template>
    <div class="wall">
        <div class="head">
            <input type="checkbox" id="menu-checkbox" class="menu-checkbox" />
            <label for="menu-checkbox" class="menu-toggle"><i class="fas fa-user" id="fa-user-mobile"></i> {{ fullname() }}</label>
            <div class="userChoice">
                <div class="user"><span class="infoToUser">Vous êtes connecté(e) en tant que</span><router-link to="/createprofile">{{ fullname() }}</router-link></div>
                <div class="createProfile"><router-Link to="/createProfile">Modifier mon profil</router-Link></div>
                <div class="userResp"><router-link to="/createprofile">{{ fullname() }}</router-link></div><span class="separateUserChoice"> | </span>
                <div class="newPost"><router-link to="/newpost" aria-label="Créez une publication">Créer une publication</router-link></div><span class="separateUserChoice"> | </span>
                <button class="disconnect" @click="disconnect" aria-label="Déconnectez vous">Déconnexion</button>
            </div>
        </div>
        <div class="noPost" v-if="this.posts == ''">
            <h1 aria-label="Aucun post à afficher">Aucun post à afficher</h1>
        </div>
        <div class="post" v-else>
            <div class="msg">
                <h3 aria-label="Page du fil d'actualité">Fil d'actualité</h3>
            </div>
            <div class="allPosts" v-for="(post, idx) in posts" :key="idx">
                <div class="seePost">
                    <div class="userName">                       
                            <img :src="post.userPic" :alt="`${post.prenom} ${post.nom}`" id="profilePic" v-if="post.userPic != null">
                            <div class="replaceAvatar" v-else><span class="initials">{{ replaceAvatar(post.prenom, post.nom) }}</span></div>
                            <router-link :to="`/profile/${post.userId}`" id="userName" :aria-label="`Visitez le profil de ${post.prenom} ${post.nom}`"><h4>{{ post.prenom }} {{ post.nom }}</h4></router-link>
                    </div>
                    <div class="postContent">
                        <p :aria-label="`Le post dit : ${post.content}`">{{ post.content }}</p><br>
                        <img v-if="post.postPic != null" :src="post.postPic" alt="" id="postPicture">
                    </div>
                    <div class="dateLikes">
                        <div class="postDate">
                            <p>posté {{ post.date }}</p>
                        </div>
                        <!-- <div class="postLikes">
                            <p><i class="fas fa-thumbs-up"></i> {{ post.likes }}</p>
                        </div> -->
                    </div>
                    <div class="comments">
                        <router-link :to="`/post/${post.id}`" aria-label="Voir ou laisser un commentaire" id="comments">Voir/laisser un commentaire</router-link>
                    </div>
                    <div class="ownerOptions" v-if="userId==post.userId || admin==1">
                        <router-link :to="`/modifpost/${post.id}`" v-if="userId==post.userId"><button class="modifDel" aria-label="Modifiez votre post">Modifier</button></router-link>
                        <button class="modifDel" @click="deletePost(post.id)" aria-label="Supprimez votre post">Supprimer</button>
                    </div>
                </div>
                <div class="separate"></div>
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
        fullname() {
            if (localStorage.getItem("form")) {
            const name = ((JSON.parse(localStorage.getItem("form"))).name);
            const firstname = ((JSON.parse(localStorage.getItem("form"))).firstname);
            return `${firstname} ${name}`
            }
        },
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
        disconnect() {
            localStorage.clear();
            this.$router.push("/");
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
            return `${initFirstName}-${initName}`
        },
    }
}
</script>



<style lang="scss" scoped>
    //.post, .noPost 
    .seePost {
        margin: 30px auto;
        height: auto;
        width: 50%;
        //min-width: 380px;
        max-width: 600px;
        background: white;       
        padding: 60px 45px 30px;
        border-radius: 16px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        position: relative;
    }
    .userChoice {
        display: flex;
        justify-content: center;
    }
    // .head {
    //     display: flex;
    //     justify-content: center;
    // }
    .createProfile {
        display: none;
    }
    .dateLikes {
        display: flex;
        justify-content: space-around;
        border-top: 1px solid #fc2e06;
    }
    .userResp {
        display: none;
    }

.menu-checkbox {
    display: none;
}
.menu-toggle {
    display: none;
}
// #fa-user-mobile {
//     display: none;
// }
// #fa-user-screen {
//     display: none;
// }
// h3 {
//     border: 1px solid black;
//     padding: 20px;
//     border-radius: 50px;
//     background: linear-gradient(65deg, #f89e8c, #fc2e06);
// }
.msg{
   margin: auto;
   margin-top: 20px;
   width: 80%;
   border: 1px solid #000000;
   border-radius: 50px;
   background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
.separate {
    margin: auto;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
    height: 4px;
    //border-bottom: 4px solid linear-gradient(65deg, #f89e8c, #fc2e06);
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
    position: absolute;
    left: 7px;
    top: 12px;
    font-size: 1.5rem;
}
h4 {
    position: absolute;
    top: 5px;
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
.modifDel, .disconnect {
    margin-left: 10px;
    border: none;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
    //height: 10%;
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
@media all and (max-width : 700px) {
    .infoToUser {
        display: none;
    }
    span {
        display: none;
    }
    .initials {
        display: initial;
    }
    .createProfile {
        display: initial;
    }
    // .infoToUser {
    //     display: initial;
    // }
    .menu-checkbox {
        display: initial;
        opacity: 0;
        position: absolute;
        top: -1000px;
    }
    .userChoice {
            display: none
        }
    .menu-checkbox:checked ~ .userChoice {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .separateUserChoice {
        display: none;
    }
    .menu-toggle {
        display: initial;
        padding: .5em 1em;
        font-weight: bold;
    }
    .head {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .user {
        display: none;
    }
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
</style>