import { useFlipRefreshFlag, useRefreshFlag } from "@/app/reducers";
import { GET, getAPIUrl } from "@/app/requests";
import { useEffect, useState } from "react";

export default function Downloads() {

    const refreshFlag = useRefreshFlag();
    const flipRefreshFlag = useFlipRefreshFlag();

    const [downloads, setDownloads] = useState([] as any[]);

    useEffect(() => {
        const loadData = async (afterSuccess: (data: any) => void) => {
            // TODO load donwloads
            GET(getAPIUrl("query_all_downloads"), (data) => {
                afterSuccess(data)
            }, (err) => {
                
            })
        }

        loadData((data) => {
            setDownloads(data)
            // sleep for 5 second
            setTimeout(() => {
                flipRefreshFlag({});
            }, 5000);
        })
    }, [refreshFlag]);

    return <></>
}