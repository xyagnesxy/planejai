import { ExternalLink, Goal, Trash2Icon } from 'lucide-react'
import type { SimulationRecord } from '../../../data/simulation'
import { Divider } from '../../shared/Divider'
import { Button } from '../../shared/Button'
import { useNavigate } from 'react-router-dom'

interface HistoryCardProps{
  simulationRecord: SimulationRecord
  handleDelete: (id: string)=>void
}

export function HistoryCard({simulationRecord, handleDelete}: HistoryCardProps) {
    const navigate = useNavigate()

  return (
      <div className="justify-between gap-6 md:gap-8 rounded-[22px] p-6.5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] mb-3 flex flex-col md:flex-row items-start md:items-center w-full h-auto bg-card">
        <div className='w-10 h-10 bg-[#ece5f8] flex items-center justify-center rounded-lg'>
            <Goal size={26.67} className='text-primary'/>
        </div>
        <div className='font-semibold w-47.5 h-auto'>
            <div className="font-semibold text-base text-foreground">
                {simulationRecord.goalName}
            </div>
            <div className='text-sm font-normal text-muted-foreground'>
                {new Date(simulationRecord.createdAt).toLocaleDateString('pt-BR')}
            </div> 

        </div>
        <div>
            <div className="font-semibold text-[12px] text-muted-foreground">
                CUSTO DA META
            </div>
            <div className="font-semibold text-base text-foreground ">
                R$ {simulationRecord.goalAmount}
            </div> 
        </div>
        <div>
            <div className="font-semibold text-[12px] text-muted-foreground">
                PRAZO
            </div>
            <div className=" font-semibold text-base text-foreground">
               {simulationRecord.goalDeadline} {simulationRecord.goalDeadline === '1' ? 'mês' : 'meses'}
            </div> 
        </div>
        <div >
            <div className="font-semibold text-[12px] text-muted-foreground">
                ECONOMIA MENSAL
            </div>
            <div className=" font-semibold text-base text-foreground">
               R$ {simulationRecord.income}
            </div> 
        </div>

        <Divider orientation='horizontal' className='md:hidden'/>

        <div className='flex flex-row items-center justify-between w-full md:w-auto h-8'>
            <div className='w-26.25 md:w-auto h-auto flex items-center justify-center rounded-lg cursor-pointer'
                onClick={()=>handleDelete(simulationRecord.id)}>
                <Trash2Icon size={24} color='red'/>
                
            </div>
            <Divider orientation='vertical'/>
            <div className="w-auto py-2 px-4 md:w-auto h-auto">
                <Button variant='secondary' className='w-auto h-auto flex flex-row p-2 font-normal text-[12px]'
                    onClick={()=>navigate(`/resultado/${simulationRecord.id}`)}
                >
                    <ExternalLink size={16}/>
                    Ver detalhes
                </Button>

            </div>

        </div>

        
      </div>
  )
}