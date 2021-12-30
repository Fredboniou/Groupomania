<template>
    <div class="editProfile">
        <router-link to="/posts">Revenir au fil d'actualité</router-link>
        <div class="createProfile">
            <h3>{{ CreateProfileMsg }}</h3>
        </div>
        <div class="form-container">
            <form @submit.prevent="submitForm" autocomplete="off">
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
                    <input type="date" v-model="form.userBirthday" name="birthday" id="birthday" min="1955-01-01" :max="dayDate" >
                </div>
                <div class="bio-container">
                    <label for="bio">Dites en plus sur vous</label>
                    <textarea name="textarea" v-model="form.userBio" id="bio" maxlength="300" autocomplete="off"></textarea>
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
            }
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
        // cityIsValid() {
        //     return !!this.form.city;
        // },
        // schoolIsValid() {
        //     return !!this.form.school;
        // },
        // birthdayIsValid() {
        //     return !!this.form.userBirthday;
        // },
        // bioIsValid() {
        //     return !!this.form.userBio;
        // },
    },
    methods: {
        submitForm() {

            //if (this.cityIsValid || this.schoolIsValid || this.birthdayIsValid || this.bioIsValid) {
                //const data = JSON. parse(localStorage.getItem("form"));
                //const token = data.token;
                const userId = this.form.userId;
                const city = this.form.city;
                const school = this.form.school;
                const birthday = this.form.userBirthday;
                const bio = this.form.userBio;
                const infos = {userId, city, school, birthday, bio};
                console.log(infos);

                if (confirm("Voulez vous valider votre profil")) {
                    axios.post("http://localhost:3000/api/user/profile", infos)
                    .then(function(response) {
                        console.log(response);
                    })
                
                    .catch(function(error) {
                        console.log(error);
                    })
                }
            //}
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
  //margin: 12px auto 0;
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
h3 {
    border: 1px solid black;
    padding: 20px;
    border-radius: 50px;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
</style>