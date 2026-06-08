import { useEffect, useState } from "react";
import { HistoryCard } from "../components/features/SimulationHistory/HistoryCard";
import { PageHero } from "../components/shared/PageHero";
import { useSimulationStorage } from "../hooks/useSimulationStorage";
import type { SimulationRecord } from "../data/simulation";

export function SimulationHistoryPage(){
    const {getFormData, getHistory, deleteSimulation} = useSimulationStorage()
    
    
    const [historico, setHistorico] = useState<SimulationRecord[] | null>(getHistory())
    const handleDelete = (id:string)=>{
        deleteSimulation(id)
        setHistorico(getHistory())
    }
    if(!historico){
        return <p>Nenhuma simulação encontrada</p>
    }
        
    
    return(
        <div className="flex flex-col max-w-6xl h-auto gap-6 py-10 px-25">
            <PageHero title="Histórico de simulações" subtitle="Acompanhe o histórico de seus planos financeiros"/>
            
            {historico.map(i=>{
                return(
                    <HistoryCard key={i.id} simulationRecord={i} handleDelete={handleDelete}/>
                )
                
            })}
            
        </div>
    )
}