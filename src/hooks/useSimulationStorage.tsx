import {
  type Historico,
  type SimulationFormData,
  type SimulationRecord,
} from '../data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'
//uso do storage pra guardara simuações
export const useSimulationStorage = () => {

  const getTalkHistory = (id: string): Historico => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const simulation = savedData.find((record) =>
      record.id === id
    )
    if(!simulation){
      return []
    }
    const history = simulation?.history
    return history  
  }

  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const date = new Date()
    const createdAt = date.toISOString()
    const history: Historico = []
    const record: SimulationRecord = { ...formData, id, createdAt, history} as SimulationRecord

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }
  const updateTalkHistory = (id: string, history: Historico)=>{
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const simulation = savedData.find((record) =>
      record.id === id
    )
    if(!simulation || !simulation.history){
      console.log("simulação ou histórico não encontrado")
      return
    }
    const updated = savedData.map((record) =>
      record.id === id ? { ...record, history: history } : record,
    )
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  const getFormData = (id: string) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return null
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    return savedData.find((record) => record.id === id) || null
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }
  //lista de simulações
  const getHistory = ()=>{
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return null
    }

    const history = JSON.parse(storage) as SimulationRecord[]
    return history || null
  }

  const deleteSimulation = (id: string)=>{
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []
    const updated = savedData.filter((record) => record.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return { saveFormData, getFormData, updateSimulation, getHistory, deleteSimulation, updateTalkHistory, getTalkHistory}
}