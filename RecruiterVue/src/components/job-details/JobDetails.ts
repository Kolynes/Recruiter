import { Vue, Component, Prop } from "vue-property-decorator"
import { namespace } from "vuex-class";

const ApplicationsModule = namespace("ApplicationsModule")
const JobsModule = namespace("JobsModule")

@Component
export default class JobDetails extends Vue {
    @Prop()
    job!: IJob

    @Prop({})
    ["show-more"]!: boolean
    
    showMoreMenu = false
    position = ""
    description = ""
    showEditDialog = false
    applying = false

    @ApplicationsModule.Action
    apply!: (payload: { job: IJob } ) => Promise<IJsonResponse>

    @JobsModule.Action
    delete!: (payload: { job: IJob }) => Promise<IJsonResponse>

    editJob() {
       this.$emit("edit", this.job)
    }

    callApply() {
        confirm({ title: "Apply for this job", icon: "mdi-mailbox" }).then(async result => {
            if(result) {
                this.applying = true
                const response = await this.apply({
                    job: this.job
                })
                this.applying = false
                if(response.status == 201)
                    toast({ message: "Applied for job successfully" })
            }
        })
    }

    deleteJob() {
        confirm({ title: "Delete Job" }).then(async result => {
            if(result) {
                await this.delete({ job: this.job })
                this.$emit("deleted")
                toast({ message: "deleted"})
            }
        })
    }
}