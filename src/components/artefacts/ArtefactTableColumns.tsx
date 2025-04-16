import { Button } from "@/components/ui/button";
import { Artefact } from "@/services/ArtefactService";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { IconArchive, IconCopy, IconDownload, IconScript } from "@tabler/icons-react";
import { TableCellViewer } from "@/components/global/DataTable";

export const artefactColumns: ColumnDef<Artefact>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "created_by",
    header: "Author",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const artefact = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                console.log("Clicked open")
              }
            >
              <IconScript />
              Open
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconDownload />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(artefact.artefact_id)
              }
            >
              <IconCopy />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconArchive />
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
