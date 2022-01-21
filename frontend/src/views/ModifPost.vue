<template>
    <div class="modifPost">
        <HeaderComponents />
        <div class="newPost">
            <router-link to="/posts">Annuler la modification</router-link>
            <MsgComponents msg="Modifiez votre publication" />
            <div class="form-container">
                <form @submit.prevent="modifPost" autocomplete="off">
                    <div class="post-container">
                        <label for="content">Créez votre nouvelle publication</label>
                        <textarea v-model="form.content" name="textarea" id="content" maxlength="300" autocomplete="off" required aria-required="true"></textarea>                 
                    </div>
                    <div class="picture-container">
                        <label for="picture" aria-label="Ajoutez une image">Ajoutez/modifier votre image : </label>
                        <input type="file" accept="image/*" @change="previewImage" id="picture" name="image">
                        <button v-if="form.preview != null" @click="deletePic" class="deletePic">Supprimer l'image</button>
                        <div id="preview">
                            <img v-if="form.preview" :src="form.preview" class="postPicture"/>
                        </div>
                    </div>
                    <button :disabled="!contentIsValid">Modifier</button>
                </form>
            </div>
        </div>
    </div>
</template>



<script>
import axios from "axios";
import HeaderComponents from "@/components/HeaderComponents.vue";
import MsgComponents from "@/components/MsgComponents.vue";

export default {
    name: "ModifPost",
    components: {
        HeaderComponents,
        MsgComponents,
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
                self.form.image = self.post[0].image;
                self.form.preview = self.form.image;
                console.log(self.post);
                console.log(self.form.image);
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        modifPost() {
            const postIsValid = this.contentIsValid;

            if(postIsValid) {
                if (this.form.image == null) {
                    const data = JSON.parse(localStorage.getItem("form"));
                    const token = data.token;
                    const postId = this.$route.params.id;
                    const content = this.form.content;
                    const self = this;
                    console.log(this.form.image);

                    let formData = new FormData();
                    formData.append("postId", postId);
                    formData.append("content", content);
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
                else {
                    const data = JSON.parse(localStorage.getItem("form"));
                    const token = data.token;
                    const postId = this.$route.params.id;
                    const content = this.form.content;
                    const image = this.form.image;
                    const self = this;
                    console.log(image);

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
            this.form.image = null;
            console.log(this.form.image);
        },
    }
}
</script>



<style lang="scss" scoped>
.logoResp {
    display: none;
}
.form-container {
    display: flex;
}
form{
  margin: auto;
  width: 50%;
  max-width: 600px;
  background: #ffffff;
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
.deletePic {
    background: #000000;
    color: #fc2e06;
    font-size: 0.9rem;
    width: auto;
    padding: 3px;
    border-radius: 10px;
    margin-bottom: 5px;
}
a {
    text-decoration: none;
    color: #000;
    font-weight: bold;

    &:hover {
        color: #fc2e06;
    }
}
.msg {
   margin-top: 20px;
   margin-bottom: 20px;
}
.picture-container {
    margin-top: 50px;
}
img {
    width: 100%;
}
@media all and (max-width : 536px) {
    form {
        width: 100%;
        padding : 60px 0 30px;
    }
    .msg {
        width: 100%;
    }
    textarea {
        width: 70%;
    }
}
</style>