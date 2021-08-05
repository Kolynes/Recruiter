<template>
  <div>
    <h1 class="title">{{ job.position }}</h1>
    <span class="caption"> {{ new Date(job.createdOn).toDateString() }} </span>
    <p class="body-1 mt-2">{{ job.description }}</p>
    <v-btn rounded small color="primary" @click="callApply" :disabled="job.applied"> {{job.applied? "applied" : "apply"}} </v-btn>
    <v-menu v-model="showMoreMenu" offset-x="50" right v-if="showMore">
        <template #activator="{ on, attrs }">
            <v-btn rounded small color="primary" text v-on="on" v-bind="attrs">
                more
                <v-icon> mdi-arrow-down-drop-circle </v-icon>
            </v-btn>
        </template>
        <template>
            <v-list>
                 <v-list-item @click="editJob">
                    <v-icon class="mr-2"> mdi-pencil </v-icon>
                    <v-list-item-content>
                        <span> Edit </span>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="deleteJob">
                    <v-icon class="mr-2"> mdi-delete </v-icon>
                    <v-list-item-content>
                        <span> Delete </span>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
    </v-menu>
  </div>
</template>

<script src="./JobDetails.ts"></script>