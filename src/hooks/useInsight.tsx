import { useCallback, useEffect, useRef, useState } from "react"
import { getInsight, getResponse, type InsightData } from "../services/aiService"
import { useSimulationStorage } from "./useSimulationStorage"
import { buildAIPrompt } from "../data/aiPrompt"
import type { Historico, SimulationRecord } from "../data/simulation"

export const useInsight = (id: string)=>{
    const isRequestPending = useRef(false)
    const {getFormData, updateSimulation, updateTalkHistory, getTalkHistory} = useSimulationStorage()
    const [history, setHistory] = useState<Historico>(getTalkHistory(id))
    const [userLastMesage, setUserLastMesage] = useState('')
    const [insight, setInsight] = useState<InsightData | null>(()=>{
        const simulation = getFormData(id)
        if(simulation?.insight){
            return simulation.insight
        }
        return null
    })
    const [error, setError] = useState<string | null>()
    const [chatError, setChatError] = useState<string | null>()
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
                const initialHistory: Historico =  [{
                    role: 'model',
                    parts: [{text: JSON.stringify(data)}]
                    
                }]
                updateSimulation(simulationId, {
                    ...simulation,
                    insight: data
                } as SimulationRecord)
                updateTalkHistory(simulationId, initialHistory)
                setHistory(initialHistory)
                setInsight(data)
                setError(null)
            }catch{
                setError('Erro ao gerar o diagnóstico. Tente novamente.')
            }finally{
                isRequestPending.current = false
                setIsLoading(false)
            }
        }, []
    )
    const talkToGemini = async (input: string)=>{
        try{
            setUserLastMesage(input)
            setError(null)
            setChatError(null)
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
            const finalHistory: Historico = [...newHistory, {
                role: 'model',
                parts: [{text: geminiResponse}]
            }]
            setHistory(finalHistory)
            updateTalkHistory(id, history)
            setUserLastMesage('')
            return geminiResponse
        }catch(e){
            setChatError('Erro ao gerar resposta. Tente novamente.')
            console.log("erro: ", e)
        }finally{
            setIsLoading(false)
        }
    }
    const retryLastMesage = async()=>{
        if(!userLastMesage){
            return
        }
        talkToGemini(userLastMesage)
    }

    useEffect(()=>{
        //evita loop infinito de requisições para a API do Gemini
        if(insight || isLoading || error || isRequestPending.current){
            return
        }
        fetchInsight(id)
    }, [id, insight, isLoading, error, fetchInsight, getTalkHistory])

    return {insight, error, chatError, setChatError, isLoading, setIsLoading, fetchInsight, talkToGemini, getTalkHistory, history, setHistory, retryLastMesage}
}