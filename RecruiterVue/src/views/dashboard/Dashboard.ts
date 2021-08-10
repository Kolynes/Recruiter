import { Vue, Component, Watch } from "vue-property-decorator"
import { namespace } from "vuex-class"

const AccountModule = namespace("AccountModule")
const AccountsModule = namespace("AccountsModule")

interface ILink { to?: string, name: string, icon: string, click?: Function }

@Component
export default class Dashboard extends Vue {
    routes: ILink[] = []

    @AccountModule.State
    id!: number

    @AccountModule.State
    isStaff!: boolean

    @AccountModule.Action
    signOut!: () => Promise<IJsonResponse>

    @AccountModule.Action
    ping!: () => Promise<void>

    @AccountsModule.Action
    getExperiences!: (payload: { id: number }) => Promise<IJsonResponse>

    callSignOut() {
        confirm({ title: "Sign Out", icon: "mdi-power" }).then(async (result) => {
            if (result) {
                var response = await this.signOut()
                if (response.status == 200)
                    this.$router.replace("/")
            }
        })
    }

    @Watch("isStaff")
    onIsStaffChanged(newValue: boolean) {
        if (this.isStaff)
            this.routes = [
                { to: "/dashboard/home", name: "Home", icon: "mdi-home" },
                { to: "/dashboard/applications", name: "Applications", icon: "mdi-mailbox" },
                { to: "/dashboard/jobs", name: "Jobs", icon: "mdi-briefcase" },
                { to: "/dashboard/tests", name: "Tests", icon: "mdi-note" },
                { to: "/dashboard/profile", name: "Profile", icon: "mdi-account" },
                { to: "/dashboard/accounts", name: "Accounts", icon: "mdi-account-multiple" },
                { click: this.callSignOut, name: "Sign Out", icon: "mdi-power" },
            ]
        else this.routes = [
            { to: "/dashboard/home", name: "Home", icon: "mdi-home" },
            { to: "/dashboard/applications", name: "Applications", icon: "mdi-mailbox" },
            { to: "/dashboard/jobs", name: "Jobs", icon: "mdi-briefcase" },
            { to: "/dashboard/profile", name: "Profile", icon: "mdi-account" },
            { click: this.callSignOut, name: "Sign Out", icon: "mdi-power" },
        ]
    }

    mounted() {
        this.ping()
        this.routes = [
            { to: "/dashboard/home", name: "Home", icon: "mdi-home" },
            { to: "/dashboard/applications", name: "Applications", icon: "mdi-mailbox" },
            { to: "/dashboard/jobs", name: "Jobs", icon: "mdi-briefcase" },
            { to: "/dashboard/profile", name: "Profile", icon: "mdi-account" },
            { click: this.callSignOut, name: "Sign Out", icon: "mdi-power" },
        ]
    }
}