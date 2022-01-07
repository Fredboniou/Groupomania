<template>
    <div class="login">
        <h3>{{ loginMsg }}</h3>
        <div class="form-container">
            <form @submit.prevent="submitForm" autocomplete="off">
                <div class="email-container">
                    <label for="email">E-mail</label>
                    <input type="email" v-model="form.email" name="email" id="email" autocomplete="off" required>
                    <span v-if="!emailIsValid" class="error">Merci de renseigner l'e-mail</span>
                </div>
                <div class="password-container">
                    <label for="password">Mot de passe</label>
                    <input type="password" v-model="form.password" name="password" id="password" autocomplete="off">
                    <span v-if="!passwordIsValid" class="error">Merci de renseigner le mot de passe</span>
                </div>
                <button>Accès membre</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "LoginComponents",
    props: {
        loginMsg: String
    },
    data() {
      return {
        form: {
          email: null,
          password: "",
        }
      }
    },
    computed: {
      emailIsValid() {
        return !!(/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4})$/.test(this.form.email));
      },
      passwordIsValid() {
        return !!(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(this.form.password));
      },
      formIsValid() {
            return this.emailIsValid && this.passwordIsValid;
        },
    },
    methods: {
      submitForm() {
        const formIsValid = this.emailIsValid && this.passwordIsValid;

        // if (formIsValid){
        //         console.log("Utilisateur identifié", this.form);
        //     } else {
        //         console.log("invalid form");
        //     }

        if (formIsValid) {
          const self = this;
          axios.post("http://localhost:3000/api/user/login", this.form)
            .then(function(response) {
              console.log(response);
              const data = ({
                userId: response.data.userId,
                name: response.data.userName,
                firstname: response.data.userFirstname,
                admin: response.data.admin,
                token: response.data.token
              });
              const parsed = JSON.stringify(data);
              localStorage.setItem("form", parsed);
              self.$router.push("/posts")
            })
            .catch(function(error) {
              // alert("Il y a une erreur dans votre email et/ou dans votre mot de passe !")
              // self.$router.push("/");
              console.log(error);
            })
        } else {
          console.log("invalid form");
        }
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
input[type="text"],
input[type="password"],
input[type="email"] {
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
span {
  margin-bottom: 20px;
  //display: block;
  font-size: 0.8rem;
  color: red;
}
p {
  background: red;
  width: 33%;
  height: 6px;
  margin: -2px 0 2px;
  border-radius: 50px;
  visibility: hidden;
  transition: 0.3s;
}
// #security span {
//   display: inline;
// }

button {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
  width: 50%;
  height: 50%;
  margin: 12px auto 0;
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
}
// .error input {
//   color: red;
//   border: 1px solid rgba(255, 0, 0, 0.527);
// }
.error span {
  visibility: visible;
  opacity: 1;
  color: red;
}
h3 {
    border: 1px solid black;
    padding: 20px;
    border-radius: 50px;
    background: linear-gradient(65deg, #f89e8c, #fc2e06);
}
</style>
