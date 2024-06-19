import List from "./list";

export default function ListWrapper({ folder_id, path }: { folder_id: string, path: string }) {
    return (
        <List folder_id={folder_id} path={path}></List>
    );
}