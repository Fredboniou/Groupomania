<template>
    <div class="comments">
        <HeaderComponents />
        <div class="allComments">
        <div class="header">
            <router-link to="/posts">Revenir au fil d'actualité</router-link>
        </div>
        <div class="createCom">
             <form @submit.prevent="createCom" autocomplete="off">
                <div class="com-container">
                    <textarea  v-model="form.content" name="textarea" id="comment" maxlength="300" autocomplete="off" placeholder="Ecrivez un commentaire..." aria-label="Entrez votre commentaire"></textarea>               
                </div>
                <div class="picture-container">
                    <label for="picture">Ajoutez une image pour illustrer votre commentaire : </label>
                    <input type="file" accept="image/*" @change="previewImage" id="picture" name="image">
                    <div id="preview">
                        <img v-if="form.preview" :src="form.preview" />
                    </div> 
                </div>
                <button :disabled="!contentIsValid" class="publication">Publier</button>
                <button v-if="form.preview != null && form.image != null" @click="deletePic" class="deletePic">Supprimer l'image</button>
            </form>
        </div>
        <div class="noCom" v-if="this.coms == ''">
            <h1>Aucun commentaire pour le moment</h1>
        </div>
        <div class="displayCom" v-else>
            <MsgComponents msg="Commentaires" />
            <div class="allCom" v-for="(com, idx) in coms" :key="idx">
                <div class="seeCom">
                    <div class="userComName">
                        <img :src="com.userPic" :alt="`${com.prenom} ${com.nom}`" id="profilePic" v-if="com.userPic != null">
                        <div class="replaceAvatar" v-else><span class="initials">{{ replaceAvatar(com.prenom, com.nom) }}</span></div>
                        <router-link :to="`/profile/${com.userId}`" :aria-label="`Voir le profil de ${com.prenom} ${com.nom}`" id="userName"><h4>{{ com.prenom }} {{ com.nom }}</h4></router-link>
                    </div>
                    <div class="comContent">
                        <p>{{ com.content }}</p><br>
                        <img v-if="com.image != null" :src="com.image" alt="">
                    </div>
                    <div class="dateCom">
                        <p>posté le {{ com.date }}</p>
                    </div>
                    <div class="ownerOptions" v-if="form.userId==com.userId || admin==1">
                        <button class="modifDel" @click="deleteCom(com.id)">Supprimer</button>
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
    name: "Comments",
    components: {
        HeaderComponents,
        MsgComponents,
    },
    data() {
        return {
            coms: [],
            form: {
                userId: JSON.parse(localStorage.getItem("form")).userId,
                content: "",
                preview: null,
                image: null,
            },
            admin: JSON.parse(localStorage.getItem("form")).admin,
        }
    },
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                console.log("localStorage ok");
                this.getAllComs();
            } catch(error) {
                localStorage.removeItem("form");
                this.$router.push("/")
            }
        } else {
            alert("Veuillez vous identifier pour accéder à cet partie")
            this.$router.push("/")
        }
    },
    computed: {
        contentIsValid() {
            return !!this.form.content;
        }
    },
    methods: {
        createCom() {
            const comIsValid = this.contentIsValid;

            if(comIsValid) {
                const data = JSON.parse(localStorage.getItem("form"));
                const token = data.token;
                const userId = this.form.userId;
                const postId = this.$route.params.id;
                const content = this.form.content;
                const image = this.form.image;
                const self = this;
                console.log(postId);

                let formData = new FormData();
                formData.append("userId", userId);
                formData.append("postId", postId);
                formData.append("content", content);
                formData.append("image", image)
                console.log(formData);

                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                axios.post("http://localhost:3000/api/comment/", formData, {
                    headers: {
                        Authorization: "bearer " + token
                    },
                })
                .then(function(response) {
                    console.log(response);
                    self.getAllComs();
                    self.form.content = "";
                    self.form.preview = "";
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
        },
        async getAllComs() {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;
            const postId = this.$route.params.id;
            const self = this;
            console.log(postId);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios.get("http://localhost:3000/api/comment/" + postId, {
                headers: {
                    Authorization: "bearer " + token
                },
            })
            .then(function(response) {
                self.coms = response.data.result;
                console.log(self.coms);
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        previewImage(event) {
            const self = this;
            let input = event.target;
            if (input.files) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    self.form.preview = e.target.result;
                }
                self.form.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
                console.log(self.form.image.name);
            }
        },
        deleteCom(id) {
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;
            
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            if (confirm("Voulez vous supprimer ce commentaire ?")) {
                axios.delete("http://localhost:3000/api/comment/" + id, {
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
        deletePic() {
            this.form.preview = null;
            this.form.image = null;
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
textarea {
  margin: 7px 0 7px;
  border: 1px solid black;
  background: rgb(235, 244, 242);
  height: 100%;
  width: 60%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  font-size: 1.1rem;
  padding-left: 10px;
  transition: 0.2s;
}
.publication, .deletePic {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  margin: 12px auto 0;
  margin: 10px auto;
  padding: 2px;
  border-radius: 150px;
  font-size: 1.2rem;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
      filter: brightness(105%);
      transform: translateX(2px);
  }

  &:disabled {
      transition: none;
      transform: none;
      filter: none;
      background: grey;
      cursor: default;
  }
}
.msg {
    margin-top: 20px;
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
    top: 4px;
    font-size: 1.5rem;
}
.modifDel {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  margin: 12px auto 0;
  margin: 10px auto;
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
.seeCom {
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
.userComName {
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
h4 {
    position: absolute;
    top: 0px;
    left: 110px;
}
.dateCom {
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
a {
    text-decoration: none;
    color: #000;
    font-weight: bold;

    &:hover {
        color: #fc2e06;
    }
}
img {
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
</style>