import { Vue, Component } from "vue-property-decorator"
import { namespace } from "vuex-class"

const AccountModule = namespace("AccountModule")

@Component
export default class Home extends Vue {
    @AccountModule.State
    firstName!: string

    @AccountModule.State
    lastName!: string

    @AccountModule.State
    isStaff!: boolean

    @AccountModule.State
    numberOfAccounts!: number

    @AccountModule.State
    numberOfTests!: number

    @AccountModule.State
    numberOfJobs!: number

    @AccountModule.State
    numberOfApplications!: number

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

}