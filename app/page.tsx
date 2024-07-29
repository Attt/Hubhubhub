'use client';
import { useContext } from "react";
import { CurrNavItemContext } from "@/app/contexts";
import { RefreshProvider } from "@/app/reducers";
import MediaPlans from "@/app/pages/media/media-plans";
import Test from "@/app/test/page";
import Drive115Configs from "@/app/pages/115/configs";
import ApiConfigs from "@/app/pages/configuration/api-configs";
import Configs from "@/app/pages/configuration/configs";
import MountedFiles from "@/app/pages/storage/mounted-files";
import Downloads from "@/app/pages/media/downloads";
import Drive115Tasks from "@/app/pages/115/tasks";
import Stats from "@/app/pages/stats";
import Events from "@/app/pages/events";


export default function Home() {
  const currentNavItem = useContext(CurrNavItemContext);

  let child = <div className="mx-auto max-w-8xl px-4 py-2 md:px-8 lg:px-8 overflow-y-auto"><Stats></Stats><Events></Events></div>;
  switch (currentNavItem.key) {
    case 'configuration/api-configs':
      child = <ApiConfigs></ApiConfigs>
      break;
    case 'configuration/configs':
      child = <Configs></Configs>
      break;
    case 'media/downloads':
      child = 
      <RefreshProvider>
        <Downloads></Downloads>
      </RefreshProvider>
      break;
    case 'media/media-plans':
      child =
        <RefreshProvider>
          <MediaPlans></MediaPlans>
        </RefreshProvider>
      break;
    case '115/configs':
      child = <Drive115Configs></Drive115Configs>
      break;
    case '115/tasks':
      child = <Drive115Tasks></Drive115Tasks>
      break;
    case 'storage/mounted-files':
      child = <MountedFiles></MountedFiles>
      break;
    case 'test':
      child = <Test></Test>
      break;
    default:
      break;
  }

  return (
    <main className="overflow-y-auto">
      {child}
    </main>
  );
}
