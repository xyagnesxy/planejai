import { useInsight } from "../../../hooks/useInsight"
import { Error } from "../Insights/Error"
import { Content } from "../Insights/Content"
import { RefreshCw, Send } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../../shared/Button"
import Skeleton from "react-loading-skeleton"

interface AiInsightCardProps{
    simulationId: string
}

export function AiInsightCard({simulationId}: AiInsightCardProps){
    const {insight, error, chatError, retryLastMesage, isLoading, fetchInsight, talkToGemini, history, } = useInsight(simulationId)
    const [userInput, setUserInput] = useState('')
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!userInput.trim()){
            return
        }
        conversa()
        setUserInput('')
    }

    async function conversa(){
        const input = document.getElementById('input') as HTMLInputElement
        const valor = input.value
        try{
            await talkToGemini(valor)
        }
        catch(e){
            console.log("deu erro: ", e)
        }
    }
    useEffect(()=>{
        console.log("isLoading: ", isLoading)
    }, [isLoading])
    return(
        <div className=" bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
            <div className="mb-3 flex items-center gap-1.5">
                <span>✨</span>
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                    Insight Financeiro Personalizado
                </span>
            </div>

            {!isLoading && error && <Error simulationId={simulationId} message={error} onRetry={()=>fetchInsight(simulationId)} />}
            {insight && !error && <Content history={history} insight={insight} isLoading={isLoading}/>}
            {!isLoading && chatError && 
            <div className="flex h-auto flex-col items-center justify-center gap-3 p-6">
                <p className="text-sm text-red-500"> ⚠️ {chatError}</p>
                <Button
                variant="primary"
                className="px-6"
                icon={RefreshCw}
                onClick={retryLastMesage}
                >
                Tentar novamente
                </Button>
            </div>}
            {
                isLoading && !error && <Skeleton
                    count={5.5}
                    baseColor="var(--color-skeleton-base)"
                    highlightColor="var(--color-skeleton-highlight)"
                    className="mb-3  rounded-lg"
                    containerClassName="flex-1"
                    inline
                />
            }
            
            

            <form
            onSubmit={handleSubmit}
            className="flex items-center w-full h-auto justify-between gap-2.5">
                <input
                id="input"
                type="text"
                value={userInput}
                onChange={(e)=>setUserInput(e.target.value)}
                className="bg-input w-173.75 h-13.5 rounded-2xl shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]"
                    
                />
                <button type="submit" id="botao" className='w-15 h-15 rounded-2xl bg-primary flex items-center justify-center'
                    disabled={isLoading}
                >
                    <Send size={26.67} className='text-primary-foreground'/>
                </button>

            </form>
        </div>
    )

}