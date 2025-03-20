"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAdmin } from "@/contexts/admin-context"
import { AdvancedDataTable } from "@/components/ui/advanced-data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Edit, Trash2, Download, Printer, Share2, RefreshCw, MoreHorizontal, Upload, Key } from "lucide-react"
import { ResponsiveButton } from "@/components/ui/responsive-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ValidatedInput } from "@/components/ui/validated-input"
import { buttonActions } from "@/lib/button-actions"

export default function UsersPage() {
  const { users, addUser, updateUser, deleteUser, filterUsers, addNotification } = useAdmin()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
    status: "Active",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
  })
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">("csv")
  const [importFile, setImportFile] = useState<File | null>(null)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await buttonActions.dashboard.refresh()
    setIsRefreshing(false)
  }

  const handleExport = async () => {
    await buttonActions.users.export(exportFormat)
  }

  const handlePrint = () => {
    window.print()
    addNotification("Printing user list...", "info")
  }

  const handleShare = async () => {
    await buttonActions.dashboard.export("pdf")
  }

  const handleDeleteSelected = async () => {
    await buttonActions.users.bulkDelete(
      selectedUsers.map((user) => user.id),
      selectedUsers.length,
    )
    setSelectedUsers([])
    setIsDeleteDialogOpen(false)
  }

  const validateForm = () => {
    let valid = true
    const errors = {
      name: "",
      email: "",
    }

    if (!formData.name || formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters"
      valid = false
    }

    if (!formData.email || !formData.email.includes("@")) {
      errors.email = "Please enter a valid email address"
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddUser = async () => {
    if (!validateForm()) return

    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    }

    const newUser = await buttonActions.users.add(userData)
    addUser(newUser)

    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditUser = async () => {
    if (!validateForm()) return

    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    }

    await buttonActions.users.update(currentUser.id, userData)
    updateUser(currentUser.id, userData)

    setIsEditDialogOpen(false)
    setCurrentUser(null)
    resetForm()
  }

  const handleImportUsers = async () => {
    if (!importFile) {
      addNotification("Please select a file to import", "error")
      return
    }

    const fileData = {
      name: importFile.name,
      size: importFile.size,
      type: importFile.type,
    }

    await buttonActions.users.import(fileData)
    setIsImportDialogOpen(false)
    setImportFile(null)
  }

  const handleResetPassword = async () => {
    if (!currentUser) return

    await buttonActions.users.resetPassword(currentUser.id, currentUser.email)
    setIsResetPasswordDialogOpen(false)
  }

  const openEditDialog = (user) => {
    setCurrentUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setIsEditDialogOpen(true)
  }

  const openResetPasswordDialog = (user) => {
    setCurrentUser(user)
    setIsResetPasswordDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "Student",
      status: "Active",
    })
    setFormErrors({
      name: "",
      email: "",
    })
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role")
        return (
          <Badge variant={role === "Administrator" ? "default" : role === "Teacher" ? "secondary" : "outline"}>
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status")
        return <Badge variant={status === "Active" ? "success" : "secondary"}>{status}</Badge>
      },
    },
    {
      accessorKey: "lastActive",
      header: "Last Active",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEditDialog(user)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openResetPasswordDialog(user)}>
                <Key className="mr-2 h-4 w-4" />
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  buttonActions.users.toggleStatus(user.id, user.name, user.status === "Active" ? "inactive" : "active")
                }
              >
                <Badge className="mr-2 h-2 w-2" />
                Toggle Status
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={async () => {
                  await buttonActions.users.delete(user.id, user.name)
                  deleteUser(user.id)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const UserForm = ({ isEdit = false }) => (
    <>
      <div className="grid gap-4 py-4">
        <ValidatedInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          error={formErrors.name}
          required
        />
        <ValidatedInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleFormChange}
          error={formErrors.email}
          required
        />
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
            <SelectTrigger id="role" className="col-span-3">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="Administrator">Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger id="status" className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => (isEdit ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false))}
        >
          Cancel
        </Button>
        <Button type="button" onClick={isEdit ? handleEditUser : handleAddUser}>
          {isEdit ? "Update User" : "Add User"}
        </Button>
      </DialogFooter>
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-gray-500">Manage all users in the system</p>
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

          <div className="relative group">
            <ResponsiveButton
              onClick={() => handleExport()}
              variant="outline"
              size="sm"
              icon={<Download className="h-4 w-4" />}
            >
              Export
            </ResponsiveButton>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block z-10">
              <div className="p-2">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => {
                    setExportFormat("pdf")
                    handleExport()
                  }}
                >
                  Export as PDF
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => {
                    setExportFormat("excel")
                    handleExport()
                  }}
                >
                  Export as Excel
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => {
                    setExportFormat("csv")
                    handleExport()
                  }}
                >
                  Export as CSV
                </button>
              </div>
            </div>
          </div>

          <ResponsiveButton onClick={handlePrint} variant="outline" size="sm" icon={<Printer className="h-4 w-4" />}>
            Print
          </ResponsiveButton>

          <ResponsiveButton onClick={handleShare} variant="outline" size="sm" icon={<Share2 className="h-4 w-4" />}>
            Share
          </ResponsiveButton>

          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <ResponsiveButton variant="outline" size="sm" icon={<Upload className="h-4 w-4" />}>
                Import
              </ResponsiveButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Users</DialogTitle>
                <DialogDescription>Upload a CSV file with user data to import.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="importFile">Select File</Label>
                <input
                  id="importFile"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleImportUsers} disabled={!importFile}>
                  Import Users
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Users List</CardTitle>
            <CardDescription>
              {selectedUsers.length > 0 ? `${selectedUsers.length} users selected` : `Total users: ${users.length}`}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.length > 0 && (
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <ResponsiveButton variant="destructive" size="sm" icon={<Trash2 className="h-4 w-4" />}>
                    Delete Selected
                  </ResponsiveButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      You are about to delete {selectedUsers.length} users. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteSelected}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <ResponsiveButton
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                  icon={<UserPlus className="h-4 w-4" />}
                >
                  Add New User
                </ResponsiveButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Fill in the details to add a new user to the system.</DialogDescription>
                </DialogHeader>
                <UserForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="administrators">Administrators</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <AdvancedDataTable
                columns={columns}
                data={users}
                searchColumn="name"
                searchPlaceholder="Search users..."
                selectable
                onSelectedRowsChange={setSelectedUsers}
              />
            </TabsContent>
            <TabsContent value="teachers">
              <AdvancedDataTable
                columns={columns}
                data={filterUsers("Teacher")}
                searchColumn="name"
                searchPlaceholder="Search teachers..."
                selectable
                onSelectedRowsChange={setSelectedUsers}
              />
            </TabsContent>
            <TabsContent value="administrators">
              <AdvancedDataTable
                columns={columns}
                data={filterUsers("Administrator")}
                searchColumn="name"
                searchPlaceholder="Search administrators..."
                selectable
                onSelectedRowsChange={setSelectedUsers}
              />
            </TabsContent>
            <TabsContent value="students">
              <AdvancedDataTable
                columns={columns}
                data={filterUsers("Student")}
                searchColumn="name"
                searchPlaceholder="Search students..."
                selectable
                onSelectedRowsChange={setSelectedUsers}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update the user details.</DialogDescription>
          </DialogHeader>
          <UserForm isEdit />
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Are you sure you want to reset the password for {currentUser?.name}?</DialogDescription>
          </DialogHeader>
          <p className="py-4">
            A password reset link will be sent to {currentUser?.email}. The user will need to create a new password.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword}>Send Reset Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

