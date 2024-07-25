import { CreateDrive115TaskForm, TaskListBody } from "@/app/components/115/task-list";
import { HeaderButton } from "@/app/components/button-header";
import { APITokenContext } from "@/app/contexts";
import { Drive115ListData } from "@/app/interfaces";
import { useFlipRefreshFlag, useRefreshFlag, useToggleLoading } from "@/app/reducers";
import { GET, getAPIUrl } from "@/app/requests";
import { useContext, useEffect, useState } from "react";

export default function Drive115Tasks() {
    const refreshFlag = useRefreshFlag();
    const flipRefreshFlag = useFlipRefreshFlag();
    const toggleLoading = useToggleLoading();

    const [drive115Tasks, setDrive115Tasks] = useState([] as Drive115ListData[]);
    const apiTokenContext = useContext(APITokenContext);

    const [openCreateForm, setOpenCreateForm] = useState(false);

    useEffect(() => {
        const loadData = async (afterSuccess: (data: Drive115ListData[]) => void) => {
            getAPIUrl("query_115_tasks") && GET(getAPIUrl("query_115_tasks") + '?token=' + apiTokenContext, (data) => {
                afterSuccess(data)
            }, (err) => {
                // sleep for 5 second
                setTimeout(() => {
                    flipRefreshFlag({});
                }, 5000);
            })
        }

        loadData((data) => {
            setDrive115Tasks(data)
            // sleep for 5 second
            setTimeout(() => {
                flipRefreshFlag({});
            }, 5000);
        })
    }, [refreshFlag]);
    
    return (
        <div className='mx-auto max-w-8xl px-4 py-2 md:px-8 lg:px-8'>
            <CreateDrive115TaskForm
                open={openCreateForm}
                setOpen={setOpenCreateForm}
            />
            <HeaderButton
                buttonText='新增115离线任务'
                buttonTrigger={() => setOpenCreateForm(true)}
            >
            </HeaderButton>
            <TaskListBody
                drive115Tasks={drive115Tasks}
            ></TaskListBody>
        </div>
    )
}