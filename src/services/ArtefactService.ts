import { createClient } from "@/lib/supabase/client";

export enum ArtefactType {
  TEXT = "Text",
  CODE_SNIPPET = "Code Snippet",
  FILE = "File",
};

export type Artefact = {
  artefact_id: string;
  project_id: string;
  title: string;
  author: string;
  content: string | null;
  type: ArtefactType;
  created_at: string;
  created_by: string;
};

const supabase = await createClient();

export async function createArtefact(artefact: Artefact): Promise<void> {
  const { data, error } = await supabase
    .from("artefact")
    .insert({ ...artefact })
    .select();

    if (error) {
      throw new Error(
        `An error has occurred when creating an Artefact: ${error.message}`
      );
    }
    
    if (!data || data.length === 0) {
      throw new Error("Not enough data supplied to complete POST.");
    }
};

export const artefacts: Artefact[] = [
  {
    artefact_id: "1ba8789d-7b60-45aa-9884-dd63753ff3b0",
    project_id: "f23aa68e-9a8b-46c2-b7ce-607142186d67",
    title: "Kanoodle",
    author: "Steven Jones",
    content:
      "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra",
    type: ArtefactType.CODE_SNIPPET,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "988616c6-d35d-4994-b3f1-e4c2aba5aba1",
    project_id: "86c0ff36-b37c-4fdc-8fe6-0eaa586ca66d",
    title: "Pixonyx",
    author: "John Smith",
    content:
      "vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at",
    type: ArtefactType.TEXT,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "ce6663aa-92f8-4764-a5fe-5c9dc29f859a",
    project_id: "27c3532c-bce0-4d5a-ac68-6f9865757d5b",
    title: "Zooveo",
    author: "John Smith",
    content:
      "sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus",
    type: ArtefactType.TEXT,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "a0d9bdec-e60f-4af1-becd-230d6f64e2ce",
    project_id: "ad8d9069-f022-45d8-a137-28b4bcf93069",
    title: "Jazzy",
    author: "Sharon Smith",
    content:
      "quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac",
    type: ArtefactType.FILE,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "15266423-0f3c-4e54-ac03-ec6f2e4f69e1",
    project_id: "5b06d7fb-fd45-4ae1-8513-e995a15c021d",
    title: "Leexo",
    author: "John Smith",
    content:
      "lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam",
    type: ArtefactType.FILE,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "3c57b367-438e-4b21-9f57-517f0e20a842",
    project_id: "dfd914ac-63a0-4593-99ef-092d93e1ab52",
    title: "Pixoboo",
    author: "James Wreckworth",
    content:
      "quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus",
    type: ArtefactType.FILE,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "49213165-fa68-4f02-b617-9a4a789b8b6b",
    project_id: "da7b8fbc-dc9e-45d6-b109-69ff659c4d7a",
    title: "Babblestorm",
    author: "Harold Gunderson",
    content:
      "justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non",
    type: ArtefactType.CODE_SNIPPET,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "a96418d0-0ad9-45f7-b49b-b19bb1d753b8",
    project_id: "addcb2df-4bdb-4c02-a701-b8bdda96ac66",
    title: "Voomm",
    author: "John Smith",
    content:
      "luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
    type: ArtefactType.TEXT,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "92fd78eb-3c6d-49c2-a631-89b56df5e665",
    project_id: "0ef8e4c0-dac0-4805-9448-087740976af1",
    title: "Geba",
    author: "Violet Arthur",
    content:
      "pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien",
    type: ArtefactType.FILE,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "1c9cba55-5732-432d-85dd-08e51817c97a",
    project_id: "dd9590f8-583e-45ea-b5ab-8e7e3f941664",
    title: "Cogibox",
    author: "John Smith",
    content:
      "nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer",
    type: ArtefactType.FILE,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
  {
    artefact_id: "1c9cba55-5732-411d-85dd-08e51817c97a",
    project_id: "dd9590f8-583e-45ea-b5ab-8e7e3f941664",
    title: "Gogglebox",
    author: "Violet Smith",
    content:
      "nibh in hac habitasse platadssadasdasdadea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer",
    type: ArtefactType.CODE_SNIPPET,
    created_at: "10:44pm",
    created_by: "a51ea1c0-6886-4bfb-b8ad-119284fd4c94",
  },
];
