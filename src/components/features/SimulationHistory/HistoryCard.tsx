import { ExternalLink, Goal, Trash2Icon, TrashIcon, type LucideIcon } from 'lucide-react'
import type { SimulationRecord } from '../../../data/simulation'
import { Divider } from '../../shared/Divider'
import { Button } from '../../shared/Button'

interface CardProps {
  icon: LucideIcon
  label: string
  value: string
  subtitle: string
  variant?: 'default' | 'primary'
}

const variantClasses = {
  default: {
    card: 'bg-card',
    accent: 'text-primary',
    value: 'text-foreground',
    subtitle: 'text-muted-foreground',
  },
  primary: {
    card: 'bg-primary',
    accent: 'text-primary-foreground',
    value: 'text-primary-foreground',
    subtitle: 'text-primary-foreground/70',
  },
}
interface HistoryCardProps{
  simulationRecord: SimulationRecord
}

export function HistoryCard({simulationRecord}: HistoryCardProps) {
  

  return (
      <div className="justify-between gap-8 rounded-[22px] p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] mb-3 flex flex-row items-center w-full h-auto">
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
            <div className="font-semibold text-base text-foreground">
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
        <Divider orientation='vertical'/>
        <div className='w-10 h-10 flex items-center justify-center rounded-lg'>
            <Trash2Icon size={24} color='red'/>
        </div>
        <Button variant='secondary' className='w-auto h-auto flex flex-row font-normal text-[12px]'>
            <ExternalLink size={16}/>
            Ver detalhes
        </Button>

        
      </div>
  )
}