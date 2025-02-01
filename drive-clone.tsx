"use client"

import React, { useState } from "react"
import { type FileItem, mockFiles } from "./mockData"
import { Folder, File, Image, Video, Music, Upload, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"

const FileIcon: React.FC<{ type: FileItem["type"] }> = ({ type }) => {
  switch (type) {
    case "folder":
      return <Folder className="w-5 h-5 text-yellow-500" />
    case "document":
      return <File className="w-5 h-5 text-blue-500" />
    case "image":
      return <Image className="w-5 h-5 text-green-500" />
    case "video":
      return <Video className="w-5 h-5 text-red-500" />
    case "audio":
      return <Music className="w-5 h-5 text-purple-500" />
    default:
      return <File className="w-5 h-5" />
  }
}

const DriveClone: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<FileItem[]>([])
  const [files, setFiles] = useState<FileItem[]>(mockFiles)

  const handleUpload = () => {
    const newFile: FileItem = {
      id: `${Date.now()}`,
      name: `New File ${files.length + 1}.txt`,
      type: "document",
    }
    setFiles([...files, newFile])
  }

  const navigateToFolder = (folder: FileItem) => {
    setCurrentFolder([...currentFolder, folder])
  }

  const navigateToBreadcrumb = (index: number) => {
    setCurrentFolder(currentFolder.slice(0, index + 1))
  }

  const getCurrentFiles = () => {
    let currentFiles = files
    for (const folder of currentFolder) {
      currentFiles = folder.children || []
    }
    return currentFiles
  }

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Google Drive Clone</h1>
        <Button onClick={handleUpload} variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
      <div className="mb-4 flex items-center">
        <Button variant="ghost" onClick={() => setCurrentFolder([])} className="mr-2">
          My Drive
        </Button>
        {currentFolder.map((folder, index) => (
          <React.Fragment key={folder.id}>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Button variant="ghost" onClick={() => navigateToBreadcrumb(index)}>
              {folder.name}
            </Button>
          </React.Fragment>
        ))}
      </div>
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        {getCurrentFiles().map((file) => (
          <div
            key={file.id}
            className="flex items-center p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
            onClick={() => file.type === "folder" && navigateToFolder(file)}
          >
            <FileIcon type={file.type} />
            <span className="ml-3">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DriveClone

