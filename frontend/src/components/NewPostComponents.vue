<template>
    <div class="newPost">
        <router-link to="/posts">Revenir au fil d'actualité</router-link>
        <div class="msg">
            <h3>{{ NewPostMsg }}</h3>
        </div>
        <div class="form-container">
            <form @submit.prevent="createPost" autocomplete="off">
                <div class="post-container">
                    <textarea v-model="form.content" name="textarea" id="content" maxlength="300" autocomplete="off" placeholder="Votre publication..." required aria-required="true" aria-label="Votre publication"></textarea>                 
                </div>
                <div class="picture-container">
                    <label for="picture">Ajoutez une image pour illustrer votre post : </label>
                    <input type="file" accept="image/*" @change="previewImage" id="picture" name="image">
                    <div id="preview">
                        <img v-if="form.preview" :src="form.preview" />
                    </div>
                </div>
                <button :disabled="!contentIsValid">Publier</button>
                <button v-if="form.preview != null" @click="deletePic">Supprimer l'image</button>
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
                preview: null,
                image: null,
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
                const image = this.form.image;
                const self = this;

                let formData = new FormData();
                formData.append("userId", userId);
                formData.append("content", content);
                formData.append("image", image);
                console.log(formData);


                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                axios.post("http://localhost:3000/api/post/", formData, {
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
        deletePic() {
            this.form.preview = null;
        }
    }
    
}
</script>



<style lang="scss" scoped>
.form-container {
    display: flex;
}
form {
  margin: auto;
  width: 50%;
  max-width: 600px;
  background: white;
  display: grid;
  grid-template-rows: repeat(4, 104px, 104px, auto, 104px);
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
  width: 80%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  font-size: 1.1rem;
  transition: 0.2s;
}
button {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  width: 50%;
  margin: 10px auto 0;
  padding: 10px;
  border-radius: 150px;
  font-size: 1rem;
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
.msg{
   font-family: 'Amaranth', sans-serif;
   margin: auto;
   margin-top: 20px;
   margin-bottom: 20px;
   width: 80%;
   border: 1px solid #000000;
   border-radius: 50px;
   background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
.picture-container {
    margin-top: 50px;
}
img {
    width: 100%;
}
@media all and (max-width : 530px) {
    form {
        width: 100%;
        padding: 60px 0 30px;
    }
    .msg {
        width: 100%;
    }
}
</style>