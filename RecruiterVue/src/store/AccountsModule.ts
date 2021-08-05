import http from "@/plugins/http";
import { Module, MutationAction, VuexModule, Action } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class AccountsModule extends VuexModule {
    accounts: IAccount[] = [];

    @MutationAction({ mutate: ["accounts"]})
    async listAccounts(payload: {q: string, p: number} = {q: "", p: 1}) {
        try {
            var response = await http.getJson("/accounts/list_users/", payload)
            if(payload.p == 1)
                return {
                    accounts: response.data
                }
            else return {
                accounts: (this.state as this).accounts.concat(...response.data)
            }
        } catch(e) {
            console.log(e)
            return {
                accounts: (this.state as this).accounts
            }
        }
    }

    @Action
    async getExperiences(payload: { id: number }): Promise<IJsonResponse> {
        try {
            var response = await http.getJson("/experiences/get/", payload)
            if(response.status == 200)
                response.data = JSON.parse(response.data)
            return response
        } catch(e) {
            console.log(e)
            return { status: 200, error: {
                summary: "Failed to load experiences"
            }}
        }
    }
}