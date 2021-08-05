<template>
  <v-container grid-list-xl>
    <v-sheet>
      <v-card-text>
        <v-list>
          <v-list-item class="align-start">
            <v-icon size="50" class="mr-3 mt-2"> mdi-account-circle </v-icon>
            <v-list-item-content>
              <h1 class="title text-capitalize"> {{fullName}} </h1>
              <p class="body-2" v-if="isStaff"> Admin </p>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn large rounded color="primary" to="/dashboard/profile">
            Go to profile
        </v-btn>
      </v-card-text>
    </v-sheet>
    <v-divider />
    <v-layout class="mt-3">
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-card-title>
            <v-icon color="primary" class="mr-1"> mdi-mailbox </v-icon>
            <span class="primary--text font-weight-bold"> Applications </span>
          </v-card-title>
          <v-card-text>
            <p class="display-4"> {{numberOfApplications}} </p>
            <v-btn
              class="text-capitalize"
              small
              rounded
              color="primary"
              to="/dashboard/applications"
            >
              view applications
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 v-if="isStaff">
        <v-card>
          <v-card-title>
            <v-icon color="primary" class="mr-1"> mdi-briefcase </v-icon>
            <span class="primary--text font-weight-bold"> Jobs </span>
          </v-card-title>
          <v-card-text>
            <p class="display-4"> {{numberOfJobs}} </p>
            <v-btn
              class="text-capitalize"
              small
              rounded
              color="primary"
              to="/dashboard/jobs"
            >
              view jobs
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 v-if="isStaff">
        <v-card>
          <v-card-title>
            <v-icon color="primary" class="mr-1"> mdi-note </v-icon>
            <span class="primary--text font-weight-bold"> Tests </span>
          </v-card-title>
          <v-card-text>
            <p class="display-4"> {{numberOfTests}} </p>
            <v-btn
              class="text-capitalize"
              small
              rounded
              color="primary"
              to="/dashboard/tests"
            >
              view tests
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 v-if="isStaff">
        <v-card>
          <v-card-title>
            <v-icon color="primary" class="mr-1"> mdi-account-multiple </v-icon>
            <span class="primary--text font-weight-bold"> Accounts </span>
          </v-card-title>
          <v-card-text>
            <p class="display-4"> {{numberOfAccounts}} </p>
            <v-btn
              class="text-capitalize"
              small
              rounded
              color="primary"
              to="/dashboard/accounts"
            >
              view accounts
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./Home.ts"></script>

<style>
</style>