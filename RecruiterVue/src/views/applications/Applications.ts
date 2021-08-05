import { Vue, Component, Watch, Ref } from "vue-property-decorator"
import { namespace } from "vuex-class"
import VEmptyState from "@/vuetify-extensions/VEmptyState.vue"
import { requiredRule } from "@/utils/rules"

const ApplicationsModule = namespace("ApplicationsModule")
const TestsModule = namespace("TestsModule")
const TestScoreModule = namespace("TestScoreModule")
const AccountModule = namespace("AccountModule")
const nullApplication = <IApplication>{ createdOn: "", job: {}, status: "Pending", test: {}, user: {}, testScore: {}}

@Component({
    components: {
        VEmptyState
    }
})
export default class Tests extends Vue {
    searchString = "";
    searching = false
    searchTimeout: number | undefined = undefined
    showApplicationDetailsDialog = false
    showSetTestDialog = false
    selectedApplication: IApplication = nullApplication
    status: "Pending" | "Approved" | "Declined" | "" = ""
    interviewLink = ""
    applicationStatusChoices = ["Pending", "Approved", "Declined"]
    settingStatus = false
    settingInterviewLink = false
    settingTest = false
    tab = 0
    test: ITest | null = null
    showTakeTestDialog = false
    answers: string[] = []
    submitingTest = false
    submitingMarkedTest = false
    showMarkTestDialog = false
    score = 0

    @Ref()
    setApplicationStatusForm!: { validate: () => boolean, reset: () => null }

    @Ref()
    setApplicationInterviewLinkForm!: { validate: () => boolean, reset: () => null }

    @Ref()
    setTestForm!: { validate: () => boolean, reset: () => null }

    @Ref()
    testForm!: { validate: () => boolean, reset: () => null }

    @Ref()
    scoreTestForm!: { validate: () => boolean, reset: () => null }

    @AccountModule.State
    isStaff!: boolean

    @ApplicationsModule.State
    applications!: IApplication[]

    @TestsModule.State
    tests!: ITest[]

    @ApplicationsModule.Action
    setStatus!: (payload: { applicationId: number, status: string }) => Promise<IJsonResponse>

    @ApplicationsModule.Action
    listApplications!: (payload: { q: string, p: number }) => Promise<void>

    @ApplicationsModule.Action
    setInterviewLink!: (payload: { applicationId: number, interviewLink: string }) => Promise<IJsonResponse>

    @ApplicationsModule.Action
    setTest!: (payload: { applicationId: number, testId: number }) => Promise<IJsonResponse>

    @TestsModule.Action
    listTests!: (payload: {q: string, p: number}) => Promise<void>

    @TestScoreModule.Action
    createTestScore!: (payload: { applicationId: number, answers: string }) => Promise<IJsonResponse> 

    @TestScoreModule.Action
    scoreTest!: (payload: { testScoreId: number, score: string }) => Promise<IJsonResponse>

    requiredRule = requiredRule;


    selectApplication(application: IApplication) {
        this.selectedApplication = application;
        this.status = application.status;
        this.interviewLink = application.interviewLink;
        this.test = application.test
        for(let qAndA in this.test.qAndA)
            this.answers.push("")
        this.showApplicationDetailsDialog = true
    }

    takeTest() {
        this.showTakeTestDialog = true
    }

    markTest() {
        this.showMarkTestDialog = true
        this.score = 0
    }

    async callScoreTest() {
        if(this.scoreTestForm.validate()) {
            this.submitingMarkedTest = true
            const response = await this.scoreTest({
                testScoreId: this.selectedApplication.testScore.id as number,
                score: `${this.score} / ${this.selectedApplication.test.qAndA.length}`
            })
            this.submitingMarkedTest = false
            if(response.status == 200) {
                toast({message: "Test Scored"})
                this.showMarkTestDialog = false
                this.selectedApplication.testScore.score = `${this.score} / ${this.selectedApplication.test.qAndA.length}`
                this.listApplications({q: "", p: 1})
            }
        }
    }

    async callSetStatus() {
        if(this.setApplicationStatusForm.validate()) {
            this.settingStatus = true
            const response = await this.setStatus({
                applicationId: this.selectedApplication.id as number,
                status: this.status
            })
            this.settingStatus = false
            if(response.status == 200) {
                this.showApplicationDetailsDialog = false;
                toast({ message: "Application status updated" })
            }
        }
    }

    async callSetInterviewLink() {
        if(this.setApplicationInterviewLinkForm.validate()) {
            this.settingInterviewLink = true
            const response = await this.setInterviewLink({
                applicationId: this.selectedApplication.id as number,
                interviewLink: this.interviewLink
            })
            this.settingInterviewLink = false
            if(response.status == 200) {
                this.showApplicationDetailsDialog = false;
                toast({ message: "Application interview updated" })
            }
        }
    }

    async callSetTest() {
        if(this.setTestForm.validate()) {
            this.settingTest = true
            const response = await this.setTest({
                applicationId: this.selectedApplication.id as number,
                testId: (this.test as ITest).id
            })
            this.settingTest = false
            if(response.status == 200) {
                this.showApplicationDetailsDialog = false;
                toast({ message: "Application test updated" })
            }
        }
    }
    
    async callCreateTestScore() {
        if(this.testForm.validate()) {
            this.submitingTest = true
            const response = await this.createTestScore({
                applicationId: this.selectedApplication.id as number,
                answers: JSON.stringify(this.answers)
            })
            this.submitingTest = false
            if(response.status == 201) {
                await this.listApplications({p: 1, q: ""})
                this.showTakeTestDialog = false;
                toast({ message: "Application test submitted" })
            }
        }
    }

    @Watch("searchString")
    onSearchStringChanged(newValue: string) {
        clearTimeout(this.searchTimeout)
        this.searching = true;
        this.searchTimeout = setTimeout(async () => {
            await this.listApplications({ q: newValue, p: 1 });
            this.searching = false;
        }, 500)
    }

    @Watch("showApplicationDetailsDialog")
    onShowApplicationDetailsDialogChanged(newValue: boolean) {
        if(!newValue) {
            this.interviewLink = ""
            this.test = null
            this.answers = []
        }
    }

    mounted() {
        this.listApplications({ q: "", p: 1 })
        this.listTests({ q: "", p: 1 })
    }
}