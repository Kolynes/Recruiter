<template>
  <v-container grid-list-xl>
    <h3 class="title">
      <v-icon> mdi-school </v-icon>
      Educational Experience
    </h3>
    <v-btn
      dense
      color="primary"
      rounded
      text
      @click="showAddEducationExperienceDialog"
    >
      <v-icon size="15"> mdi-plus </v-icon>
      <span class="ml-1 text-capitalize"> Add Educational Experience </span>
    </v-btn>
    <v-list class="ml-3">
      <template v-for="(experience, index) in educationalExperience">
        <v-list-item :key="index">
          <v-list-item-content>
            <span class="title"> {{ experience.details }} </span>
            <span class="body-1"> {{ experience.institution }} </span>
            <span class="caption"> {{ timespan(experience) }} </span>
            <div class="mt-1">
              <v-btn small @click="selectExperience(experience)" color="primary" rounded class="mr-2">
                <v-icon size="15"> mdi-pencil </v-icon>
                <span class="ml-1 text-capitalize"> Edit </span>
              </v-btn>
              <v-btn
                small
                color="primary"
                rounded
                @click="callDeleteExperience(experience)"
                :loading="experience.deleting"
              >
                <v-icon size="15"> mdi-delete </v-icon>
                <span class="ml-1 text-capitalize"> Delete </span>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index" />
      </template>
    </v-list>
    <h3 class="title mb-1">
      <v-icon> mdi-briefcase </v-icon>
      Work Experience
    </h3>
    <v-btn
      dense
      color="primary"
      rounded
      text
      @click="showAddWorkExperienceDialog"
    >
      <v-icon size="15"> mdi-plus </v-icon>
      <span class="ml-1 text-capitalize"> Add Work Experience </span>
    </v-btn>
    <v-list class="ml-3">
      <template v-for="(experience, index) in workExperience">
        <v-list-item :key="index">
          <v-list-item-content>
            <span class="title"> {{ experience.details }} </span>
            <span class="body-1"> {{ experience.institution }} </span>
            <span class="caption"> {{ timespan(experience) }} </span>
            <div class="mt-1">
              <v-btn small @click="selectExperience(experience)" color="primary" rounded>
                <v-icon size="15"> mdi-pencil </v-icon>
                <span class="ml-1 text-capitalize"> Edit </span>
              </v-btn>
              <v-btn
                small
                color="primary"
                rounded
                @click="callDeleteExperience(experience)"
                :loading="experience.deleting"
              >
                <v-icon size="15"> mdi-delete </v-icon>
                <span class="ml-1 text-capitalize"> Delete </span>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index" />
      </template>
    </v-list>
    <v-dialog v-model="experienceDialogVisible" persistent width="600">
      <v-card>
        <v-card-title>
          <span class="text-capitalize body-2">
            {{ id? "Update" : "Add" }} {{ experienceType }} Experience
          </span>
          <v-spacer />
          <v-btn icon @click="closeAddExperienceDialog">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl fluid>
            <v-form
              ref="addExperienceForm"
              @submit.prevent="
                id ? callUpdateExperience() : callCreateExperience()
              "
            >
              <v-text-field
                label="Details"
                v-model="details"
                :rules="[requiredLengthRule(2)]"
                outlined
              />
              <v-text-field
                label="Institution"
                v-model="institution"
                :rules="[requiredLengthRule(2)]"
                outlined
              />
              <v-layout>
                <v-flex>
                  <v-date-field
                    outlined
                    label="From"
                    v-model="from"
                    :rules="[requiredRule]"
                  />
                </v-flex>
                <v-flex>
                  <v-date-field outlined clearable label="To" v-model="to" />
                </v-flex>
              </v-layout>
              <v-btn
                icon
                color="primary"
                type="submit"
                :loading="creatingExperience"
              >
                <v-icon> mdi-arrow-right </v-icon>
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./ExperienceView.ts"></script>

<style>
</style>