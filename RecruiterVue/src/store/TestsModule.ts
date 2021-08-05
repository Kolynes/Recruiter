import http from "@/plugins/http"
import { VuexModule, Module, Action, MutationAction } from "vuex-module-decorators"

@Module({ namespaced: true })
export default class TestModule extends VuexModule {
    tests: ITest[] = []

    @Action
    async create(payload: { name: string, qAndA: string }): Promise<IJsonResponse> {
        try {
            var response = await http.getJson("/tests/create/", payload, "POST")
            if(response.status == 201)
                this.context.dispatch("listTests")
            return response;
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to create test"
            }}
        }
    }

    @MutationAction({ mutate: ["tests"]})
    async listTests(payload: {q: string, p: number} = {q: "", p: 1}) {
        try {
            var response = await http.getJson("/tests/list_tests/", payload)
            if(payload.p == 1)
                return {
                    tests: response.data
                }
            else return {
                tests: (this.state as this).tests.concat(...response.data)
            }
        } catch(e) {
            console.log(e)
            return {
                tests: (this.state as this).tests
            }
        }
    }

    @Action
    async update(payload: { name: string, qAndA: string, id: number}): Promise<IJsonResponse> {
        try {
            const response = await http.getJson("/tests/update/", payload, "POST")
            if(response.status == 200)  
                this.context.dispatch("listTests")
            return response;
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to update test"
            }}
        }
    }

    @Action
    async delete(payload: {test: ITest}): Promise<IJsonResponse> {
        try {
            const response = await http.getJson("/tests/delete/", {
                id: payload.test.id
            })
            if(response.status == 200)
                this.context.dispatch("listTests")
            return response;
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to delete test"
            }}
        }
    }

}