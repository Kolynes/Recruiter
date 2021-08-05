<template>
  <v-container>
    <v-toolbar color="grey lighten-4" flat class="mb-3">
      <h2 class="display-1 font-weight-bold">Tests</h2>
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
      <v-btn icon @click="showCreateTestDialog = true">
        <v-icon> mdi-note-plus </v-icon>
      </v-btn>
    </v-toolbar>
    <v-list v-if="tests.length != 0">
      <template v-for="(test, index) in tests">
        <v-list-item :key="`test-${index}`">
          <v-list-item-content>
            <span class="font-weight-bold"> {{ test.name }} </span>
            <span class="caption">
              {{ new Date(test.createdOn).toDateString() }}
            </span>
            <div class="mt-2">
              <v-menu offset-x="60">
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    text
                    class="ml-1 text-capitalize"
                    small
                    rounded
                    v-on="on"
                    v-bind="attrs"
                  >
                    more
                    <v-icon class="ml-1"> mdi-arrow-down-circle </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editTest(test)">
                    <v-icon class="mr-2"> mdi-pencil </v-icon>
                    <span> Edit </span>
                  </v-list-item>
                  <v-list-item @click="callDelete(test)">
                    <v-icon class="mr-2"> mdi-delete </v-icon>
                    <span> Delete </span>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="`divider-${index}`" />
      </template>
    </v-list>
    <v-empty-state title="No Tests Found" icon="mdi-note" v-else>
      <v-btn rounded color="primary" @click="showCreateTestDialog = true">
        {{ id ? "Edit" : "Create" }} test
      </v-btn>
    </v-empty-state>
    <v-dialog persistent v-model="showCreateTestDialog" width="700">
      <v-card>
        <v-card-title>
          <span class="body-2 font-weight-bold"> Create a Test </span>
          <v-spacer />
          <v-btn icon @click="showCreateTestDialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="createTestForm" @submit.prevent="id ? callUpdateTest() : callCreateTest()">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[requiredLengthRule(6)]"
              outlined
            />
            <template v-for="(item, index) in qAndA">
              <v-subheader :key="`label-${index}`">
                Question {{ index + 1 }}
                <v-btn
                  rounded
                  color="primary"
                  text
                  class="ml-2 text-capitalize"
                  dense
                  @click="removeQuestion(index)"
                >
                  <v-icon class="mr-2"> mdi-delete-outline </v-icon>
                  remove question
                </v-btn>
              </v-subheader>
              <v-text-field
                :key="`question-${index}`"
                label="Question"
                outlined
                :rules="[requiredLengthRule(6)]"
                v-model="qAndA[index].question"
              />
              <v-text-field
                :key="`answer-${index}`"
                label="Answer"
                outlined
                :rules="[requiredLengthRule(1)]"
                v-model="qAndA[index].answer"
              />
            </template>
            <v-btn
              rounded
              color="primary"
              text
              @click="addQuestion"
              :disabled="creating"
            >
              <v-icon class="mr-2"> mdi-plus </v-icon>
              add question
            </v-btn>
            <v-btn rounded color="primary" type="submit" :loading="creating">
              {{ id ? "Save" : "Create" }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./Tests.ts"></script>