import { Vue, Component, Watch, Ref } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { requiredLengthRule } from "@/utils/rules"
import VEmptyState from "@/vuetify-extensions/VEmptyState.vue"

const TestsModule = namespace("TestsModule")

@Component({
    components: {
        VEmptyState
    }
})
export default class Tests extends Vue {
    searchString = "";
    searching = false
    searchTimeout: number | undefined = undefined
    showCreateTestDialog = false
    creating = false
    id: number | null = null
    name = ""
    qAndA: IQAndA[] = [
        {answer: "", question: ""}
    ];

    @Ref()
    createTestForm!: { validate: () => boolean, reset: () => void }

    @TestsModule.State
    tests!: ITest[]

    @TestsModule.Action
    listTests!: (payload: {q: string, p: number}) => Promise<void>

    @TestsModule.Action
    create!: (payload: {name: string, qAndA: string}) => Promise<IJsonResponse>

    @TestsModule.Action
    update!: (payload: {name: string, qAndA: string, id: number}) => Promise<IJsonResponse>

    @TestsModule.Action
    delete!: (payload: {test: ITest}) => Promise<IJsonResponse>

    requiredLengthRule = requiredLengthRule

    addQuestion() {
        this.qAndA.push({answer: "", question: ""})
    }
    
    removeQuestion(index: number) {
        this.qAndA = this.qAndA.filter((element, i) => index != i)
    }

    editTest(test: ITest) {
        this.name = test.name,
        this.id = test.id
        this.qAndA = test.qAndA
        this.showCreateTestDialog = true
    }

    async callCreateTest() {
        if(this.createTestForm.validate()) {
            this.creating = true
            const response = await this.create({
                qAndA: JSON.stringify(this.qAndA),
                name: this.name,
            })
            this.creating = false
            if(response.status == 201) {
                this.showCreateTestDialog = false;
                toast({message: "Test created"})
            }
        }
    }

    async callUpdateTest() {
        if(this.createTestForm.validate()) {
            this.creating = true
            const response = await this.update({
                qAndA: JSON.stringify(this.qAndA),
                name: this.name,
                id: this.id as number
            })
            this.creating = false
            if(response.status == 200) {
                this.showCreateTestDialog = false;
                toast({message: "Test updated"})
            }
        }
    }

    async callDelete(test: ITest) {
        confirm({title: "Delete test", icon: "mdi-delete"}).then(async (value) => {
            if(value) {
                toast({loading: true, message: "Deleting test..."})
                const response = await this.delete({test})
                toast(false)
                if(response.status == 200)
                    toast({message: "Test deleted"})
            }
        })
    }

    @Watch("showCreateTestDialog")
    onShowCreateDialogChanged(newValue: boolean) {
        if(!newValue) {
            this.qAndA = [
                {answer: "", question: ""}
            ]
            this.id = null
            this.createTestForm.reset()
        }
    }

    @Watch("searchString")
    onSearchStringChanged(newValue: string) {
        clearTimeout(this.searchTimeout)
        this.searching = true;
        this.searchTimeout = setTimeout(async () => {
            await this.listTests({q: newValue, p: 1});
            this.searching = false;
        }, 500)
    }

    mounted() {
        this.listTests({q: "", p: 1})
    }
}