import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import { emailRule, requiredLengthRule } from "@/utils/rules/index";
import { namespace } from "vuex-class";

const AccountModule = namespace("AccountModule")

@Component({
    components: {
        VPasswordField
    }
})
export default class Home extends Vue {
    formTab = 0;

    loginEmail = "";
    loginPassword = "";

    firstName = "";
    lastName = "";
    signUpEmail = "";
    signUpPassword = "";

    loggingIn = false;
    creatingAccount = false;

    @Ref()
    loginForm!: { validate: () => boolean, reset: () => null }

    @Ref()
    signUpForm!: { validate: () => boolean, reset: () => null }

    emailRule = emailRule;

    requiredLengthRule = requiredLengthRule

    @AccountModule.Action
    login!: (payload: { username: string, password: string }) => Promise<IJsonResponse>

    @AccountModule.Action
    createAccount!: (payload: { first_name: string, last_name: string, email: string, password: string }) => Promise<IJsonResponse>

    async callLogin() {
        if(this.loginForm.validate()) {
            this.loggingIn = true;
            var response = await this.login({
                username: this.loginEmail,
                password: this.loginPassword
            })
            this.loggingIn = false;
            if(response.status == 200)
                this.$router.push("/dashboard")
            else toast({ message: (response.error as IErrors).summary, left: true})
        }
    }
    
    async callCreateAccount() {
        if(this.signUpForm.validate()) {
            this.creatingAccount = true;
            var response = await this.createAccount({
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.signUpEmail,
                password: this.loginPassword
            })
            this.creatingAccount = false;
            if(response.status == 201)
                this.$router.push("/dashboard")
            else toast({ message: (response.error as IErrors).summary, left: true })
        }
    }
}