<template>
  <v-container grid-list-xl>
    <v-toolbar flat color="grey lighten-4">
      <h2 class="display-1 font-weight-bold">Jobs</h2>
      <v-spacer />
      <v-text-field
        outlined
        clearable
        hide-details
        dense
        prepend-inner-icon="mdi-magnify"
        placeholder="Find a test"
        v-model="searchString"
        :loading="searching"
      />
      <v-btn icon @click="createJob" v-if="isStaff">
        <v-icon> mdi-briefcase-plus </v-icon>
      </v-btn>
    </v-toolbar>
    <v-empty-state title="No Jobs" icon="mdi-briefcase" v-if="jobsIsEmpty">
      <v-btn large color="primary" rounded @click="createJob" v-if="isStaff">
        Create a Job
      </v-btn>
    </v-empty-state>
    <template v-for="(job, index) in jobs" v-else>
      <v-list-item :key="`list-${index}`" @click="selectJob(job)">
        <v-list-item-content>
          <span class="title">
            {{ job.position }}
          </span>
          <span class="caption grey--text">
            {{ new Date(job.createdOn).toDateString() }}
            {{ new Date(job.createdOn).toTimeString().substring(0, 8) }}
          </span>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="`divider-${index}`" />
    </template>
    <v-dialog persistent v-model="showJobFormDialog" width="600">
      <v-card>
        <v-card-title>
          <v-icon> mdi-briefcase </v-icon>
          <span class="ml-2">
            {{ selectedJob.id ? "Edit" : "Create a" }} Job
          </span>
          <v-spacer />
          <v-btn icon @click="showJobFormDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="jobForm" @submit.prevent="selectedJob.id? callUpdateJob() : callCreateJob()">
            <v-text-field
              label="Job Position"
              outlined
              v-model="position"
              :rules="[requiredLengthRule(6)]"
            />
            <v-textarea
              label="Job Description"
              outlined
              v-model="description"
              :rules="[requiredLengthRule(20)]"
            />
            <v-btn icon type="submit" color="primary" :loading="creating">
              <v-icon> mdi-arrow-right </v-icon>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog persistent width="600" v-model="showJobDetailsDialog">
      <v-card>
        <v-card-title>
          <v-icon> mdi-breifcase </v-icon>
          <span class="ml-2 body-1">Job Details</span>
          <v-spacer />
          <v-btn icon @click="showJobDetailsDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <job-details
            :job="selectedJob"
            @deleted="showJobDetailsDialog = false"
            @edit="editJob"
            :show-more="isStaff"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./Jobs.ts"></script>

<style>
</style>