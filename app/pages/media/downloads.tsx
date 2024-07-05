import { APITokenContext } from "@/app/contexts";
import { useFlipRefreshFlag, useRefreshFlag } from "@/app/reducers";
import { GET, getAPIUrl } from "@/app/requests";
import { useContext, useEffect, useState } from "react";
import { DownloadListBody } from "@/app/components/media/download-list";
import { DownloadListData } from "@/app/interfaces";


export default function Downloads() {

    const refreshFlag = useRefreshFlag();
    const flipRefreshFlag = useFlipRefreshFlag();

    const [downloads, setDownloads] = useState([] as DownloadListData[]);
    const apiTokenContext = useContext(APITokenContext);

    useEffect(() => {
        const loadData = async (afterSuccess: (data: DownloadListData[]) => void) => {
            GET(getAPIUrl("query_all_downloads") + '?token=' + apiTokenContext, (data) => {
                data = data.map((item: any) => {
                    item.media.config = JSON.parse(item.media.config);
                    return item;
                })
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

    return (
        <div className='mx-auto max-w-8xl px-4 py-2 md:px-8 lg:px-8'>
            <DownloadListBody
                downloadTasks={downloads}
            ></DownloadListBody>
        </div>
    )
}