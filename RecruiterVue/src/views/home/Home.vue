<template>
  <v-app>
    <v-app-bar app color="transparent" :elevation="0">
      <span class="font-weight-bold primary--text">Recruiter</span>
    </v-app-bar>
    <v-content>
      <v-container grid-list-xl align-center fill-height>
        <v-layout align-center>
          <v-flex xs12 sm6>
            <h1 class="display-2 primary--text my-5">Welcome to Recruiter</h1>
            <h1 class="display-1">
              The Best Way to measure your future employee's competence
            </h1>
          </v-flex>
          <v-flex xs12 sm6>
            <v-tabs v-model="formTab">
              <v-tab>Login</v-tab>
              <v-tab>Create Account</v-tab>
            </v-tabs>
            <v-tabs-items v-model="formTab" :key="0">
              <v-tab-item class="my-5">
                <v-form ref="loginForm" @submit.prevent="callLogin">
                  <v-text-field
                    outlined
                    prepend-inner-icon="mdi-email"
                    label="Email Address"
                    v-model="loginEmail"
                    :rules="[emailRule]"
                  />
                  <v-password-field
                    outlined
                    prepend-inner-icon="mdi-lock"
                    label="Password"
                    v-model="loginPassword"
                    :rules="[requiredLengthRule(6)]"
                  />
                  <v-btn class="primary" type="submit" :loading="loggingIn">
                    login
                  </v-btn>
                </v-form>
              </v-tab-item>
              <v-tab-item class="my-5" :key="1">
                <v-form ref="signUpForm" @submit.prevent="callCreateAccount">
                  <v-text-field
                    outlined
                    label="First Name"
                    v-model="firstName"
                    :rules="[requiredLengthRule(6)]"
                  />
                  <v-text-field
                    outlined
                    label="Last Name"
                    v-model="lastName"
                    :rules="[requiredLengthRule(6)]"
                  />
                  <v-text-field
                    outlined
                    prepend-inner-icon="mdi-email"
                    label="Email Address"
                    v-model="signUpEmail"
                    :rules="[emailRule]"
                  />
                  <v-password-field
                    outlined
                    prepend-inner-icon="mdi-lock"
                    label="Password"
                    v-model="loginPassword"
                    :rules="[requiredLengthRule(6)]"
                  />
                  <v-btn
                    class="primary"
                    type="submit"
                    :loading="creatingAccount"
                  >
                    create account
                  </v-btn>
                </v-form>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script src="./Home.ts"></script>

<style>
</style>