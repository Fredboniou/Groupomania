<template>
    <div class="head">
        <input type="checkbox" id="menu-checkbox" class="menu-checkbox" />
        <label for="menu-checkbox" class="menu-toggle">&equiv; {{ fullname() }}</label>
        <div class="userChoice">
            <!-- <div class="user"><span class="infoToUser">Vous êtes connecté(e) en tant que</span><router-link to="/createprofile" title="modifier mon profil">{{ fullname() }}</router-link></div><span class="separateUserChoice"> | </span> -->
            <div class="user"><span class="infoToUser">Vous êtes connecté(e) en tant que</span><router-link :to="`/profile/${userId}`" title="modifier mon profil">{{ fullname() }}</router-link></div><span class="separateUserChoice"> | </span>
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

export default {
    name: "HeaderComponents",
    data() {
        return {
            posts: [],
            userId: JSON.parse(localStorage.getItem("form")).userId,
            admin: JSON.parse(localStorage.getItem("form")).admin,
        }
    },    
    methods: {
        fullname() {
            if (localStorage.getItem("form")) {
            const name = ((JSON.parse(localStorage.getItem("form"))).name);
            const firstname = ((JSON.parse(localStorage.getItem("form"))).firstname);
            return `${firstname} ${name}`
            }
        },
        disconnect() {
            localStorage.clear();
            this.$router.push("/");
        },
    }
}
</script>



<style lang="scss" scoped>
.userChoice {
    display: flex;
    justify-content: center;
    background: #ffffff;
    position: fixed;
    width: 100%;
    z-index: 2;
}
.logo {
    margin-top: 20px;
}
.createProfile {
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
.disconnect {
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
@media all and (max-width : 700px) {
    .infoToUser {
        display: none;
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
@media all and (max-width : 385px) {
    .logo {
        display: none;
    }
    .logoResp {
        display: initial;
        height: 200px;
        align-self: center;
    }
}
</style>