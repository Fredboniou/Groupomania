<template>
    <div class="seeProfile">
        <div class="header">
            <router-link to="/posts">Revenir au fil d'actualité</router-link>
        </div>
        <div class="profileName">
            <h3 :aria-label="`Vous visitez le profil de ${profile.prenom} ${profile.nom}`">{{ profile.prenom }} {{profile.nom }}</h3>
        </div>
        <div class="profile">
            <div class="profileMail">
                <p><span class="description" aria-label="Adresse mail de contact">E-mail de contact</span><span class="points"> : </span><a :href="`mailto:#`" :aria-label="`${profile.email}`">{{ profile.email }}</a></p>
            </div>
            <div class="profileBirthday">
                <p><span class="description">Date de naissance</span><span class="points"> : </span><span v-if="profile.date_naissance==null" aria-label="Non renseigné">Non renseigné</span><span v-else :aria-label="`${profile.date_naissance}`">{{ profile.date_naissance }}</span></p>
            </div>
            <div class="profileBio">
                <p><span class="description">Bio</span><span class="points"> : </span><span v-if="profile.bio==null" aria-label="Non renseigné">Non renseigné</span><span v-else :aria-label="`${profile.bio}`">{{ profile.bio }}</span></p>
            </div>
            <div class="profileCity">
                <p><span class="description">Lieu de résidence</span><span class="points"> : </span><span v-if="profile.ville==null" aria-label="Non renseigné">Non renseigné</span><span v-else :aria-label="`${profile.ville}`">{{ profile.ville }}</span></p>
            </div>
            <div class="profileSchool">
                <p><span class="description">Dernière école fréquentée</span><span class="points"> : </span><span v-if="profile.ecole==null" aria-label="Non renseigné">Non renseigné</span><span v-else :aria-label="`${profile.ecole}`">{{ profile.ecole }}</span></p>
            </div>
            <div class="profilePicture" v-if="profile.image != null">
                <img :src="profile.image" :aria-label="`photo de profil de ${profile.prenom} ${profile.nom}`" />
            </div>
            <div class="ownerOptions" v-if="this.userId==this.$route.params.id || this.admin==1" >
                <router-link to="/createProfile" v-if="this.userId==this.$route.params.id"><button>Modifier le profil</button></router-link>
                <button @click="deleteProfile">Supprimer le profil</button>
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
            userId: JSON.parse(localStorage.getItem("form")).userId,
            admin: JSON.parse(localStorage.getItem("form")).admin,
            profile: [],
        }
    },
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                console.log(localStorage);
                console.log(this.userId);
                console.log(this.admin);
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
        deleteProfile() {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;
            const userId = this.$route.params.id;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            if (confirm("Vous êtes sur le point de supprimer votre profil. Tous les posts et commentaires qui y sont rattachés seront supprimés. Voulez vous continuer ?")) {

                axios.delete("http://localhost:3000/api/user/" + userId, {
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
            if (this.admin == 1) {
                        this.$router.push("/posts")
                    } else {
                        this.$router.push("/")
                    }
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
    width: 50%;
    max-width: 600px;
    background: white;       
    padding: 60px 45px 30px;
    border-radius: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    position: relative;
}
.profileName {
    font-family: 'Amaranth', sans-serif;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80%;
    border: 1px solid black;
    padding: 0px;
    border-radius: 50px;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
.description {
    text-decoration: underline;
    font-weight: bold;
}
img {
    overflow : hidden;
	-webkit-border-radius : 50px;
	-moz-border-radius : 50px;
	border-radius: 50%;
	width: 150px;
    height: 150px;
    margin-bottom: 30px;
}
button {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  margin-left: 10px;
  padding: 2px;
  border-radius: 150px;
  font-size: 1rem;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
      filter: brightness(105%);
      transform: translateX(2px);
  }
}
@media all and (max-width : 536px) {
    .profile {
        width: 100%;
        padding: 60px 0 30px;
    }
    .profileName {
        width: 100%;
    }
    p {
        display: flex;
        flex-direction: column;
    }
    .points {
        display: none;
    }
    .description {
        margin-bottom: 10px;
    }
    button {
        margin-top: 5px;
    }
}
</style>