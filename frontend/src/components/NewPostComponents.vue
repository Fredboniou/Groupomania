<template>
    <div class="newPost">
        <router-link to="/posts">Revenir au fil d'actualité</router-link>
        <h3>{{ NewPostMsg }}</h3>
        <div class="form-container">
            <form @submit.prevent="createPost" autocomplete="off">
                <div class="post-container">
                    <label for="content">Votre publication</label>
                    <textarea v-model="form.content" name="textarea" id="content" maxlength="300" autocomplete="off" required></textarea>
                </div>
                <button :disabled="!contentIsValid">Publier</button>
            </form>
        </div>
    </div>
</template>



<script>
import axios from "axios";

export default {
    name: "NewPostComponents",
    props: {
        NewPostMsg: String
    },
    data() {
        return {
            form: {
                userId: JSON.parse(localStorage.getItem("form")).userId,
                content: "",
            }
        }
    },
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                console.log("storage ok");
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
        contentIsValid() {
            return !!this.form.content;
        }
    },
    methods: {
        createPost() {
            const postIsValid = this.contentIsValid;

            if(postIsValid) {
                const data = JSON.parse(localStorage.getItem("form"));
                const token = data.token;
                const userId = this.form.userId;
                const content = this.form.content;
                const infos = {userId, content};
                const self = this;

                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                axios.post("http://localhost:3000/api/post/",infos, {
                    headers: {
                        Authorization: "bearer " + token
                    },
                })
                .then(function(response) {
                    self.$router.push("/posts")
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
        },
    }
    
}
</script>



<style lang="scss" scoped>
.form-container {
    display: flex;
}
form{
  margin: auto;
  width: 50%;
  min-width: 380px;
  max-width: 600px;
  background: white;
  display: grid;
  grid-template-rows: repeat(4, 104px);
  padding: 60px 45px 30px;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}
div {
  transition: 0.2s;
}
label {
  letter-spacing: 1px;
}
textarea {
  margin: 7px 0 7px;
  border: 1px solid transparent;
  background: rgb(235, 244, 242);
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  font-size: 1.1rem;
  padding-left: 10px;
  transition: 0.2s;

  &:focus {
      border: 1px solid #5ef9a4;
  }
}
button {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  width: 50%;
  height: 50%;
  //margin: 12px auto 0;
  margin: 100px auto 0;
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
a {
    text-decoration: none;
    color: #000;
    font-weight: bold;

    &:hover {
        color: #fc2e06;
    }
}
h3 {
    border: 1px solid black;
    padding: 20px;
    border-radius: 50px;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
</style>