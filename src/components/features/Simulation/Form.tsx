import { PiggyBank } from "lucide-react";
import { FormStep } from "./FormStep";
import { StepProgress } from "./Progress";
import { useState } from "react";
import { simulationFormSteps, type SimulationFormData } from "../../../data/simulation";
import { useSimulationStorage } from "../../../hooks/useSimulationStorage";
import { useNavigate } from "react-router-dom";

export function SimulationForm(){
    const navigate = useNavigate()
    const {saveFormData} = useSimulationStorage()
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const totalSteps = simulationFormSteps.length
    const currentStep = simulationFormSteps[currentStepIndex]
    const [formData, setFormData] = useState<SimulationFormData>(
        {} as SimulationFormData
    )
    const handleNextStep = (value: string) => {
        const updatedFormData = {
            ...formData,
            [currentStep.id]: value
        }
        setFormData(updatedFormData)
        if(currentStepIndex+1>totalSteps-1){
            saveFormData(updatedFormData)
            const id = saveFormData(updatedFormData)
            void navigate(`/resultado/${id}`)
            return
        }
        setCurrentStepIndex((prev)=>prev+1)
    }
    const handlePreviousStep = () => {
        if(currentStepIndex===0){
            return
        }
        setCurrentStepIndex((prev)=>prev-1)
    }

    return(
        <>
            <StepProgress currentStep={currentStepIndex+1} totalSteps={totalSteps}/>
            <FormStep 
                key={currentStepIndex}
                {...currentStep}
                onBack={handlePreviousStep}
                onNext={handleNextStep}
                hideBackButton={currentStepIndex===0}
            />

        </>
    )
}