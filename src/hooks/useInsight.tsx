import { useCallback, useEffect, useRef, useState } from "react"
import { getInsight, getResponse, type InsightData } from "../services/aiService"
import { useSimulationStorage } from "./useSimulationStorage"
import { buildAIPrompt } from "../data/aiPrompt"
import type { Historico, SimulationRecord } from "../data/simulation"

export const useInsight = (id: string)=>{
    const isRequestPending = useRef(false)
    const {getFormData, updateSimulation, updateTalkHistory, getTalkHistory} = useSimulationStorage()
    const [history, setHistory] = useState<Historico>(getTalkHistory(id))
    const [insight, setInsight] = useState<InsightData | null>(()=>{
        const simulation = getFormData(id)
        if(simulation?.insight){
            return simulation.insight
        }
        return null
    })
    const [error, setError] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false)
    const fetchInsight = useCallback(
        //posso tirar o array de dependências?
        async (simulationId: string)=>{

            const simulation = getFormData(simulationId)
            if(!simulation){
                setError('Simulação não encontrada')
                return null
            }
            isRequestPending.current = true
            setIsLoading(true)
            try{
                const prompt = buildAIPrompt(simulation)
                const data = await getInsight(prompt)
                //setInsight(data)
                updateSimulation(simulationId, {
                    ...simulation,
                    insight: data
                } as SimulationRecord)
                updateTalkHistory(simulationId, history)
                setHistory(getTalkHistory(simulationId))
                setError(null)
            }catch{
                setError('Erro ao gerar o diagnóstico. Tente novamente.')
            }finally{
                isRequestPending.current = false
                setIsLoading(false)
            }
        }, [getFormData, updateSimulation]
    )
    const talkToGemini = async (input: string)=>{
        try{
            setError(null)
            setIsLoading(true)
            //seta novo histórico localmente com a entrada do usuário
            const newHistory = [...history, {
                role: 'user',
                parts: [{text: input}]
            }] as Historico
            setHistory(newHistory)
            //chama o gemini com o novo histórico
            const geminiResponse = await getResponse(newHistory)
            //seta novo histórico localmente, agora com a resposta do gemini
            setHistory([...newHistory, {
                role: 'model',
                parts: [{text: geminiResponse}]
            }])
            updateTalkHistory(id, history)
            return geminiResponse
        }catch(e){
            setError('Erro ao gerar resposta. Tente novamente.')

            console.log("erro: ", e)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        //evita loop infinito de requisições para a API do Gemini
        if(insight || isLoading || error || isRequestPending.current){
            return
        }
        fetchInsight(id)
    }, [id, insight, isLoading, error, fetchInsight, getTalkHistory])

    return {insight, error, isLoading, setIsLoading, fetchInsight, talkToGemini, getTalkHistory, history, setHistory}
}