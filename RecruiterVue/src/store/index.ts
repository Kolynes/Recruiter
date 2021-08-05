import Vue from 'vue'
import Vuex from 'vuex'
import AccountModule from './AccountModule'
import AccountsModule from './AccountsModule'
import TestsModule from './TestsModule'
import JobsModule from './JobsModule'
import ApplicationsModule from './ApplicationsModule'
import TestScoreModule from './TestScoreModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AccountModule,
    AccountsModule,
    TestsModule,
    JobsModule,
    ApplicationsModule,
    TestScoreModule
  }
})
