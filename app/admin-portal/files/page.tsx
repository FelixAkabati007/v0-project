"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveButton } from "@/components/ui/responsive-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAdmin } from "@/contexts/admin-context"
import { buttonActions } from "@/lib/button-actions"
import {
  FolderPlus,
  FilePlus,
  Folder,
  File,
  ImageIcon,
  FileText,
  FileSpreadsheet,
  FileCode,
  Download,
  Trash2,
  Share2,
  Search,
  MoreHorizontal,
  RefreshCw,
  Upload,
  Grid,
  List,
  HardDrive,
  Move,
  Star,
  Info,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock file data
const mockFiles = [
  { id: 1, name: "School Logo.png", type: "image", size: "256 KB", modified: "2023-12-01", folder: "Images" },
  {
    id: 2,
    name: "Student Records.xlsx",
    type: "spreadsheet",
    size: "1.2 MB",
    modified: "2023-12-05",
    folder: "Documents",
  },
  { id: 3, name: "Curriculum.pdf", type: "pdf", size: "3.5 MB", modified: "2023-11-20", folder: "Documents" },
  {
    id: 4,
    name: "School Calendar.docx",
    type: "document",
    size: "450 KB",
    modified: "2023-12-10",
    folder: "Documents",
  },
  { id: 5, name: "Campus Map.jpg", type: "image", size: "1.8 MB", modified: "2023-10-15", folder: "Images" },
  { id: 6, name: "Budget Report.xlsx", type: "spreadsheet", size: "890 KB", modified: "2023-12-12", folder: "Finance" },
  { id: 7, name: "Staff Directory.pdf", type: "pdf", size: "2.1 MB", modified: "2023-11-05", folder: "HR" },
  { id: 8, name: "Website Code.zip", type: "archive", size: "5.6 MB", modified: "2023-09-30", folder: "IT" },
]

// Mock folders
const mockFolders = [
  { id: 1, name: "Documents", files: 3 },
  { id: 2, name: "Images", files: 2 },
  { id: 3, name: "Finance", files: 1 },
  { id: 4, name: "HR", files: 1 },
  { id: 5, name: "IT", files: 1 },
]

export default function FilesPage() {
  const { addNotification } = useAdmin()
  const [files, setFiles] = useState(mockFiles)
  const [folders, setFolders] = useState(mockFolders)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [newFolderName, setNewFolderName] = useState("")
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isFileInfoDialogOpen, setIsFileInfoDialogOpen] = useState(false)
  const [selectedFileForAction, setSelectedFileForAction] = useState<any>(null)
  const [destinationFolder, setDestinationFolder] = useState<string>("")
  const [shareRecipients, setShareRecipients] = useState<string>("")
  const [isStarred, setIsStarred] = useState<{ [key: number]: boolean }>({})

  const filteredFiles = files.filter(
    (file) =>
      (currentFolder ? file.folder === currentFolder : true) &&
      (file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.type.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await buttonActions.dashboard.refresh()
    setIsRefreshing(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)

      // Process each file
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]
        const fileSize = file.size

        // Simulate upload progress
        let progress = 0
        const interval = setInterval(() => {
          progress += 5
          setUploadProgress(progress)

          if (progress >= 100) {
            clearInterval(interval)

            // When upload completes
            if (i === e.target.files!.length - 1) {
              setTimeout(() => {
                setIsUploading(false)
                setUploadProgress(0)

                // Add the files to our state
                const newFiles = Array.from(e.target.files!).map((file, index) => ({
                  id: files.length + index + 1,
                  name: file.name,
                  type: file.type.split("/")[0] || "document",
                  size: `${(file.size / 1024).toFixed(1)} KB`,
                  modified: new Date().toISOString().split("T")[0],
                  folder: currentFolder || "Documents",
                }))

                setFiles([...files, ...newFiles])

                // Use our button action
                buttonActions.files.upload({
                  name: e.target.files!.length > 1 ? `${e.target.files!.length} files` : e.target.files![0].name,
                  size: Array.from(e.target.files!).reduce((acc, file) => acc + file.size, 0),
                })
              }, 500)
            }
          }
        }, 100)
      }
    }
  }

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      const result = await buttonActions.files.createFolder(newFolderName)

      const newFolder = {
        id: folders.length + 1,
        name: newFolderName,
        files: 0,
      }
      setFolders([...folders, newFolder])
      setNewFolderName("")
    }
  }

  const handleDeleteFiles = async () => {
    for (const fileId of selectedFiles) {
      const file = files.find((f) => f.id === fileId)
      if (file) {
        await buttonActions.files.delete(fileId.toString(), file.name)
      }
    }

    setFiles(files.filter((file) => !selectedFiles.includes(file.id)))
    setSelectedFiles([])
  }

  const handleMoveFile = async () => {
    if (!selectedFileForAction || !destinationFolder) return

    await buttonActions.files.moveFile(
      selectedFileForAction.id.toString(),
      selectedFileForAction.name,
      destinationFolder,
    )

    // Update the file in our state
    setFiles(
      files.map((file) => (file.id === selectedFileForAction.id ? { ...file, folder: destinationFolder } : file)),
    )

    setIsMoveDialogOpen(false)
    setSelectedFileForAction(null)
    setDestinationFolder("")
  }

  const handleShareFile = async () => {
    if (!selectedFileForAction || !shareRecipients.trim()) return

    const recipients = shareRecipients.split(",").map((r) => r.trim())

    await buttonActions.files.share(selectedFileForAction.id.toString(), selectedFileForAction.name, recipients)

    setIsShareDialogOpen(false)
    setSelectedFileForAction(null)
    setShareRecipients("")
  }

  const handleDownloadFile = async (file) => {
    await buttonActions.files.download(file.id.toString(), file.name)
  }

  const handleToggleStar = (fileId: number) => {
    setIsStarred((prev) => ({
      ...prev,
      [fileId]: !prev[fileId],
    }))

    addNotification(isStarred[fileId] ? "Removed from favorites" : "Added to favorites", "success")
  }

  const handleSelectFile = (id: number) => {
    setSelectedFiles((prev) => (prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]))
  }

  const handleSelectAllFiles = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map((file) => file.id))
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-10 w-10 text-blue-500" />
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-10 w-10 text-green-500" />
      case "document":
        return <FileText className="h-10 w-10 text-blue-400" />
      case "archive":
        return <FileCode className="h-10 w-10 text-purple-500" />
      default:
        return <File className="h-10 w-10 text-gray-500" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">File Manager</h1>
          <p className="text-gray-500">Manage all your files and documents</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ResponsiveButton
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />}
            disabled={isRefreshing}
          >
            Refresh
          </ResponsiveButton>
          <label>
            <input type="file" multiple className="hidden" onChange={handleFileUpload} disabled={isUploading} />
            <ResponsiveButton
              variant="outline"
              size="sm"
              icon={<Upload className="h-4 w-4" />}
              disabled={isUploading}
              className="cursor-pointer"
              asChild
            >
              <span>Upload</span>
            </ResponsiveButton>
          </label>
        </div>
      </div>

      {isUploading && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Uploading files...</p>
              <p className="text-sm font-medium">{uploadProgress}%</p>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">{currentFolder ? currentFolder : "All Files"}</CardTitle>
            <CardDescription>
              {selectedFiles.length > 0
                ? `${selectedFiles.length} files selected`
                : `Total files: ${filteredFiles.length}`}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFiles.length > 0 ? (
              <>
                <ResponsiveButton
                  variant="outline"
                  size="sm"
                  icon={<Download className="h-4 w-4" />}
                  onClick={() => {
                    const selectedFileObjects = files.filter((file) => selectedFiles.includes(file.id))
                    selectedFileObjects.forEach((file) => handleDownloadFile(file))
                  }}
                >
                  Download
                </ResponsiveButton>
                <ResponsiveButton
                  variant="outline"
                  size="sm"
                  icon={<Move className="h-4 w-4" />}
                  onClick={() => {
                    if (selectedFiles.length === 1) {
                      const file = files.find((f) => f.id === selectedFiles[0])
                      if (file) {
                        setSelectedFileForAction(file)
                        setIsMoveDialogOpen(true)
                      }
                    } else {
                      addNotification("Please select only one file to move", "warning")
                    }
                  }}
                >
                  Move
                </ResponsiveButton>
                <ResponsiveButton
                  variant="outline"
                  size="sm"
                  icon={<Share2 className="h-4 w-4" />}
                  onClick={() => {
                    if (selectedFiles.length === 1) {
                      const file = files.find((f) => f.id === selectedFiles[0])
                      if (file) {
                        setSelectedFileForAction(file)
                        setIsShareDialogOpen(true)
                      }
                    } else {
                      addNotification("Please select only one file to share", "warning")
                    }
                  }}
                >
                  Share
                </ResponsiveButton>
                <ResponsiveButton
                  variant="destructive"
                  size="sm"
                  icon={<Trash2 className="h-4 w-4" />}
                  onClick={handleDeleteFiles}
                >
                  Delete
                </ResponsiveButton>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <ResponsiveButton variant="outline" size="sm" icon={<FolderPlus className="h-4 w-4" />}>
                      New Folder
                    </ResponsiveButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Folder</DialogTitle>
                      <DialogDescription>Enter a name for your new folder.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="folderName" className="text-right">
                          Folder Name
                        </Label>
                        <Input
                          id="folderName"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" onClick={handleCreateFolder}>
                        Create Folder
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex items-center space-x-2 w-full md:w-1/2">
              <Search className="text-gray-400" />
              <Input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setCurrentFolder(null)} disabled={!currentFolder}>
                All Files
              </Button>
              {currentFolder && (
                <Badge variant="outline" className="text-sm">
                  {currentFolder}
                </Badge>
              )}
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {filteredFiles.length === 0 ? (
                <div className="text-center py-12">
                  <FilePlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No files found</h3>
                  <p className="text-gray-500">Upload files or create a new folder to get started.</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        selectedFiles.includes(file.id) ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start">
                        <Checkbox
                          checked={selectedFiles.includes(file.id)}
                          onCheckedChange={() => handleSelectFile(file.id)}
                          className="mr-2"
                        />
                        <div className="flex-1">
                          <div className="flex justify-center mb-2 relative">
                            {getFileIcon(file.type)}
                            <button
                              className="absolute top-0 right-0 text-gray-400 hover:text-yellow-500"
                              onClick={() => handleToggleStar(file.id)}
                            >
                              <Star
                                className={`h-4 w-4 ${isStarred[file.id] ? "text-yellow-500 fill-yellow-500" : ""}`}
                              />
                            </button>
                          </div>
                          <h3 className="font-medium text-sm truncate" title={file.name}>
                            {file.name}
                          </h3>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{file.size}</span>
                            <span>{file.modified}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <button
                              className="text-blue-500 hover:text-blue-700 text-xs"
                              onClick={() => handleDownloadFile(file)}
                            >
                              Download
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700 text-xs"
                              onClick={() => {
                                setSelectedFileForAction(file)
                                setIsFileInfoDialogOpen(true)
                              }}
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Checkbox
                              checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                              onCheckedChange={handleSelectAllFiles}
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Size
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Modified
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFiles.map((file) => (
                          <tr
                            key={file.id}
                            className={selectedFiles.includes(file.id) ? "bg-blue-50" : "hover:bg-gray-50"}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Checkbox
                                checked={selectedFiles.includes(file.id)}
                                onCheckedChange={() => handleSelectFile(file.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 mr-2">{getFileIcon(file.type)}</div>
                                <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">{file.type}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.modified}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleDownloadFile(file)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedFileForAction(file)
                                      setIsShareDialogOpen(true)
                                    }}
                                  >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedFileForAction(file)
                                      setIsMoveDialogOpen(true)
                                    }}
                                  >
                                    <Move className="mr-2 h-4 w-4" />
                                    Move
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleStar(file.id)}>
                                    <Star
                                      className={`mr-2 h-4 w-4 ${isStarred[file.id] ? "text-yellow-500 fill-yellow-500" : ""}`}
                                    />
                                    {isStarred[file.id] ? "Remove Star" : "Star"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedFileForAction(file)
                                      setIsFileInfoDialogOpen(true)
                                    }}
                                  >
                                    <Info className="mr-2 h-4 w-4" />
                                    Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={async () => {
                                      await buttonActions.files.delete(file.id.toString(), file.name)
                                      setFiles(files.filter((f) => f.id !== file.id))
                                    }}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="folders">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setCurrentFolder(folder.name)}
                  >
                    <div className="flex justify-center mb-2">
                      <Folder className="h-12 w-12 text-yellow-500" />
                    </div>
                    <h3 className="font-medium text-center truncate" title={folder.name}>
                      {folder.name}
                    </h3>
                    <p className="text-xs text-center text-gray-500 mt-1">{folder.files} files</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <HardDrive className="h-5 w-5 mr-2 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">School Drive</span>
                <span className="text-sm font-medium">15.2 GB / 50 GB</span>
              </div>
              <Progress value={30.4} className="h-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <div>
                <p className="text-sm font-medium">Documents</p>
                <p className="text-xs text-gray-500">7.2 GB</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p className="text-sm font-medium">Images</p>
                <p className="text-xs text-gray-500">4.5 GB</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div>
                <p className="text-sm font-medium">Videos</p>
                <p className="text-xs text-gray-500">2.8 GB</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <div>
                <p className="text-sm font-medium">Other</p>
                <p className="text-xs text-gray-500">0.7 GB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Move File Dialog */}
      <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move File</DialogTitle>
            <DialogDescription>Select a destination folder for "{selectedFileForAction?.name}"</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="destinationFolder">Destination Folder</Label>
            <Select value={destinationFolder} onValueChange={setDestinationFolder}>
              <SelectTrigger id="destinationFolder" className="mt-2">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.name}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMoveFile} disabled={!destinationFolder}>
              Move File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share File Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>Share "{selectedFileForAction?.name}" with others</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="shareRecipients">Recipients (comma separated)</Label>
            <Input
              id="shareRecipients"
              placeholder="email1@example.com, email2@example.com"
              value={shareRecipients}
              onChange={(e) => setShareRecipients(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleShareFile} disabled={!shareRecipients.trim()}>
              Share File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File Info Dialog */}
      <Dialog open={isFileInfoDialogOpen} onOpenChange={setIsFileInfoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          {selectedFileForAction && (
            <div className="py-4 space-y-4">
              <div className="flex justify-center mb-4">{getFileIcon(selectedFileForAction.type)}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Name:</div>
                <div className="text-sm">{selectedFileForAction.name}</div>

                <div className="text-sm font-medium">Type:</div>
                <div className="text-sm">{selectedFileForAction.type}</div>

                <div className="text-sm font-medium">Size:</div>
                <div className="text-sm">{selectedFileForAction.size}</div>

                <div className="text-sm font-medium">Modified:</div>
                <div className="text-sm">{selectedFileForAction.modified}</div>

                <div className="text-sm font-medium">Location:</div>
                <div className="text-sm">{selectedFileForAction.folder}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsFileInfoDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

