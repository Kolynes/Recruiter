<template>
  <v-container grid-list-xl>
    <v-toolbar flat color="grey lighten-4" class="mb-3">
      <h2 class="display-1 font-weight-bold">User Profile</h2>
    </v-toolbar>
    <span class="ml-4 font-weight-bold title">{{ firstName }} {{ lastName }}</span><br>
    <span class="ml-4"> {{ email }} </span><br>
    <v-btn
      text
      color="primary"
      rounded
      class="font-weight-bold"
      :href="cv"
      v-if="cv"
    >
      View CV
    </v-btn>
    <v-btn
      text
      color="primary"
      rounded
      class="font-weight-bold"
      @click="showUploadCVDialog = true"
    >
      Upload CV
    </v-btn>
    <br><br>
    <experience-view :account-id="id" v-if="id != -1" />

    <v-dialog v-model="showUploadCVDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <v-icon>mdi-upload</v-icon>
          <span class="body-2" >Upload CV </span>
          <v-spacer />
          <v-btn icon @click="showUploadCVDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="uploadCVForm" @submit.prevent="callUploadCV">
            <v-file-field
              outlined
              label="Select File"
              v-model="cvFile"
              :rules="[requiredRule]"
            />
            <v-btn
              color="primary"
              rounded
              class="font-weight-bold"
              type="submit"
              :loading="uploading"
            >
              Upload
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./Profile.ts"></script>