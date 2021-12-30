<template>
    <div class="seeProfile">
        <div class="header">
            <router-link to="/posts">Revenir au fil d'actualité</router-link>
        </div>
        <div class="profile">
            <div class="profileName">
                <p>Vous visitez le profil de {{ profile.prenom }} {{profile.nom }}</p>
            </div>
            <div class="profileMail">
                <p>E-mail de contact : {{ profile.email }}</p>
            </div>
            <div class="profileBirthday">
                <p>Date de naissance : {{ profile.date_naissance }}</p>
            </div>
            <div class="profileBio">
                <p>Bio : {{ profile.bio }}</p>
            </div>
            <div class="profileCity">
                <p>Lieu de résidence : {{ profile.ville }}</p>
            </div>
            <div class="profileSchool">
                <p>Dernière école fréquentée : {{ profile.ecole }}</p>
            </div>
        </div>
    </div>
</template>



<script>
import axios from "axios";
export default {
    name: "ProfileComponents",
    data() {
        return {
            profile: [],
        }
    },
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                console.log("localStorage is ok");
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

</style>