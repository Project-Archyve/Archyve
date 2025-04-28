"use client";

import { DataTable } from "@/components/global/DataTable";
import {
  Artefact,
  artefacts,
  ArtefactType,
  createArtefact,
} from "@/services/ArtefactService";
import { artefactColumns } from "@/components/artefacts/ArtefactTableColumns";
import { Button } from "@/components/ui/button";
import { IconFidgetSpinner, IconPlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/AuthProvider";

export function ArtefactMain() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<ArtefactType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const { projectId } = useParams();
  const user = useAuth();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setOpen(open);
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setType(null);
  };

  const handleCreateArtefact = async () => {
    if (!title || !author || !type || !user?.id || !projectId) {
      console.log("missing information")
      return;
    }

    try {
      setIsSubmitting(true);

      const artefactData: Artefact = {
        artefact_id: crypto.randomUUID(),
        project_id: projectId as string,
        title,
        author,
        content,
        type,
        created_at: new Date().toISOString(),
        created_by: user?.id,
      };

      await createArtefact(artefactData);

      console.log("Successfully created")

      resetForm();
      setOpen(false);
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4">
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button>
                <IconPlus />
                <span>Create New</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Artefact</DialogTitle>
                <DialogDescription>
                  Could this be the start of something cool? Maybe a Software
                  Design Document?
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-col flex-1">
                  <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <Select
                    value={type || ""}
                    onValueChange={(value) => setType(value as ArtefactType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Artefact Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        <SelectContent>
                          {Object.values(ArtefactType).map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div>
                    <Textarea
                      className="min-h-32"
                      placeholder="Once upon a time ..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateArtefact}
                    disabled={isSubmitting || !title || !author || !type}
                  >
                    {isSubmitting ? <IconFidgetSpinner className="mr-2 animate-spin" /> : null}
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <DataTable
            columns={artefactColumns}
            data={artefacts}
            searchParams="title"
            tableName="Artefacts"
          />
        </div>
      </div>
    </div>
  );
}
