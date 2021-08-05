import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

const AccountsModule = namespace("AccountsModule");
const nullAccount = { firstName: "", lastName: "", email: "", id: 0, cv: "", isStaff: false, isSuperuser: false};

@Component
export default class Accounts extends Vue {
    searchString = "";
    searching = false
    searchTimeout: number | undefined = undefined
    showProfileDialog = false
    selectedAccount: IAccount = nullAccount;

    @AccountsModule.State
    accounts!: IAccount[]

    @AccountsModule.Action
    listAccounts!: (payload: {q: string, p: number}) => Promise<void>

    selectAccount(account: IAccount) {
        this.selectedAccount = account;
        this.showProfileDialog = true;
    }

    @Watch("searchString")
    onSearchStringChanged(newValue: string) {
        clearTimeout(this.searchTimeout)
        this.searching = true;
        this.searchTimeout = setTimeout(async () => {
            await this.listAccounts({q: newValue, p: 1});
            this.searching = false;
        }, 500)
    }

    @Watch("showProfileDialog")
    onShowProfileDialogChanged(newValue: boolean) {
        if(!newValue)
            this.selectedAccount = nullAccount
    }

    mounted() {
        this.listAccounts({q: "", p: 1})
    }
}