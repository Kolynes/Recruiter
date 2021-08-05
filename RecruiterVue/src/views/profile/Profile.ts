import { Vue, Component, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class"
import VFileField from "@/vuetify-extensions/VFileField.vue"
import ExperienceView from "@/components/experience-view/ExperienceView.vue"
import { requiredRule } from "@/utils/rules";

const AccountModule = namespace("AccountModule")

@Component({
    components: {
        VFileField,
        ExperienceView
    }
})
export default class Profile extends Vue {
    @AccountModule.State
    firstName!: string;

    @AccountModule.State
    lastName!: string;

    @AccountModule.State
    email!: string;

    @AccountModule.State
    cv!: string

    @AccountModule.State
    id!: number;

    showUploadCVDialog = false
    cvFile: FileList | null = null
    uploading = false

    @Ref()
    uploadCVForm!: { validate: () => boolean, reset: () => void }

    @AccountModule.Action
    uploadCV!: (cv: File) => Promise<boolean>

    @AccountModule.Action
    ping!: () => Promise<boolean>

    requiredRule = requiredRule

    async callUploadCV() {
        if(this.uploadCVForm.validate()) {
            this.uploading = true
            await this.uploadCV((this.cvFile as FileList)[0])
            this.uploading = false
            this.ping()
            this.uploadCVForm.reset()
            this.showUploadCVDialog = false
            toast({message: "CV Uploaded", left: true})
        }
    }
}