import http from "@/plugins/http";
import { VuexModule, Module, Action, MutationAction } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class JobsModule extends VuexModule {
    jobs: IJob[] = [];

    @Action
    async create(payload: { job: IJob }): Promise<IJsonResponse> {
        try {
            var response = await http.getJson("/jobs/create/", payload.job, "POST");
            if(response.status = 201) 
                this.context.dispatch("listJobs")
            return response
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to create job"
            }}
        }
    }

    @MutationAction({ mutate: ["jobs"] })
    async listJobs(payload: {p: number, q: string } = {p: 1, q: ""}) {
        try {
            var response = await http.getJson("/jobs/list_jobs/", payload)
            if(payload.p == 1)
                return { jobs: response.data }
            else return { jobs: {
                ...(this.state as this).jobs,
                ...response.data
            }}
        } catch(e) {
            console.log(e)
            return { jobs: (this.state as this).jobs }
        }
    }

    @Action
    async update(payload: { job: IJob }): Promise<IJsonResponse> {
        try {
            var response = await http.getJson("/jobs/update/", payload.job, "POST")
            if(response.status == 200)
                this.context.dispatch("listJobs")
            return response;
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to update job"
            }}
        }
    }
    
    @Action
    async delete(payload: { job: IJob }): Promise<IJsonResponse> {
        try {
            var response = await http.getJson("/jobs/delete/", {
                id: payload.job.id
            }, "POST")
            if(response.status == 200)
                this.context.dispatch("listJobs")
            return response;
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to delete job"
            }}
        }
    }

}