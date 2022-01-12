<template>
    <div class="newPost">
        <router-link to="/posts" aria-label="Annuler la modification">Annuler la modification</router-link>
        <h3 aria-label="Modifiez votre publication">{{ ModifMsg }}</h3>
        <div class="form-container">
            <form @submit.prevent="modifPost" autocomplete="off">
                <div class="post-container">
                    <label for="content">Créez votre nouvelle publication</label>
                    <textarea v-model="form.content" name="textarea" id="content" maxlength="300" autocomplete="off" required aria-required="true" aria-label="Créez votre nouvelle publication"></textarea>                 
                </div>
                <div class="picture-container">
                    <label for="picture" aria-label="Ajoutez une image">Ajoutez une image : </label>
                    <input type="file" accept="image/*" @change="previewImage" id="picture" name="image">
                    <div id="preview">
                        <img v-if="form.preview" :src="form.preview" />
                    </div>
                </div>
                <button :disabled="!contentIsValid" aria-label="Valider votre modification">Modifier</button>
                <button v-if="form.preview != null" @click="deletePic">Supprimer l'image</button>
            </form>
        </div>
    </div>
</template>



<script>
import axios from "axios";

export default {
    name: "ModifPostComponents",
    props: {
        ModifMsg: String
    },
    data() {
        return {
            form: {
                userId: JSON.parse(localStorage.getItem("form")).userId,
                content: "",
                preview: null,
                image: null,
            },
            post: [],
        }
    },
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                this.getOnePost();
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
        getOnePost() {
            const postId = this.$route.params.id;
            const data = JSON.parse(localStorage.getItem("form"));
            const token = data.token;
            const self = this;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios.get("http://localhost:3000/api/post/" + postId, {
                headers: {
                    Authorization: "bearer " + token
                },
            })
            .then(function(response) {
                self.post = response.data.result;
                self.form.content = self.post[0].content;
                self.form.preview = self.post[0].image;
                console.log(self.post);
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        modifPost() {
            const postIsValid = this.contentIsValid;

            if(postIsValid) {
                const data = JSON.parse(localStorage.getItem("form"));
                const token = data.token;
                const postId = this.$route.params.id;
                const content = this.form.content;
                const image = this.form.image;
                const self = this;

                let formData = new FormData();
                formData.append("postId", postId);
                formData.append("content", content);
                formData.append("image", image);
                console.log(formData);


                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                axios.put("http://localhost:3000/api/post/" + postId, formData, {
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
.picture-container {
    margin-top: 50px;
}
</style>