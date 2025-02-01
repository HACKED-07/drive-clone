export type FileType = "folder" | "document" | "image" | "video" | "audio"

export interface FileItem {
  id: string
  name: string
  type: FileType
  children?: FileItem[]
}

export const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      { id: "2", name: "Report.docx", type: "document" },
      { id: "3", name: "Presentation.pptx", type: "document" },
    ],
  },
  {
    id: "4",
    name: "Images",
    type: "folder",
    children: [
      { id: "5", name: "Vacation.jpg", type: "image" },
      { id: "6", name: "Family.png", type: "image" },
    ],
  },
  { id: "7", name: "Music.mp3", type: "audio" },
  { id: "8", name: "Video.mp4", type: "video" },
]

