<template>
    <div class="allComments">
        <div class="header">
            <router-link to="/posts">Revenir au fil d'actualité</router-link>
        </div>
        <div class="createCom">
             <form @submit.prevent="createCom" autocomplete="off">
                <div class="com-container">
                    <textarea  v-model="form.content" name="textarea" id="comment" maxlength="300" autocomplete="off" placeholder="Ecrivez un commentaire..."></textarea>
                </div>
                <button :disabled="!contentIsValid">Publier</button>
            </form>
        </div>
        <div class="noCom" v-if="this.coms == ''">
            <h1>Aucun commentaire pour le moment</h1>
        </div>
        <div class="displayCom" v-else>
            <h3>{{ ComMsg }}</h3>
            <div class="allCom" v-for="(com, idx) in coms" :key="idx">
                <div class="seeCom">
                    <div class="userComName">
                        <router-link :to="`/profile/${com.userId}`" id="userName"><h4>{{ com.prenom }} {{ com.nom }}</h4></router-link>
                    </div>
                    <div class="comContent">
                        <p>{{ com.content }}</p>
                    </div>
                    <div class="dateCom">
                        <p>posté le {{ com.date }}</p>
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
            }
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
                const infos = {userId, postId, content};
                const self = this;
                console.log(postId);

                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                axios.post("http://localhost:3000/api/comment/", infos, {
                    headers: {
                        Authorization: "bearer " + token
                    },
                })
                .then(function(response) {
                    console.log(response);
                    self.getAllComs();
                    self.form.content = "";
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
button {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  width: 25%;
  height: 50%;
  //margin: 12px auto 0;
  margin: 10px auto;
  padding: 10px;
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
h3 {
    border: 1px solid black;
    padding: 20px;
    border-radius: 50px;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
.seeCom {
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
.userComName {
    width: 100%;
    border-bottom: 1px solid #fc2e06;
}
h4 {
    position: absolute;
    top: 10px;
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
</style>