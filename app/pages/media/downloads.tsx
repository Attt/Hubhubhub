import { useFlipRefreshFlag, useRefreshFlag } from "@/app/reducers";
import { useEffect } from "react";

export default function Downloads() {

    const refreshFlag = useRefreshFlag();
    const flipRefreshFlag = useFlipRefreshFlag();

    useEffect(() => {
        const loadData = async (afterSuccess: (data: any) => void) => {
            // TODO load donwloads
        }

        loadData((data) => {
            // sleep for 5 second
            setTimeout(() => {
                flipRefreshFlag({});
            }, 5000);
        })
    }, [refreshFlag]);

    return <></>
}