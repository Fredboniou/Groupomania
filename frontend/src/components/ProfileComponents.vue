<template>
    <div class="seeProfile">
        <div class="header">
            <router-link to="/posts">Revenir au fil d'actualité</router-link>
        </div>
        <div class="profile">
            <div class="profileName">
                <h3>Vous visitez le profil de {{ profile.prenom }} {{profile.nom }}</h3>
            </div>
            <div class="profileMail">
                <p><span class="description">E-mail de contact</span> : <a :href="`mailto:#`">{{ profile.email }}</a></p>
            </div>
            <div class="profileBirthday">
                <p><span class="description">Date de naissance</span> : <span v-if="profile.date_naissance==null">Non renseigné</span><span v-else>{{ profile.date_naissance }}</span></p>
            </div>
            <div class="profileBio">
                <p><span class="description">Bio</span> : <span v-if="profile.bio==null">Non renseigné</span><span v-else>{{ profile.bio }}</span></p>
            </div>
            <div class="profileCity">
                <p><span class="description">Lieu de résidence</span> : <span v-if="profile.ville==null">Non renseigné</span><span v-else>{{ profile.ville }}</span></p>
            </div>
            <div class="profileSchool">
                <p><span class="description">Dernière école fréquentée</span> : <span v-if="profile.ecole==null">Non renseigné</span><span v-else>{{ profile.ecole }}</span></p>
            </div>
            <router-link to="/createProfile" v-if="this.userId==this.$route.params.id">Modifier le profil</router-link>
        </div>
    </div>
</template>



<script>
import axios from "axios";
export default {
    name: "ProfileComponents",
    data() {
        return {
            userId: JSON.parse(localStorage.getItem("form")).userId,
            profile: [],
        }
    },
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                console.log(localStorage);
                console.log(this.userId);
                this.getProfile();
            } catch(error) {
                localStorage.removeItem("form");
                this.$router.push("/")
            }
        } else {
            alert("Veuillez vous identifier pour accéder à cette section")
            this.$router.push("/")
        }
    },
    methods: {
        getProfile() {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;
            const userId = this.$route.params.id;
            const self = this;
            console.log(userId);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios.get("http://localhost:3000/api/user/profile/" + userId, {
                headers: {
                    Authorization: "bearer " + token
                },
            })
            .then(function(response) {
                self.profile = response.data.result[0];
                console.log(self.profile);
            })
            .catch(function(error) {
                console.log(error)
            })
        },
    }
}
</script>



<style lang="scss" scoped>
a {
    text-decoration: none;
    color: #000;
    font-weight: bold;

    &:hover {
        color: #fc2e06;
    }
}
.profile {
    margin: 30px auto;
    height: auto;
    width: 50%;
    min-width: 380px;
    max-width: 600px;
    background: white;       
    padding: 60px 45px 30px;
    border-radius: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    position: relative;
}
.profileName {
    border: 1px solid black;
    padding: 0px;
    border-radius: 50px;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
.description {
    text-decoration: underline;
    font-weight: bold;
}
</style>