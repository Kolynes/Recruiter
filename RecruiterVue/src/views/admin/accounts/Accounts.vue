<template>
  <v-container>
    <v-toolbar color="grey lighten-4" flat>
      <h2 class="display-1 font-weight-bold">Accounts</h2>
      <v-spacer />
      <v-text-field
        clearable
        hide-details
        dense
        outlined
        prepend-inner-icon="mdi-magnify"
        placeholder="Find an account"
        v-model="searchString"
      />
    </v-toolbar>
    <v-list>
      <template v-for="(account, index) in accounts">
        <v-list-item :key="`list-${index}`" @click="selectAccount(account)">
          <v-list-item-action>
            <v-avatar color="primary">
              <span class="title font-weight-bold white--text">
                {{ account.firstName[0] }}
              </span>
            </v-avatar>
          </v-list-item-action>
          <v-list-item-content>
            <span class="title">
              {{ account.firstName }} {{ account.lastName }}
            </span>
            <span class="caption grey--text"> {{ account.email }} </span>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="`divider-${index}`" />
      </template>
    </v-list>
    <v-dialog v-model="showProfileDialog" persistent width="600">
      <v-card>
        <v-card-title>
          <v-icon> mdi-account </v-icon>
          <span class="body-2 ml-2"> User Profile </span>
          <v-spacer />
          <v-btn icon @click="showProfileDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-subheader> Name: </v-subheader>
          <p class="ml-4 font-weight-bold title">
            {{ selectedAccount.firstName }} {{ selectedAccount.lastName }}
          </p>
          <v-subheader>Email:</v-subheader>
          <p class="ml-4 font-weight-bold title">{{ selectedAccount.email }}</p>
          <v-btn
            text
            color="primary"
            rounded
            class="font-weight-bold"
            :href="selectedAccount.cv"
            :disabled="selectedAccount.cv == ''"
          >
            View CV
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./Accounts.ts"></script>

<style>
</style>