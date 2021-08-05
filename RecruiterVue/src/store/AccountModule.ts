import { Action, Module, Mutation, MutationAction, VuexModule } from "vuex-module-decorators";
import http from "@/plugins/http"

@Module({ namespaced: true })
export default class AccountModule extends VuexModule implements IAccount {
    firstName = "";
    lastName = "";
    email = "";
    cv = "";
    id = -1;
    isStaff = false
    isSuperuser = false
    numberOfApplications = 0;
    numberOfTests = 0;
    numberOfJobs = 0;
    numberOfAccounts = 0;
    uploadProgress = 0
    experiences: IExperience[] = []

    @Mutation
    setUploadProgress(payload: {progress: number}) {
        this.uploadProgress = payload.progress
    }

    @Action
    async login(payload: {username: string, password: string}): Promise<IJsonResponse> {
        try {
            return await http.getJson("/accounts/sign_in/", payload, "POST")
        } catch(e) {
            console.log(e)
            return {status: 400, error: {
                "summary": "Failed to reach server"
            }}
        }
    }

    @Action
    async createAccount(payload: {first_name: string, last_name: string, email: string, password: string}): Promise<IJsonResponse> {
        try {
            return await http.getJson("/accounts/sign_up/", payload, "POST")
        } catch(e) {
            console.log(e)
            return {status: 400, error: {
                "summary": "Failed to reach server"
            }}
        }
    }

    @MutationAction({ mutate: ["firstName", "lastName", "email", "cv", "id", "isStaff", "isSuperuser", "numberOfAccounts", "numberOfTests", "numberOfJobs", "numberOfApplications"] })
    async ping() {
        try {
            var response = await http.getJson("/accounts/ping/")
            if(response.status == 200)
                return response.data
        } catch(e) {
            console.log(e)
            return {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                cv: this.cv,
                id: this.id,
                numberOfAccounts: this.numberOfAccounts,
                numberOfApplications: this.numberOfApplications,
                numberOfJobs: this.numberOfJobs,
                numberOfTests: this.numberOfTests,
            }
        }
    }

    @Action
    async uploadCV(cv: File): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                var request = http.createXHR("POST", "/accounts/upload_cv/")
                var form = new FormData()
                form.append("cv", cv)
                request.onprogress = (progressEvent) => {
                    this.context.commit("setUploadProgress", {
                        progress: (cv.size - progressEvent.total) / cv.size * 100
                    })
                }
                request.onloadstart = (progressEvent) => {
                    this.context.commit("setUploadProgress", {
                        progress: 0
                    })
                }
                request.onload = () => resolve(true)
                request.send(form)
            } catch(e) {
                console.log(e)
                reject(false)
            }
        })
    }

    @Action
    async updateExperience(payload: { experience: IExperience }): Promise<IJsonResponse> {
        try {
            return await http.getJson("/experiences/update/", payload.experience, "POST");
        } catch(e) {
            console.log(e);
            return { status: 400, error: {
                summary: "Failed to update experiences"
            }}
        }
    }

    @Action
    async createExperience(payload: { experience: IExperience }): Promise<IJsonResponse> {
        try {
            return await http.getJson("/experiences/create/", payload.experience, "POST");
        } catch(e) {
            console.log(e);
            return { status: 400, error: {
                summary: "Failed to update experiences"
            }}
        }
    }

    @Action
    async deleteExperience(payload: { experience: IExperience }): Promise<IJsonResponse> {
        try {
            return await http.getJson("/experiences/delete/", { id: payload.experience.id }, "POST");
        } catch(e) {
            console.log(e);
            return { status: 400, error: {
                summary: "Failed to update experiences"
            }}
        }
    }

    @Action
    async signOut(): Promise<IJsonResponse> {
        try {
            return http.getJson("/accounts/sign_out/", {}, "POST")
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to reach server"
            }}
        }
    }
}