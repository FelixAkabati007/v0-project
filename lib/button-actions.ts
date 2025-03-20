import { toast } from "@/components/ui/use-toast"

// Simulate API calls with a delay
const simulateApiCall = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9)

// Format date to locale string
const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

export const buttonActions = {
  // Dashboard actions
  dashboard: {
    refresh: async () => {
      await simulateApiCall(1500)
      toast({
        title: "Dashboard Refreshed",
        description: `Data updated as of ${new Date().toLocaleTimeString()}`,
      })
      return true
    },
    export: async (format: "pdf" | "excel" | "csv" = "pdf") => {
      await simulateApiCall(2000)
      toast({
        title: "Export Complete",
        description: `Dashboard data exported as ${format.toUpperCase()}`,
      })
      return { success: true, fileUrl: `/exports/dashboard-${Date.now()}.${format}` }
    },
    toggleRealTime: (enabled: boolean) => {
      toast({
        title: enabled ? "Real-time Updates Enabled" : "Real-time Updates Disabled",
        description: enabled
          ? "You will now receive live data updates"
          : "Live updates paused. Data will refresh on demand",
      })
      return enabled
    },
  },

  // Users actions
  users: {
    add: async (userData: any) => {
      await simulateApiCall(1200)
      const newUser = {
        id: generateId(),
        ...userData,
        createdAt: new Date().toISOString(),
      }
      toast({
        title: "User Added",
        description: `${userData.name} has been added successfully`,
      })
      return newUser
    },
    update: async (id: string, userData: any) => {
      await simulateApiCall(1000)
      toast({
        title: "User Updated",
        description: `${userData.name}'s information has been updated`,
      })
      return { id, ...userData, updatedAt: new Date().toISOString() }
    },
    delete: async (id: string, name: string) => {
      await simulateApiCall(800)
      toast({
        title: "User Deleted",
        description: `${name} has been removed from the system`,
        variant: "destructive",
      })
      return { success: true, id }
    },
    bulkDelete: async (ids: string[], count: number) => {
      await simulateApiCall(ids.length * 200)
      toast({
        title: "Bulk Delete Complete",
        description: `${count} users have been removed from the system`,
        variant: "destructive",
      })
      return { success: true, ids }
    },
    export: async (format: "pdf" | "excel" | "csv" = "csv") => {
      await simulateApiCall(1500)
      toast({
        title: "Export Complete",
        description: `User data exported as ${format.toUpperCase()}`,
      })
      return { success: true, fileUrl: `/exports/users-${Date.now()}.${format}` }
    },
    import: async (fileData: any) => {
      await simulateApiCall(2500)
      const count = Math.floor(Math.random() * 50) + 5
      toast({
        title: "Import Complete",
        description: `${count} users imported successfully`,
      })
      return { success: true, count, errors: [] }
    },
    resetPassword: async (id: string, email: string) => {
      await simulateApiCall(1000)
      toast({
        title: "Password Reset Link Sent",
        description: `A reset link has been sent to ${email}`,
      })
      return { success: true }
    },
    toggleStatus: async (id: string, name: string, newStatus: "active" | "inactive") => {
      await simulateApiCall(500)
      toast({
        title: "Status Updated",
        description: `${name} is now ${newStatus}`,
      })
      return { id, status: newStatus }
    },
  },

  // Courses actions
  courses: {
    add: async (courseData: any) => {
      await simulateApiCall(1200)
      const newCourse = {
        id: generateId(),
        ...courseData,
        createdAt: new Date().toISOString(),
      }
      toast({
        title: "Course Added",
        description: `${courseData.name} has been added successfully`,
      })
      return newCourse
    },
    update: async (id: string, courseData: any) => {
      await simulateApiCall(1000)
      toast({
        title: "Course Updated",
        description: `${courseData.name} has been updated`,
      })
      return { id, ...courseData, updatedAt: new Date().toISOString() }
    },
    delete: async (id: string, name: string) => {
      await simulateApiCall(800)
      toast({
        title: "Course Deleted",
        description: `${name} has been removed from the system`,
        variant: "destructive",
      })
      return { success: true, id }
    },
    bulkDelete: async (ids: string[], count: number) => {
      await simulateApiCall(ids.length * 200)
      toast({
        title: "Bulk Delete Complete",
        description: `${count} courses have been removed`,
        variant: "destructive",
      })
      return { success: true, ids }
    },
    export: async (format: "pdf" | "excel" | "csv" = "csv") => {
      await simulateApiCall(1500)
      toast({
        title: "Export Complete",
        description: `Course data exported as ${format.toUpperCase()}`,
      })
      return { success: true, fileUrl: `/exports/courses-${Date.now()}.${format}` }
    },
    assignInstructor: async (courseId: string, courseName: string, instructorId: string, instructorName: string) => {
      await simulateApiCall(1000)
      toast({
        title: "Instructor Assigned",
        description: `${instructorName} has been assigned to ${courseName}`,
      })
      return { success: true }
    },
    scheduleClass: async (courseId: string, courseName: string, schedule: any) => {
      await simulateApiCall(1200)
      toast({
        title: "Class Scheduled",
        description: `${courseName} scheduled for ${schedule.day} at ${schedule.time}`,
      })
      return { success: true, schedule }
    },
  },

  // Reports actions
  reports: {
    generate: async (reportType: string, parameters: any) => {
      await simulateApiCall(3000)
      toast({
        title: "Report Generated",
        description: `${reportType} report is ready to view`,
      })
      return {
        id: generateId(),
        type: reportType,
        createdAt: new Date().toISOString(),
        url: `/reports/${reportType.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.pdf`,
      }
    },
    download: async (reportId: string, reportName: string) => {
      await simulateApiCall(1500)
      toast({
        title: "Download Started",
        description: `${reportName} is being downloaded`,
      })
      return { success: true }
    },
    schedule: async (reportType: string, frequency: "daily" | "weekly" | "monthly", recipients: string[]) => {
      await simulateApiCall(1000)
      toast({
        title: "Report Scheduled",
        description: `${reportType} will be sent ${frequency} to ${recipients.length} recipients`,
      })
      return {
        id: generateId(),
        type: reportType,
        frequency,
        recipients,
        nextRun: new Date(Date.now() + 86400000).toISOString(), // tomorrow
      }
    },
    share: async (reportId: string, reportName: string, recipients: string[]) => {
      await simulateApiCall(1000)
      toast({
        title: "Report Shared",
        description: `${reportName} shared with ${recipients.length} recipients`,
      })
      return { success: true }
    },
  },

  // Analytics actions
  analytics: {
    refresh: async () => {
      await simulateApiCall(2000)
      toast({
        title: "Analytics Refreshed",
        description: `Data updated as of ${new Date().toLocaleTimeString()}`,
      })
      return true
    },
    export: async (format: "pdf" | "excel" | "csv" = "pdf") => {
      await simulateApiCall(2000)
      toast({
        title: "Export Complete",
        description: `Analytics data exported as ${format.toUpperCase()}`,
      })
      return { success: true, fileUrl: `/exports/analytics-${Date.now()}.${format}` }
    },
    changeTimeframe: (timeframe: "day" | "week" | "month" | "quarter" | "year") => {
      toast({
        title: "Timeframe Changed",
        description: `Showing data for the last ${timeframe}`,
      })
      return timeframe
    },
    generateInsight: async (dataType: string) => {
      await simulateApiCall(3000)
      toast({
        title: "AI Insight Generated",
        description: `New insights for ${dataType} are available`,
      })
      return {
        id: generateId(),
        type: dataType,
        title: `${dataType} Trend Analysis`,
        description: `AI-generated insights about ${dataType.toLowerCase()} trends and patterns.`,
        createdAt: new Date().toISOString(),
      }
    },
  },

  // Calendar actions
  calendar: {
    addEvent: async (eventData: any) => {
      await simulateApiCall(800)
      const newEvent = {
        id: generateId(),
        ...eventData,
        createdAt: new Date().toISOString(),
      }
      toast({
        title: "Event Added",
        description: `${eventData.title} scheduled for ${formatDate(new Date(eventData.date))}`,
      })
      return newEvent
    },
    updateEvent: async (id: string, eventData: any) => {
      await simulateApiCall(800)
      toast({
        title: "Event Updated",
        description: `${eventData.title} has been updated`,
      })
      return { id, ...eventData, updatedAt: new Date().toISOString() }
    },
    deleteEvent: async (id: string, title: string) => {
      await simulateApiCall(500)
      toast({
        title: "Event Deleted",
        description: `${title} has been removed from the calendar`,
        variant: "destructive",
      })
      return { success: true, id }
    },
    exportCalendar: async (format: "ics" | "pdf" | "csv" = "ics") => {
      await simulateApiCall(1500)
      toast({
        title: "Calendar Exported",
        description: `Calendar exported as ${format.toUpperCase()}`,
      })
      return { success: true, fileUrl: `/exports/calendar-${Date.now()}.${format}` }
    },
    importCalendar: async (fileData: any) => {
      await simulateApiCall(2000)
      const count = Math.floor(Math.random() * 20) + 5
      toast({
        title: "Calendar Import Complete",
        description: `${count} events imported successfully`,
      })
      return { success: true, count, errors: [] }
    },
    sendReminders: async (eventId: string, eventTitle: string, attendees: string[]) => {
      await simulateApiCall(1000)
      toast({
        title: "Reminders Sent",
        description: `Reminders for "${eventTitle}" sent to ${attendees.length} attendees`,
      })
      return { success: true }
    },
  },

  // Messages actions
  messages: {
    send: async (messageData: any) => {
      await simulateApiCall(800)
      toast({
        title: "Message Sent",
        description: `Message sent to ${messageData.recipients.length} recipients`,
      })
      return {
        id: generateId(),
        ...messageData,
        sentAt: new Date().toISOString(),
        status: "sent",
      }
    },
    delete: async (id: string) => {
      await simulateApiCall(500)
      toast({
        title: "Message Deleted",
        description: "Message has been removed",
        variant: "destructive",
      })
      return { success: true, id }
    },
    markAsRead: async (id: string) => {
      await simulateApiCall(300)
      toast({
        title: "Message Marked as Read",
        description: "Message status updated",
      })
      return { id, status: "read" }
    },
    archive: async (id: string) => {
      await simulateApiCall(500)
      toast({
        title: "Message Archived",
        description: "Message moved to archive",
      })
      return { id, status: "archived" }
    },
    sendBulk: async (messageData: any, recipientCount: number) => {
      await simulateApiCall(1500)
      toast({
        title: "Bulk Message Sent",
        description: `Message sent to ${recipientCount} recipients`,
      })
      return {
        id: generateId(),
        ...messageData,
        sentAt: new Date().toISOString(),
        status: "sent",
        recipientCount,
      }
    },
  },

  // Finance actions
  finance: {
    recordPayment: async (paymentData: any) => {
      await simulateApiCall(1000)
      toast({
        title: "Payment Recorded",
        description: `$${paymentData.amount} payment recorded successfully`,
      })
      return {
        id: generateId(),
        ...paymentData,
        recordedAt: new Date().toISOString(),
        status: "completed",
      }
    },
    generateInvoice: async (invoiceData: any) => {
      await simulateApiCall(1500)
      const invoiceNumber = `INV-${Date.now().toString().substring(7)}`
      toast({
        title: "Invoice Generated",
        description: `Invoice #${invoiceNumber} created successfully`,
      })
      return {
        id: generateId(),
        invoiceNumber,
        ...invoiceData,
        createdAt: new Date().toISOString(),
        status: "pending",
      }
    },
    exportFinancialReport: async (reportType: string, period: string, format: "pdf" | "excel" | "csv" = "pdf") => {
      await simulateApiCall(2000)
      toast({
        title: "Financial Report Exported",
        description: `${reportType} for ${period} exported as ${format.toUpperCase()}`,
      })
      return {
        success: true,
        fileUrl: `/exports/finance-${reportType.toLowerCase().replace(/\s+/g, "-")}-${period}-${Date.now()}.${format}`,
      }
    },
    approveExpense: async (id: string, amount: number) => {
      await simulateApiCall(800)
      toast({
        title: "Expense Approved",
        description: `$${amount} expense has been approved`,
      })
      return { id, status: "approved", approvedAt: new Date().toISOString() }
    },
    rejectExpense: async (id: string, amount: number, reason: string) => {
      await simulateApiCall(800)
      toast({
        title: "Expense Rejected",
        description: `$${amount} expense has been rejected: ${reason}`,
        variant: "destructive",
      })
      return { id, status: "rejected", rejectedAt: new Date().toISOString(), reason }
    },
  },

  // HR actions
  hr: {
    addEmployee: async (employeeData: any) => {
      await simulateApiCall(1200)
      toast({
        title: "Employee Added",
        description: `${employeeData.name} has been added to the system`,
      })
      return {
        id: generateId(),
        ...employeeData,
        hireDate: new Date().toISOString(),
        status: "active",
      }
    },
    updateEmployee: async (id: string, employeeData: any) => {
      await simulateApiCall(1000)
      toast({
        title: "Employee Updated",
        description: `${employeeData.name}'s information has been updated`,
      })
      return { id, ...employeeData, updatedAt: new Date().toISOString() }
    },
    terminateEmployee: async (id: string, name: string, reason: string) => {
      await simulateApiCall(1500)
      toast({
        title: "Employee Terminated",
        description: `${name}'s employment has been terminated`,
        variant: "destructive",
      })
      return {
        id,
        status: "terminated",
        terminationDate: new Date().toISOString(),
        terminationReason: reason,
      }
    },
    approveLeave: async (id: string, employeeName: string, days: number) => {
      await simulateApiCall(800)
      toast({
        title: "Leave Approved",
        description: `${employeeName}'s ${days}-day leave request approved`,
      })
      return { id, status: "approved", approvedAt: new Date().toISOString() }
    },
    rejectLeave: async (id: string, employeeName: string, reason: string) => {
      await simulateApiCall(800)
      toast({
        title: "Leave Rejected",
        description: `${employeeName}'s leave request rejected: ${reason}`,
        variant: "destructive",
      })
      return { id, status: "rejected", rejectedAt: new Date().toISOString(), reason }
    },
    generatePayroll: async (period: string) => {
      await simulateApiCall(3000)
      toast({
        title: "Payroll Generated",
        description: `Payroll for ${period} has been generated successfully`,
      })
      return {
        id: generateId(),
        period,
        generatedAt: new Date().toISOString(),
        status: "pending_approval",
      }
    },
  },

  // Roles & Permissions actions
  roles: {
    addRole: async (roleData: any) => {
      await simulateApiCall(1000)
      toast({
        title: "Role Created",
        description: `${roleData.name} role has been created`,
      })
      return {
        id: generateId(),
        ...roleData,
        createdAt: new Date().toISOString(),
      }
    },
    updateRole: async (id: string, roleData: any) => {
      await simulateApiCall(800)
      toast({
        title: "Role Updated",
        description: `${roleData.name} role has been updated`,
      })
      return { id, ...roleData, updatedAt: new Date().toISOString() }
    },
    deleteRole: async (id: string, name: string) => {
      await simulateApiCall(800)
      toast({
        title: "Role Deleted",
        description: `${name} role has been deleted`,
        variant: "destructive",
      })
      return { success: true, id }
    },
    assignRole: async (userId: string, userName: string, roleId: string, roleName: string) => {
      await simulateApiCall(800)
      toast({
        title: "Role Assigned",
        description: `${roleName} role assigned to ${userName}`,
      })
      return { success: true, userId, roleId }
    },
    revokeRole: async (userId: string, userName: string, roleId: string, roleName: string) => {
      await simulateApiCall(800)
      toast({
        title: "Role Revoked",
        description: `${roleName} role revoked from ${userName}`,
        variant: "destructive",
      })
      return { success: true, userId, roleId }
    },
  },

  // Files actions
  files: {
    upload: async (fileData: any) => {
      await simulateApiCall(fileData.size / 10000) // Simulate larger files taking longer
      toast({
        title: "File Uploaded",
        description: `${fileData.name} (${(fileData.size / 1024 / 1024).toFixed(2)} MB) uploaded successfully`,
      })
      return {
        id: generateId(),
        ...fileData,
        uploadedAt: new Date().toISOString(),
        url: `/files/${fileData.name.replace(/\s+/g, "-")}`,
      }
    },
    delete: async (id: string, fileName: string) => {
      await simulateApiCall(500)
      toast({
        title: "File Deleted",
        description: `${fileName} has been deleted`,
        variant: "destructive",
      })
      return { success: true, id }
    },
    download: async (id: string, fileName: string) => {
      await simulateApiCall(800)
      toast({
        title: "Download Started",
        description: `${fileName} is being downloaded`,
      })
      return { success: true }
    },
    share: async (id: string, fileName: string, recipients: string[]) => {
      await simulateApiCall(1000)
      toast({
        title: "File Shared",
        description: `${fileName} shared with ${recipients.length} recipients`,
      })
      return {
        success: true,
        shareUrl: `/share/${id}?token=${btoa(Date.now().toString())}`,
      }
    },
    createFolder: async (folderName: string) => {
      await simulateApiCall(500)
      toast({
        title: "Folder Created",
        description: `${folderName} folder has been created`,
      })
      return {
        id: generateId(),
        name: folderName,
        createdAt: new Date().toISOString(),
        type: "folder",
      }
    },
    moveFile: async (fileId: string, fileName: string, destinationFolder: string) => {
      await simulateApiCall(800)
      toast({
        title: "File Moved",
        description: `${fileName} moved to ${destinationFolder}`,
      })
      return { success: true, fileId, destinationFolder }
    },
  },

  // AI Insights actions
  aiInsights: {
    generate: async (dataType: string) => {
      await simulateApiCall(3500) // AI takes longer
      toast({
        title: "AI Insight Generated",
        description: `New insights for ${dataType} are available`,
      })
      return {
        id: generateId(),
        type: dataType,
        title: `${dataType} Analysis`,
        description: `AI-generated insights about ${dataType.toLowerCase()} patterns and trends.`,
        createdAt: new Date().toISOString(),
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99% confidence
      }
    },
    export: async (insightId: string, insightType: string, format: "pdf" | "docx" | "pptx" = "pdf") => {
      await simulateApiCall(1500)
      toast({
        title: "Insight Exported",
        description: `${insightType} insight exported as ${format.toUpperCase()}`,
      })
      return {
        success: true,
        fileUrl: `/exports/insight-${insightType.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.${format}`,
      }
    },
    share: async (insightId: string, insightType: string, recipients: string[]) => {
      await simulateApiCall(1000)
      toast({
        title: "Insight Shared",
        description: `${insightType} insight shared with ${recipients.length} recipients`,
      })
      return { success: true }
    },
    scheduleAnalysis: async (dataType: string, frequency: "daily" | "weekly" | "monthly") => {
      await simulateApiCall(1000)
      toast({
        title: "Analysis Scheduled",
        description: `${dataType} will be analyzed ${frequency}`,
      })
      return {
        id: generateId(),
        type: dataType,
        frequency,
        nextRun: new Date(Date.now() + 86400000).toISOString(), // tomorrow
      }
    },
  },

  // Settings actions
  settings: {
    save: async (settingsData: any) => {
      await simulateApiCall(1000)
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully",
      })
      return { success: true, updatedAt: new Date().toISOString() }
    },
    resetToDefault: async () => {
      await simulateApiCall(1500)
      toast({
        title: "Settings Reset",
        description: "All settings have been reset to default values",
      })
      return { success: true }
    },
    exportSettings: async () => {
      await simulateApiCall(1000)
      toast({
        title: "Settings Exported",
        description: "Settings configuration exported successfully",
      })
      return {
        success: true,
        fileUrl: `/exports/settings-${Date.now()}.json`,
      }
    },
    importSettings: async (fileData: any) => {
      await simulateApiCall(1500)
      toast({
        title: "Settings Imported",
        description: "Settings configuration imported successfully",
      })
      return { success: true }
    },
    toggleFeature: async (featureId: string, featureName: string, enabled: boolean) => {
      await simulateApiCall(500)
      toast({
        title: "Feature Updated",
        description: `${featureName} is now ${enabled ? "enabled" : "disabled"}`,
      })
      return { featureId, enabled }
    },
  },

  // Profile actions
  profile: {
    update: async (profileData: any) => {
      await simulateApiCall(1000)
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated",
      })
      return { ...profileData, updatedAt: new Date().toISOString() }
    },
    changePassword: async (oldPassword: string, newPassword: string) => {
      await simulateApiCall(1500)
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully",
      })
      return { success: true, updatedAt: new Date().toISOString() }
    },
    uploadAvatar: async (fileData: any) => {
      await simulateApiCall(1500)
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated",
      })
      return {
        success: true,
        avatarUrl: `/avatars/user-${Date.now()}.jpg`,
      }
    },
    enableTwoFactor: async () => {
      await simulateApiCall(2000)
      toast({
        title: "Two-Factor Authentication Enabled",
        description: "Your account is now more secure",
      })
      return {
        success: true,
        qrCode:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAB30lEQVR42uyYwY3DMAxEqYJLUCmqxJSiElJCSkgJKkWlqBRfwsuCm8S3XA4GGMB/cbAiHj8pkZIJbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxs/4VNAAn4AfyAyWP9ugsYPQY/UOHlYwIY/R0TwIJ/xASw4t8wAaz4F0wAK/4BE8CKf8MEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQSw4t8wAaz4F0wAK/4NE8CKf8EEsOLfMAGs+BdMACv+DRPAin/BBLDi3zABrPgXTAAr/g0TwIp/wQTwB/gFNHa1Ezi1t/0AAAAASUVORK5CYII=",
        backupCodes: ["12345678", "23456789", "34567890", "45678901", "56789012"],
      }
    },
    disableTwoFactor: async () => {
      await simulateApiCall(1000)
      toast({
        title: "Two-Factor Authentication Disabled",
        description: "Two-factor authentication has been turned off",
        variant: "destructive",
      })
      return { success: true }
    },
  },
}

