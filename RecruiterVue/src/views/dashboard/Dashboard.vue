<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Recruiter</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer clipped fixed>
      <v-toolbar flat></v-toolbar>
      <v-list>
        <v-list-item
          v-for="(route, index) in routes"
          :key="index"
          :to="route.to"
          @click="route.click"
        >
          <v-list-item-action>
            <v-icon>{{route.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{route.name}}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content class="main-content">
      <v-scroll-x-transition leave-absolute>
        <router-view/>
      </v-scroll-x-transition>
    </v-content>
  </v-app>
</template>

<script src="./Dashboard.ts"></script>

<style scoped>
  .main-content {
    margin-left: 250px
  }
</style>