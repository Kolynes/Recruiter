<template>
  <v-container>
    <v-toolbar color="grey lighten-4" flat class="mb-3">
      <h2 class="display-1 font-weight-bold">Applications</h2>
      <v-spacer />
      <v-text-field
        outlined
        clearable
        hide-details
        dense
        prepend-inner-icon="mdi-magnify"
        placeholder="Find an Applications"
        v-model="searchString"
        :loading="searching"
      />
    </v-toolbar>
    <div class="mt-2">
      <v-empty-state
        title="No Applications Found"
        icon="mdi-mailbox"
        v-if="applications.length == 0"
      />
      <v-list v-else>
        <template v-for="(application, index) in applications">
          <v-list-item :key="`item-${index}`">
            <v-list-item-content>
              <span class="title font-weight-bold">
                {{ application.job.position }}
              </span>
              <span>
                {{ application.user.firstName }} {{ application.user.lastName }}
              </span>
              <span class="caption">
                {{ new Date(application.createdOn).toDateString() }}
              </span>
              <div>
                <v-btn
                  rounded
                  small
                  class="mt-1"
                  color="primary"
                  @click="selectApplication(application)"
                >
                  details
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`divider-${index}`" />
        </template>
      </v-list>
    </div>
    <v-dialog v-model="showApplicationDetailsDialog" persistent width="600">
      <v-card>
        <v-card-title>
          <span class="body-2"> Application Details </span>
          <v-spacer />
          <v-btn icon @click="showApplicationDetailsDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <span class="title font-weight-bold">
            {{ selectedApplication.job.position }}
          </span>
          <br />
          <span>
            {{ selectedApplication.user.firstName }}
            {{ selectedApplication.user.lastName }}
          </span>
          <br />
          <span class="caption">
            {{ new Date(selectedApplication.createdOn).toDateString() }}
          </span>
          <br />
          <v-tabs v-model="tab">
            <v-tab> Status </v-tab>
            <v-tab> Test </v-tab>
            <v-tab> Interview Link </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item class="my-3">
              <v-form
                ref="setApplicationStatusForm"
                @submit.prevent="callSetStatus"
                v-if="isStaff && status == 'Pending'"
              >
                <v-select
                  :items="applicationStatusChoices"
                  outlined
                  placeholder="Select status"
                  hide-details
                  dense
                  v-model="status"
                  :rules="[requiredRule]"
                />
                <v-btn
                  color="primary mt-2"
                  small
                  rounded
                  type="submit"
                  :loading="settingStatus"
                >
                  set status
                </v-btn>
              </v-form>
              <span class="body-1" v-else> {{ status }} </span>
            </v-tab-item>
            <v-tab-item class="my-3">
              <v-form ref="setTestForm" @submit.prevent="callSetTest">
                <v-select
                  label="Select test"
                  v-model="test"
                  hide-details
                  outlined
                  dense
                  :items="tests"
                  :item-value="(item) => item"
                  :item-text="(item) => item.name"
                  v-if="!selectedApplication.test"
                />
                <p class="body-1" v-else>{{ selectedApplication.test.name }}</p>
                <p class="body-2" v-if="selectedApplication.testScore">
                  Test score: {{ selectedApplication.testScore.score || "" }}
                </p>
                <v-btn
                  color="primary mt-2"
                  small
                  rounded
                  type="submit"
                  :loading="settingTest"
                  v-if="isStaff && !selectedApplication.test.id"
                >
                  set test
                </v-btn>
                <v-btn
                  color="primary mt-2 ml-2"
                  small
                  rounded
                  @click="takeTest"
                  v-else-if="!isStaff && !selectedApplication.testScore"
                >
                  take test
                </v-btn>
                <v-btn
                  color="primary mt-2 ml-2"
                  small
                  rounded
                  @click="markTest"
                  v-else-if="isStaff && !selectedApplication.testScore.score"
                >
                  mark Test
                </v-btn>
                <span v-else-if="!selectedApplication.testScore.score">
                  Yet to take test...
                </span>
              </v-form>
            </v-tab-item>
            <v-tab-item class="my-3">
              <v-form
                ref="setApplicationInterviewLinkForm"
                @submit.prevent="callSetInterviewLink"
                v-if="isStaff"
              >
                <v-text-field
                  label="Interview Link"
                  :rules="[requiredRule]"
                  outlined
                  hide-details
                  dense
                  v-model="interviewLink"
                />
                <v-btn
                  color="primary mt-2"
                  small
                  rounded
                  type="submit"
                  :loading="settingInterviewLink"
                >
                  set interview link
                </v-btn>
              </v-form>
              <v-btn
                class="text-capitalize"
                text
                :href="selectedApplication.interviewLink"
                v-else
              >
                {{ selectedApplication.interviewLink }}
              </v-btn>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showTakeTestDialog" persistent width="600">
      <v-card v-if="test">
        <v-card-title>
          <span class="font-weight-bold body-1"> {{ test.name }} </span>
          <v-spacer />
          <v-btn icon @click="showTakeTestDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="testForm" @submit.prevent="callCreateTestScore">
            <template v-for="(qAndA, index) in test.qAndA">
              <p :key="`label-${index}`" class="mb-1 title">
                {{ qAndA.question }}
              </p>
              <v-text-field
                :key="index"
                :rules="[requiredRule]"
                outlined
                v-model="answers[index]"
              />
            </template>
            <v-btn
              rounded
              color="primary"
              :loading="submitingTest"
              type="submit"
            >
              submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog persistent width="600" v-model="showMarkTestDialog">
      <v-card v-if="test">
        <v-card-title>
          <span class="body-2"> Mark Test </span>
          <v-spacer />
          <v-btn icon @click="showMarkTestDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="scoreTestForm" @submit.prevent="callScoreTest">
            <template v-for="(qAndA, index) in test.qAndA">
              <p :key="`label-${index}`" class="mb-3 title">
                {{ qAndA.question }}
                <br />
                <span class="body-1"> Answer: {{ qAndA.answer }} </span>
                <br />
                <span class="body-1">
                  Recruit's Answer:
                  {{ selectedApplication.testScore.answers[index] }}
                </span>
                <v-switch label="Right" @change="$event ? score++ : score--" />
              </p>
            </template>
            <p>
              Score: {{ score }} /
              {{ selectedApplication.testScore.answers.length }}
            </p>
            <v-btn
              rounded
              color="primary"
              :loading="submitingMarkedTest"
              type="submit"
            >
              submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./Applications.ts"></script>