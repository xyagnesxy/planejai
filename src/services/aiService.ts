interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}
type Historico = {
  role: 'user' | 'model';
  parts: { text: string }[];
}[]
export const HISTORICO_INICIAL: Historico = []
export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-flash-lite-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

export const callGeminiAPI = async (prompt: string) => {
  
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }
 
 
  return (await response.json()) as GeminiResponse
}

export const continueTalkToGeminiAPI = async (prompt: Historico)=>{
  const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            contents: prompt,
            }),
        })

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }
        return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt)
  const json = response.candidates[0].content.parts[0].text
  return JSON.parse(json) as InsightData
}
export const getResponse = async (prompt: Historico) => {
  console.log("propt que é enviado: ", prompt)
  const response = await continueTalkToGeminiAPI(prompt)
  console.log("response que chega: ", response)
  const json = response.candidates[0].content.parts[0].text
  console.log("json que chega: ", json)
  return json
}
