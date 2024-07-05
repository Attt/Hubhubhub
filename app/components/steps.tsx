import { useEffect, useState } from "react";
import StepHeader from "./step-header";

export default function Steps({ steps, currentId, clickCallback }: { steps: { id: number, name: string, headerHref?: string, element: JSX.Element }[], currentId: number, clickCallback?: (id: number) => void }) {
    const [elements, setElements] = useState(steps.map((step) => {
        return {
            id: step.id,
            ele: step.element,
        }
    }))

    const [headerSteps, setHeaderSteps] = useState(steps.map((step) => {
        return {
            id: step.id,
            name: step.name,
            href: step.headerHref,
        }
    }))

    useEffect(() => {
        setHeaderSteps(steps.map((step) => {
            return {
                id: step.id,
                name: step.name,
                href: step.headerHref,
            }
        }))

        setElements(steps.map((step) => {
            // console.log(step.element)
            return {
                id: step.id,
                ele: step.element,
            }
        }))

    }, [currentId])

    return (
        <>
            <StepHeader
                steps={headerSteps}
                currentId={currentId}
                clickCallback={clickCallback}
            ></StepHeader>
            {elements.map((eleObj) => {
                // return <div style={{ visibility: currentId == eleObj.id ? "visible" : "hidden" }}>
                //     {eleObj.ele}
                // </div>
                return <div key={eleObj.id} hidden={currentId != eleObj.id}>
                    {eleObj.ele}
                </div>
            })}
        </>
    )
}