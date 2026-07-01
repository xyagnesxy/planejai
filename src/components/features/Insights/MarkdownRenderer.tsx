import ReactMarkdown, {type Components} from 'react-markdown'

// mapa de tag htmo -> estilo css
const markdownComponents: Components = {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
    h3: ({children})=> <h3 className="text-foreground mt-5 mb-1.5 text-base leading-relaxed font-bold">{children}</h3>,
    p: ({children})=> <p className='whitespace-pre-line text-foreground text-base font-normal leading-relaxed'>{children}</p>,
    ol: ({children})=><ol className="text-foreground ml-6 list-decimal text-base font-normal leading-relaxed">{children}</ol>,
    ul: ({ children }) =><ul className="list-decimal text-foreground ml-6 text-base font-normal leading-relaxed">{children}</ul>,
    li: ({children})=><li className="pl-1">{children}</li>,
    
    // Negrito e Itálico
    strong: ({ children }) => <strong className="font-bold text-custom-important">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    hr: () => <hr className="my-3 border-t border-gray-300" />

}

export function MarkdownRenderer({markdownContent}: {markdownContent: string}){
    const cleanText = markdownContent.replace(/\\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^"|"$/g, '')
    return(
        <ReactMarkdown components={markdownComponents}>
            {cleanText}
        </ReactMarkdown>
    )
}