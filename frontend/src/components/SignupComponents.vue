<template>
    <div class="signup">
        <h3>{{ signupMsg }}</h3>
        <div class="form-container">
            <form @submit.prevent="submitForm" autocomplete="off">
                <div class="name-container">
                    <label for="name">Nom</label>
                    <input type="text" v-model="form.name" name="name" id="name" autocomplete="off">
                    <span  v-if="!nameIsValid" class="error">Merci de renseigner votre nom</span>
                </div>
                <div class="firstname-container">
                    <label for="firstname">Prénom</label>
                    <input type="text" v-model="form.firstname" name="firstname" id="firstname" autocomplete="off">
                    <span v-if="!firstnameIsValid" class="error">Merci de renseigner votre prénom</span>
                </div>
                <div class="email-container">
                    <label for="email">E-mail</label>
                    <input type="email" v-model="form.email" name="email" id="email" autocomplete="off" required>
                    <span v-if="!emailIsValid" class="error">Merci de renseigner l'e-mail</span>
                </div>
                <div class="password-container">
                    <label for="password">Mot de passe</label>
                    <input type="password" v-model="form.password" name="password" id="password" autocomplete="off">
                    <p id="progress-bar" class="progressRed" v-if="(form.password.length >= 1) && (form.password.length < 8)"></p>
                    <p id="progress-bar" class="progressBlue" v-if="(form.password.length >= 8) && (form.password.length < 12)"></p>
                    <p id="progress-bar" class="progressGreen" v-if="form.password.length >= 12"></p>
                    <span v-if="!passwordIsValid" class="error">Le mot de passe doit contenir au minimum 
                      <span v-if="form.password.length < 8">8 caractères</span>
                      <span v-if="!((/.*[A-Z]/).test(this.form.password))"> une majuscule</span> 
                      <span v-if="!((/.*\d/).test(this.form.password))"> un chiffre</span> 
                      <span v-if="!((/.*[+\*-\/?!.$]/).test(this.form.password))"> un caractère spécial</span>
                    </span>
                </div>
                <div class="confirm-container">
                    <label for="confirm">Confirmer mot de passe</label>
                    <input type="password" v-model="form.confirm" name="confirm" id="confirm" autocomplete="off">
                    <span v-if="form.confirm != form.password">Les mots de passe ne correspondent pas</span>
                </div>
                <button >S'inscrire</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "SignupComponents",
    data() {
        return{
            form: {
                name: null,
                firstname: null,
                email: null,
                password: "",
                confirm: "",
            }     
        }
    },
    props: {
        signupMsg: String
    },
    computed: {
        nameIsValid() { //on défini ici pour y avoir accès dans notre template
            return !!this.form.name;
        },
        firstnameIsValid() {
            return !!this.form.firstname;
        },
        emailIsValid() {
          return !!(/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4})$/.test(this.form.email))
        },
        passwordIsValid() {
          return !!(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(this.form.password))
        },
        formIsValid() {
            return this.nameIsValid && this.firstnameIsValid && this.emailIsValid && this.passwordIsValid && !(this.form.confirm != this.passwordIsValid);
        },
    },
    methods: {
        submitForm() {
            
            const formIsValid = this.nameIsValid && this.firstnameIsValid && this.emailIsValid && this.passwordIsValid && (this.form.confirm == this.form.password);
            if (formIsValid){
                console.log("form submited", this.form);
            } else {
                console.log("invalid form");
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
.progressRed {
  background: red;
  width: 33%;
  visibility: visible;
}
.progressBlue {
  background: #16d9e7;
  width: 67%;
  visibility: visible;
}
.progressGreen {
  width: 100%;
  background: #5ef9a4;
  visibility: visible;
}

</style>