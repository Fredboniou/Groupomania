<template>
    <div class="allComments">
        <div class="header">
            <router-link to="/posts" aria-label="Retourner à la page d'accueil">Revenir au fil d'actualité</router-link>
        </div>
        <div class="createCom">
             <form @submit.prevent="createCom" autocomplete="off">
                <div class="com-container">
                    <textarea  v-model="form.content" name="textarea" id="comment" maxlength="300" autocomplete="off" placeholder="Ecrivez un commentaire..." aria-label="Entrez votre commentaire"></textarea>               
                </div>
                <div class="picture-container">
                    <label for="picture" aria-label="Ajoutez une image à votre commentaire">Ajoutez une image pour illustrer votre commentaire : </label>
                    <input type="file" accept="image/*" @change="previewImage" id="picture" name="image">
                    <div id="preview">
                        <img v-if="form.preview" :src="form.preview" />
                    </div> 
                </div>
                <button :disabled="!contentIsValid" aria-label="Publier" class="publication">Publier</button>
            </form>
        </div>
        <div class="noCom" v-if="this.coms == ''">
            <h1 aria-label="Aucun commentaire pour le moment">Aucun commentaire pour le moment</h1>
        </div>
        <div class="displayCom" v-else>
            <div class="msg">
                <h3 aria-label="page des commentaires">{{ ComMsg }}</h3>
            </div>
            <div class="allCom" v-for="(com, idx) in coms" :key="idx">
                <div class="seeCom">
                    <div class="userComName">
                        <img :src="com.userPic" :alt="`${com.prenom} ${com.nom}`" id="profilePic" v-if="com.userPic != null">
                        <router-link :to="`/profile/${com.userId}`" :aria-label="`Voir le profil de ${com.prenom} ${com.nom}`" id="userName"><h4>{{ com.prenom }} {{ com.nom }}</h4></router-link>
                    </div>
                    <div class="comContent">
                        <p :aria-label="`commentaire : ${com.content}`">{{ com.content }}</p><br>
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
</template>



<script>
import axios from "axios";

export default {
    name: "CommentsComponents",
    props: {
        ComMsg: String
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
                //const infos = {userId, postId, content};
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
        previewImage: function(event) {
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
        }
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
.publication {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  //width: 25%;
  //height: 50%;
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
    margin: auto;
    margin-top: 20px;
    width: 80%;
    border: 1px solid #000000;
    border-radius: 50px;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
.modifDel {
   border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  //width: 25%;
  //height: 50%;
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
// h3 {
//     border: 1px solid black;
//     padding: 20px;
//     border-radius: 50px;
//     background: linear-gradient(65deg, #f89e8c, #fc2e06);
// }
.seeCom {
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
    top: 5px;
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
    //border-bottom: 4px solid linear-gradient(65deg, #f89e8c, #fc2e06);
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
</style>