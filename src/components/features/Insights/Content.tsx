import { useEffect, useRef, type PropsWithChildren } from "react"
import type { InsightData } from "../../../services/aiService"
import type { Historico } from "../../../data/simulation"
import { Divider } from "../../shared/Divider"
import { LucideMessageCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { MarkdownRenderer } from "./MarkdownRenderer"
import Skeleton from "react-loading-skeleton"

interface ContentProps{
    insight: InsightData
    history: Historico
    isLoading?: boolean
}

function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-foreground text-base font-normal leading-relaxed">{children}</p>
  )
}

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h3 className="text-foreground mt-5 mb-1.5 text-base leading-relaxed font-bold">
      {children}
    </h3>
  )
}
function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="text-foreground ml-6 list-decimal text-base font-normal leading-relaxed">
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  )
}
const statusStyles = {
  viable: {
    label: 'Meta viável no prazo',
    className:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  needs_adjustment: {
    label: 'Ajuste necessário',
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  unfeasible: {
    label: 'Meta inviável no prazo',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
}

export function Content({insight, history, isLoading }: ContentProps) {
  const status = statusStyles[insight.feasibility.status] ?? null
  const fimDoChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fimDoChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  return (
    <div className="lg:scrollbar-thin lg:max-h-93 lg:overflow-y-auto lg:pr-2 lg:[scrollbar-color:var(--border)_transparent]">
      <section className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          <span className="text-foreground text-base font-bold">
            🎯 Viabilidade da Meta
          </span>
          {status && (
            <span
              className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
            >
              {status.label}
            </span>
          )}
        </div>
        <Paragraph>{insight.feasibility.content}</Paragraph>
      </section>

      <section>
        <SectionTitle>💰 Diagnóstico Financeiro</SectionTitle>
        <Paragraph>{insight.diagnosis.content}</Paragraph>
      </section>

      <section>
        <SectionTitle>📋 Sugestões Práticas</SectionTitle>
        <OrderedList items={insight.suggestions.items} />
      </section>

        <section>
            <SectionTitle>💡 Como Aumentar sua Renda</SectionTitle>
            <OrderedList items={insight.extraIncome.items} />
        </section>

        <section>
            <SectionTitle>🏛️ Sugestões de Investimento</SectionTitle>
            <OrderedList items={insight.investment.items} />
        </section>

        <section>
        <SectionTitle>🚀 Mensagem Final</SectionTitle>
        <Paragraph>{insight.motivation.content}</Paragraph>
        </section>

        <Divider orientation='horizontal'/>

        {
          history.slice(2).map((i, index)=>{
            return(
              <div key={index} className='w-full h-auto gap-2.5 flex flex-col'>
                {
                  i.role==='model'?
                    <div className='whitespace-pre-line gap-2.5 flex flex-col'>
                      <p className='text-muted-foreground text-base font-semibold flex flex-row  gap-2'>
                        <LucideMessageCircle/>
                        Resposta da IA
                      </p>
                      <MarkdownRenderer markdownContent={i.parts[0]?.text || 'vazio'} />
                    </div>
                  :
                  <>
                    <p className='text-muted-foreground text-base font-semibold flex flex-row  gap-2'>
                      <LucideMessageCircle/>
                      Você
                    </p>
                    <p className={`text-muted-foreground text-base font-normal`}> {i.parts[0]?.text || 'vazio' } </p>
                  </>  
                }
                <Divider orientation='horizontal'/>
                
              </div>
            )
          })
        }
        {
          isLoading &&  <Skeleton
          count={5.5}
          baseColor="var(--color-skeleton-base)"
          highlightColor="var(--color-skeleton-highlight)"
          className="mb-3  rounded-lg"
          containerClassName="flex-1"
          inline
          />
        }  
        <div ref={fimDoChatRef}></div>
    </div>
  )
}