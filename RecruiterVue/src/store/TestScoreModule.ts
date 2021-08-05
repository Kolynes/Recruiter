import http from "@/plugins/http";
import { VuexModule, Module, Action, MutationAction } from "vuex-module-decorators"

@Module({ namespaced: true })
export default class TestScoreModule extends VuexModule {
    testScores: ITest[] = []

    @Action
    async createTestScore(payload: { applicationId: number, answer: string }): Promise<IJsonResponse> {
        try {
            return await http.getJson("/test_scores/create/", payload, "POST")
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to create test score"
            }}
        }
    }

    @Action
    async scoreTest(payload: { testScoreId: number, score: string }): Promise<IJsonResponse> {
        try {
            var response = await http.getJson("/test_scores/score_test/", payload, "POST")
            return response;
        } catch(e) {
            console.log(e)
            return { status: 400, error: {
                summary: "Failed to score test"
            }}
        }
    }
}