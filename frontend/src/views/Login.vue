<template>
    <div class="log">
        <div id="nav">
          <router-link to="/" aria-label="Retourner à la page d'accueil">Retourner à la page d'accueil</router-link>
        </div>
        <div class="login">
            <img src="../assets/logo-white-resize.png" alt="logo groupomania blanc" class="logo">
            <img src="../assets/logo-white-rs.png" alt="logo groupomania blanc" class="logoResp">
            <MsgComponents msg="Identifiez-vous" /> 
            <div class="form-container">
                <form @submit.prevent="submitForm" autocomplete="off">
                    <div class="email-container">
                        <label for="email">E-mail</label>
                        <input type="email" v-model="form.email" name="email" id="email" autocomplete="off" required aria-required="true" aria-label="Renseignez votre mail">
                        <span v-if="!emailIsValid" class="error">Merci de renseigner l'e-mail</span>
                    </div>
                    <div class="password-container">
                        <label for="password">Mot de passe</label>
                        <input type="password" v-model="form.password" name="password" id="password" autocomplete="off" required aria-required="true" aria-label="Entrez votre mot de passe">
                        <span v-if="!passwordIsValid" class="error">Merci de renseigner le mot de passe</span>
                    </div>
                    <button aria-label="Connectez-vous">Accès membre</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import MsgComponents from "@/components/MsgComponents.vue"

export default {
    name: "Login",
    components: {
        MsgComponents
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
              alert("Il y a une erreur dans votre email et/ou dans votre mot de passe !")
              window.location.reload();
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
a {
  text-decoration: none;
  color: #000;

  &:hover {
    color: #fc2e06;
  }
}
.logo {
  margin-top: -20px;
}
.logoResp {
  display: none;
}
.form-container {
    display: flex;
    margin-top: 20px;
}
form{
  margin: auto;
  width: 50%;
  //min-width: 380px;
  max-width: 600px;
  background: #ffffff;
  display: grid;
  grid-template-rows: repeat(3, 104px);
  padding: 60px 45px 30px;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}
.login {
  margin-top: 20px;
}
div {
  transition: 0.2s;
}
label {
  letter-spacing: 1px;
}
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
}
span {
  margin-bottom: 20px;
  font-size: 0.8rem;
  color: red;
  visibility: visible;
  opacity: 1;
}
button {
  border: none;
  background: linear-gradient(65deg, #f89e8c, #fc2e06);
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
@media all and (max-width : 536px) {
  form {
    margin: 0;
    width: 100%;
  }
}
@media all and (max-width : 380px) {
  .logo {
    display: none;
  }
  .logoResp {
    display: initial;
    width: 200px;
  }
}
</style>
