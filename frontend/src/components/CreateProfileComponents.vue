<template>
    <div class="editProfile">
        <router-link to="/posts">Revenir au fil d'actualité</router-link>
        <div class="msg">
            <h3>{{ CreateProfileMsg }}</h3>
        </div>
        <div class="caution">
            <p>Attention, en cas de modification de profil, tous les champs du formulaire sont à renseigner de nouveau.</p>
        </div>
        <div class="form-container">
            <form name="form" ref="myForm" @submit.prevent="submitForm" autocomplete="off" enctype="multipart/form-data">
                <div class="city">
                    <label for="city">Lieu de résidence</label>
                    <input type="text" v-model="form.city" name="city" id="city" autocomplete="off">
                </div>
                <div class="school">
                    <label for="school">Ou avez-vous étudié</label>
                    <input type="text" v-model="form.school" name="school" id="school" autocomplete="off"> 
                </div>
                <div class="birthday-container">
                    <label for="birthday">Renseignez votre date de naissance</label>
                    <input type="date" v-model="form.userBirthday" name="birthday" id="birthday" min="1955-01-01" :max="dayDate">
                </div>
                <div class="bio-container">
                    <label for="bio">Dites en plus sur vous</label>
                    <textarea name="bio" v-model="form.userBio" id="bio" maxlength="300" autocomplete="off"></textarea>
                </div>
                <div class="picture-container">
                    <label for="picture">Choisissez une photo de profil : </label>
                    <input type="file" accept="image/*" @change="previewImage" id="picture" name="image">
                    <div id="preview">
                        <img v-if="preview" :src="preview" />
                    </div>
                </div>
                <button>Valider le profil</button>
            </form>
        </div>
    </div>
</template>



<script>
import axios from "axios";

export default {
    name: "CreateProfileComponents",
    props: {
        CreateProfileMsg: String
    },
    data() {
        return {
            form: {
                userId: JSON.parse(localStorage.getItem("form")).userId,
                city: "",
                school: "",
                userBirthday: "",
                userBio: "",
            },
            preview: null,
            image: null,
        }
    },
    mounted() {
        if(localStorage.getItem("form")) {
            try {
                console.log(localStorage);
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
        dayDate() {
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth()+1;
            let year = today.getFullYear();

            if (day < 10) {
                day = "0" + day;
            }
            if (month < 10) {
                month = "0" + month;
            }
            return today = year + "-" + month + "-" + day;
        },
    },
    methods: {
        submitForm() {
                const userId = this.form.userId;
                const city = this.form.city;
                const school = this.form.school;
                const birthday = this.form.userBirthday;
                const bio = this.form.userBio;
                const image = this.image;
                console.log(this.image);
                
                let formData = new FormData();
                formData.append("userId", userId);
                formData.append("city", city);
                formData.append("school", school);
                formData.append("birthday", birthday);
                formData.append("bio", bio);
                formData.append("image", image);
                console.log(formData);

                if (confirm("Voulez vous valider votre profil")) {
                    axios.post("http://localhost:3000/api/user/profile", formData)
                    .then(function(response) {
                        alert("La modification de votre profil à bien été prise en compte")
                        window.location.reload();
                        console.log(response);
                    })
                
                    .catch(function(error) {
                        console.log(error);
                    })
                }
        },
        previewImage(event) {
            let input = event.target;
            if (input.files) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
                console.log(this.image.name);
            }
        },
    }
}
</script>



<style lang="scss" scoped>
.form-container {
    display: flex;
}
.msg {
    margin-top: 20px;
    margin-bottom: 20px;
}
.picture-container {
    margin-top: 45px;
}
form{
  margin: auto;
  width: 50%;
  max-width: 600px;
  background: #ffffff;
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
input[type="text"] {
  margin: 7px 0 7px;
  border: 1px solid transparent;
  background: rgb(235, 244, 242);
  height: 36px;
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
  margin: 50px auto 0;
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
img {
    overflow : hidden;
	-webkit-border-radius : 50px;
	-moz-border-radius : 50px;
	border-radius: 50%;
	width: 150px;
    height: 150px;
    margin-bottom: 30px;
}
@media all and (max-width : 536px) {
    form {
        width: 100%;
        padding: 60px 0 30px;
    }
    .msg {
        width: 100%;
    }
    input[type="text"] {
        width: 70%;
    }
    textarea {
        width: 70%;
    }
}
</style>