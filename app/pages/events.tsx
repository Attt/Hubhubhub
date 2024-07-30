import { useContext, useEffect, useState } from 'react'
import { useToggleLoading } from '../reducers';
import { GET, getAPIUrl } from '../requests';
import { APITokenContext } from '../contexts';
import { EventsData } from '../interfaces';
import { EventsListBody } from '../components/media/events-list';

export default function Events() {
    const [events, setEvents] = useState([] as EventsData[]);
    const toggleLoading = useToggleLoading();
    const apiTokenContext = useContext(APITokenContext);
    useEffect(() => {
        getAPIUrl("get_events") && GET(getAPIUrl("get_events") + '?token=' + apiTokenContext, (data) => {
            if (data){
                const parsedData = data.map((d: any): EventsData[] => {
                    d.media_plan.config = JSON.parse(d.media_plan.config);
                    return d;
                })
                setEvents(parsedData);
            }
        }, (err) => {
        })
         
    },[])
  return (
    <div className="mt-6 py-2 flow-root">
      <EventsListBody
        events={events}
      ></EventsListBody>
    </div>
  )
}