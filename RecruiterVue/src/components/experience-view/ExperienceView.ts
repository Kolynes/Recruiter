import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { requiredLengthRule, requiredRule } from "@/utils/rules"
import VDateField from "@/vuetify-extensions/VDateField.vue"

const AccountsModule = namespace("AccountsModule")
const AccountModule = namespace("AccountModule")

interface IExperienceExtended extends IExperience {
    deleting: boolean
}

@Component({
    components: {
        VDateField
    }
})
export default class ExperienceView extends Vue {
    @Prop()
    accountId!: number

    details = ""
    institution = "";
    from: string = "";
    to: string = "";
    id: number | null = null;
    creatingExperience = false

    experiences: IExperience[] = []
    experienceDialogVisible = false;
    experienceType: "Work" | "Education" = "Education"

    @Ref()
    addExperienceForm!: { validate: () => boolean, reset: () => null };

    get educationalExperience(): IExperience[] {
        return this.experiences.filter((experience) => experience.type == "Education")
    }

    get workExperience(): IExperience[] {
        return this.experiences.filter((experience) => experience.type == "Work")
    }

    requiredLengthRule = requiredLengthRule;
    requiredRule = requiredRule;

    @AccountsModule.Action
    getExperiences!: (payload: { id: number }) => Promise<IJsonResponse>;

    @AccountModule.Action
    updateExperience!: (payload: { experience: IExperience }) => Promise<IJsonResponse>;

    @AccountModule.Action
    createExperience!: (payload: { experience: IExperience }) => Promise<IJsonResponse>;

    @AccountModule.Action
    deleteExperience!: (payload: { experience: IExperience }) => Promise<IJsonResponse>;

    showAddWorkExperienceDialog() {
        this.experienceType = "Work";
        this.experienceDialogVisible = true;
    }

    showAddEducationExperienceDialog() {
        this.experienceType = "Education";
        this.experienceDialogVisible = true;
    }

    closeAddExperienceDialog() {
        this.id = null;
        this.details = "";
        this.institution = "";
        this.from = "";
        this.to = "";
        this.experienceType = "Education";
        this.experienceDialogVisible = false;
    }

    timespan(experience: IExperience): string {
        let fromYear = experience.fromDate.substring(0, 4);
        let toYear = experience.toDate
            ?experience.toDate.substring(0, 4)
            :"Present"
        return `${fromYear} - ${toYear}`
    }

    selectExperience(experience: IExperience) {
        this.id = experience.id as number;
        this.details = experience.details;
        this.institution = experience.institution;
        this.from = experience.fromDate;
        this.to = experience.toDate;
        this.experienceType = experience.type;
        if(this.experienceType == "Education")
            this.showAddEducationExperienceDialog()
        else this.showAddWorkExperienceDialog()
    }

    async callGetExperiences() {
        var response = await this.getExperiences({ id: this.accountId });
        if (response.status == 200)
            this.experiences = response.data;
    }

    async callUpdateExperience() {
        this.creatingExperience = true;
        var response = await this.updateExperience({
            experience: {
                id: this.id as number,
                details: this.details,
                institution: this.institution,
                fromDate: this.from,
                toDate: this.to,
                type: this.experienceType
            }
        });
        this.creatingExperience = false;
        if (response.status == 200) {
            this.callGetExperiences()
            this.closeAddExperienceDialog()
        }
    }

    async callCreateExperience() {
        this.creatingExperience = true;
        var response = await this.createExperience({
            experience: {
                details: this.details,
                institution: this.institution,
                fromDate: this.from,
                toDate: this.to,
                type: this.experienceType
            }
        });
        this.creatingExperience = false;
        if (response.status == 201){
            this.callGetExperiences()
            this.closeAddExperienceDialog()
        }
    }

    callDeleteExperience(experience: IExperienceExtended) {
        confirm({title: "Delete Experience", icon: "mdi-delete"}).then(async result => {
            if(result) {
                experience.deleting = true
                let response = await this.deleteExperience({experience})
                experience.deleting = false
                if(response.status == 200)
                    this.callGetExperiences()
            }
        })
    }

    mounted() {
        this.callGetExperiences();
    }
}