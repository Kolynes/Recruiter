import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { requiredLengthRule } from "@/utils/rules"
import JobDetails from "@/components/job-details/JobDetails.vue"
import VEmptyState from "@/vuetify-extensions/VEmptyState.vue"

const JobsModule = namespace("JobsModule");
const AccountModule = namespace("AccountModule");
const nullJob: IJob = { description: "", position: "" }

@Component({
    components: {
        JobDetails,
        VEmptyState
    }
})
export default class Jobs extends Vue {
    searchString = "";
    searching = false
    searchTimeout: number | undefined = undefined
    selectedJob: IJob = nullJob
    showJobFormDialog = false;
    showJobDetailsDialog = false;
    position = "";
    description = "";
    creating = false;

    @JobsModule.State
    jobs!: IJob[]

    @AccountModule.State
    isStaff!: boolean

    @Ref()
    jobForm!: { validate: () => boolean; reset: () => void }

    get jobsIsEmpty(): boolean {
        return this.jobs.length == 0
    }
    
    requiredLengthRule = requiredLengthRule;

    @JobsModule.Action
    listJobs!: (payload: {q: string, p: number}) => Promise<void>

    @JobsModule.Action
    create!: (payload: { job: IJob }) => Promise<IJsonResponse>

    @JobsModule.Action
    update!: (payload: { job: IJob }) => Promise<IJsonResponse>

    selectJob(job: IJob) {
        this.selectedJob = job;
        this.showJobDetailsDialog = true;
    }

    createJob() {
        this.selectedJob = nullJob; 
        this.showJobFormDialog = true
    }

    editJob(job: IJob) {
        this.selectedJob = job
        this.position = this.selectedJob.position;
        this.description = this.selectedJob.description;
        this.showJobFormDialog = true
        this.$nextTick(() => this.showJobDetailsDialog = false)
    }

    async callCreateJob() {
        if(this.jobForm.validate()) {
            this.creating = true;
            const response = await this.create({
                job: {
                    description: this.description,
                    position: this.position
                }
            })
            this.creating = false;
            if(response.status == 201)
                this.showJobFormDialog = false
            else toast({message: (response.error as IErrors).summary, right: true})
        }
    }

    async callUpdateJob() {
        if(this.jobForm.validate()) {
            this.creating = true;
            const response = await this.update({
                job: {
                    id: this.selectedJob.id,
                    description: this.description,
                    position: this.position
                }
            })
            this.creating = false;
            if(response.status == 200)
                this.showJobFormDialog = false
            else toast({message: (response.error as IErrors).summary, right: true})
        }
    }

    @Watch("searchString")
    onSearchStringChanged(newValue: string) {
        clearTimeout(this.searchTimeout)
        this.searching = true;
        this.searchTimeout = setTimeout(async () => {
            await this.listJobs({q: newValue, p: 1});
            this.searching = false;
        }, 500)
    }

    @Watch("showJobFormDialog")
    onShowJobFormDialogChanged(newValue: boolean) {
        if(!newValue)
            this.jobForm.reset()
    }

    mounted() {
        this.listJobs({q: "", p: 1})
    }
}
