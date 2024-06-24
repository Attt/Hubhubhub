import StepHeader from "./step-header";

export default function Steps({steps, currentId, clickCallback}: {steps: {id: number, name: string, headerHref?: string, element: JSX.Element}[], currentId: number, clickCallback?: (id: number) => void}) {
    
    const headerSteps = steps.map((step) => {
        return {
            id: step.id,
            name: step.name,
            href: step.headerHref,
        }
    })

    const elements = steps.map((step) => {
        return {
            id: step.id,
            ele: step.element,
        }
    })
    
    return(
        <>
            <StepHeader
                steps={headerSteps}
                currentId={currentId}
                clickCallback={clickCallback}
            ></StepHeader>
            {elements.map((eleObj) => {
                <div style={{visibility : currentId == eleObj.id ? "visible" : "hidden"}}>
                    {eleObj.ele}
                </div>
            })}
        </>
    )
}