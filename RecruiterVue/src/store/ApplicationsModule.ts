import http from "@/plugins/http";
import { Module, VuexModule, Action, MutationAction } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class ApplicationsModule extends VuexModule {
    applications: IApplication[] = [];

    @Action
    async apply(payload: {job: IJob}): Promise<IJsonResponse> {
        try {
            const response = await http.getJson("/applications/apply/", payload.job, "POST");
            if(response.status == 201)
                this.context.dispatch("listApplications")
            return response
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to save application"
            }}
        }
    }

    @MutationAction({ mutate: ["applications"] })
    async listApplications(payload: {q: string, p: number} = {q: "", p: 1}) {
        try {
            const response = await http.getJson("/applications/list_applications/", payload)
            if(response.status == 200)
                return {
                    applications: payload.p == 1
                        ?response.data
                        :(this.state as this).applications.concat(...response.data)
                }
            else return {
                applications: (this.state as this).applications
            }
        } catch(e) {
            console.log(e)
            return {
                applications: (this.state as this).applications
            }
        }
    }

    @Action
    async setStatus(payload: { applicationId: number, status: string }): Promise<IJsonResponse> {
        try {
            const response = await http.getJson("/applications/set_status/", {
                id: payload.applicationId,
                status: payload.status
            }, "POST")
            if(response.status == 200)
                this.context.dispatch("listApplications")
            return response
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to set application status"
            }}
        }
    }

    @Action
    async setTest(payload: { testId: number, applicationId: number }): Promise<IJsonResponse> {
        try {
            const response = await http.getJson("/applications/set_test/", payload, "POST")
            if(response.status == 200)
                this.context.dispatch("listApplications")
            return response
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to add test to your application"
            }}
        }
    }

    @Action
    async setInterviewLink(payload: { interviewLink: string, applicationId: number }): Promise<IJsonResponse> {
        try {
            const response = await http.getJson("/applications/set_interview_link/", payload, "POST")
            if(response.status == 200)
                this.context.dispatch("listApplications")
            return response
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to add test to your application"
            }}
        }
    }

    @Action
    async delete(payload: {id: number}): Promise<IJsonResponse> {
        try {
            const response = await http.getJson("/applications/delete/", payload)
            if(response)
                this.context.dispatch("listApplications")
            return response;
        } catch(e) {
            console.log(e)
            return {status: 400, error: {
                summary: "Failed to delete application"
            }}
        }
    }
    
}