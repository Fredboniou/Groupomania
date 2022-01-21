<template>
    <div class="head">
        <input type="checkbox" id="menu-checkbox" class="menu-checkbox" />
        <label for="menu-checkbox" class="menu-toggle">&equiv; {{ fullname() }}</label>
        <div class="userChoice">
            <div class="user"><span class="infoToUser">Vous êtes connecté(e) en tant que</span><router-link to="/createprofile">{{ fullname() }}</router-link></div><span class="separateUserChoice"> | </span>
            <div class="createProfile"><router-Link to="/createProfile">Modifier mon profil</router-Link></div>
            <div class="separateMenu"></div>
            <div class="newPost"><router-link to="/newpost">Créer une publication</router-link></div><span class="separateUserChoice"> | </span>
            <div class="separateMenu"></div>
            <button class="disconnect" @click="disconnect">Déconnexion</button>
        </div>
        <img src="../assets/logo-white-resize.png" alt="logo groupomania blanc" class="logo">
        <img src="../assets/logo-white-rs.png" alt="logo groupomania blanc" class="logoResp">
    </div>
</template>



<script>
import axios from "axios";

export default {
    name: "HeaderComponents",
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
    .userChoice {
        display: flex;
        justify-content: center;
        //margin-bottom: 20px;
        background: #ffffff;
        position: fixed;
        width: 100%;
        z-index: 2;
    }
    .logo {
        margin-top: 20px;
    }
    .post {
        margin-top: -30px;
    }
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
.separateMenu {
    display: none;
}
.logoResp {
    display: none;
}
.msg {
   margin-top: 20px;
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
    // position: absolute;
    // left: 10px;
    // top: 12px;
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
.modifDel, .disconnect {
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
    .logo {
        align-self: center;
    }
    .createProfile {
        display: initial;
    }
    .menu-checkbox {
        display: initial;
        opacity: 0;
        position: absolute;
        top: -1000px;
    }
    .userChoice {
            display: none;
            position: initial;
            z-index: 0;
        }
    .menu-checkbox:checked ~ .userChoice {
        width: 100%;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .disconnect {
        margin: auto;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .separateUserChoice {
        display: none;
    }
    .separateMenu {
        display: initial;
        margin: auto;
        background: #000000;
        height: 1px;
        width: 70%;
    }
    .menu-toggle {
        display: initial;
        padding: .5em 1em;
        font-weight: bold;
    }
    .head {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
@media all and (max-width : 385px) {
    .logo {
        display: none;
    }
    .logoResp {
        display: initial;
        height: 200px;
        align-self: center;
    }
    .post {
        margin-top: -80px;
    }
}
</style>