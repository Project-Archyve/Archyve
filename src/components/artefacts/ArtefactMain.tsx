import { DataTable } from "@/components/global/DataTable";
import { artefacts } from "@/services/ArtefactService";
import { artefactColumns } from "@/components/artefacts/ArtefactTableColumns";

export function ArtefactMain() {
  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4">
          <DataTable 
            columns={artefactColumns} 
            data={artefacts}
            searchParams="title"
            tableName="Artefacts"
          />
        </div>
      </div>
    </div>
  )
}