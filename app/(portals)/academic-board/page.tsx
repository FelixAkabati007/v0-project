"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartInput } from "@/components/ui/smart-input"
import { SmartTextarea } from "@/components/ui/smart-textarea"
import { SmartSelect } from "@/components/ui/smart-select"
import { SmartDatePicker } from "@/components/ui/smart-date-picker"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart,
  Calendar,
  ClipboardCheck,
  FileText,
  MessageSquare,
  Users,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Download,
  ArrowUpRight,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  CheckCircle,
} from "lucide-react"
import { PortalHeader } from "@/components/portal-header"
import { AcademicBoardSidebar } from "@/components/academic-board-sidebar"

export default function AcademicBoardDashboard() {
  const [meetingDate, setMeetingDate] = useState<Date>()
  const [policyFeedback, setPolicyFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleScheduleMeeting = () => {
    if (meetingDate) {
      toast({
        title: "Meeting Scheduled",
        description: `Academic board meeting scheduled for ${meetingDate.toLocaleDateString()} at ${meetingDate.toLocaleTimeString()}`,
      })
      setMeetingDate(undefined)
    }
  }

  const handlePolicyFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (policyFeedback.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Your policy feedback has been submitted for review.",
      })
      setPolicyFeedback("")
    }
  }

  const handleViewDetails = (section: string, id: string) => {
    router.push(`/academic-board/${section}/${id}`)
    toast({
      title: `Viewing ${section} details`,
      description: `Navigating to ${section} details page.`
    })
  }

  const handleEditItem = (section: string, id: string) => {
    router.push(`/academic-board/${section}/${id}/edit`)
    toast({
      title: `Editing ${section}`,
      description: `Navigating to ${section} edit page.`
    })
  }

  const handleCreateNew = (section: string) => {
    router.push(`/academic-board/${section}/create`)
    toast({
      title: `Create new ${section}`,
      description: `Navigating to ${section} creation page.`
    })
  }

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Downloading report",
      description: `The ${reportType} report is being downloaded.`
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      } 
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader
        portalName="Academic Board"
        userRole="Board Member"
        userName="Dr. Michael Owusu"
        userAvatar="/placeholder.svg?height=32&width=32"
        sidebarContent={<AcademicBoardSidebar />}
        notificationCount={notifications}
      />

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Welcome, Dr. Owusu</h2>
              <p className="text-muted-foreground">Academic Board Dashboard</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="hidden md:flex"
                onClick={() => router.push('/academic-board/calendar')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>Academic Calendar</span>
              </Button>
              <Button onClick={() => router.push('/academic-board/meetings/schedule')}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Schedule Meeting</span>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-l-indigo-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                      4 high priority items
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => router.push('/academic-board/reviews/pending')}
                  >
                    View pending reviews
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-emerald-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      3 new hires this term
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => router.push('/academic-board/faculty')}
                  >
                    View faculty directory
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Academic Performance</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72.8%</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+4.2% from last year</span>
                  </div>
                </CardContent>
                <CardFooter className="p-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => router.push('/academic-board/performance')}
                  >
                    View performance metrics
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-amber-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                      Next meeting in 2 days
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => router.push('/academic-board/meetings')}
                  >
                    View meeting schedule
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="quality">Quality Assurance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Academic Performance Trends</CardTitle>
                          <CardDescription>Average scores by department over the past 3 years</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleDownloadReport('performance-trends')}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download performance report</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push('/academic-board/performance/detailed')}
                          >
                            <BarChart className="mr-2 h-4 w-4" />
                            Detailed Report
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-end gap-2">
                        {[
                          { department: "Science", scores: [68, 72, 76] },
                          { department: "Mathematics", scores: [72, 75, 78] },
                          { department: "Languages", scores: [70, 73, 75] },
                          { department: "Social Studies", scores: [65, 68, 72] },
                          { department: "Technical", scores: [62, 67, 71] },
                          { department: "Arts", scores: [74, 76, 79] },
                        ].map((data, i) => (
                          <div key={i} className="relative flex flex-col items-center flex-1">
                            <div className="w-full flex flex-col items-center gap-1">
                              {data.scores.map((score, j) => (
                                <div
                                  key={j}
                                  className={`w-4/5 rounded-t-sm ${
                                    j === 0 ? "bg-blue-300" : j === 1 ? "bg-blue-500" : "bg-blue-700"
                                  }`}
                                  style={{ height: `${score * 3}px` }}
                                ></div>
                              ))}
                            </div>
                            <span className="text-xs font-medium mt-2">{data.department}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center mt-4 space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-300 rounded-full mr-1"></div>
                          <span className="text-xs">2021</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                          <span className="text-xs">2022</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-700 rounded-full mr-1"></div>
                          <span className="text-xs">2023</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => router.push('/academic-board/performance/analytics')}
                      >
                        View Comprehensive Analytics
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="col-span-3">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Recent Policy Updates</CardTitle>
                          <CardDescription>Latest academic policy changes</CardDescription>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => router.push('/academic-board/policies')}
                        >
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: "p1", title: "Assessment Framework Revision", status: "Approved", date: "2 weeks ago" },
                          { id: "p2", title: "Attendance Policy Update", status: "Under Review", date: "1 month ago" },
                          { id: "p3", title: "Curriculum Integration Guidelines", status: "Approved", date: "2 months ago" },
                          { id: "p4", title: "Teacher Evaluation Standards", status: "Implemented", date: "3 months ago" },
                          { id: "p5", title: "Student Disciplinary Procedures", status: "Under Review", date: "3 months ago" },
                        ].map((policy, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  policy.status === "Approved"
                                    ? "bg-green-500"
                                    : policy.status === "Implemented"
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }`}
                              ></div>
                              <div>
                                <p className="font-medium">{policy.title}</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Badge variant="outline" className="mr-2 px-1 text-[10px]">
                                    {policy.status}
                                  </Badge>
                                  <span>{policy.date}</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewDetails('policies', policy.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => router.push('/academic-board/policies')}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View All Policies
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Schedule Board Meeting</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => router.push('/academic-board/meetings/history')}
                        >
                          View History
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <SmartInput
                          label="Meeting Title"
                          placeholder="Enter meeting title"
                          predictiveText
                          suggestions={[
                            "End of Term Academic Review",
                            "Curriculum Development Meeting",
                            "Faculty Performance Evaluation",
                            "Policy Review Session",
                          ]}
                        />
                        <SmartSelect
                          label="Meeting Type"
                          options={[
                            { value: "regular", label: "Regular Meeting" },
                            { value: "emergency", label: "Emergency Meeting" },
                            { value: "committee", label: "Committee Meeting" },
                            { value: "special", label: "Special Session" },
                          ]}
                          searchable
                        />
                        <SmartDatePicker label="Date & Time" value={meetingDate} onChange={setMeetingDate} includeTime />
                        <Button onClick={handleScheduleMeeting} disabled={!meetingDate} className="w-full">
                          Schedule Meeting
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Policy Feedback</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => router.push('/academic-board/policies/feedback')}
                        >
                          View All Feedback
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePolicyFeedback}>
                        <SmartSelect
                          label="Select Policy"
                          options={[
                            { value: "assessment", label: "Assessment Framework Revision" },
                            { value: "attendance", label: "Attendance Policy Update" },
                            { value: "curriculum", label: "Curriculum Integration Guidelines" },
                            { value: "evaluation", label: "Teacher Evaluation Standards" },
                            { value: "disciplinary", label: "Student Disciplinary Procedures" },
                          ]}
                          className="mb-4"
                          searchable
                        />
                        <SmartTextarea
                          value={policyFeedback}
                          onChange={(e) => setPolicyFeedback(e.target.value)}
                          placeholder="Enter your feedback on the selected policy..."
                          className="mb-4"
                          aiAssist
                          voiceInput
                          expandable
                        />
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" type="button" onClick={() => {
                            toast({
                              title: "Policy Approved",
                              description: "You have approved this policy."
                            })
                          }}>
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button variant="outline" className="flex-1" type="button" onClick={() => {
                            toast({
                              title: "Policy Rejected",
                              description: "You have rejected this policy."
                            })
                          }}>
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Quality Assurance</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => router.push('/academic-board/quality')}
                        >
                          Full Report
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: "q1", area: "Teaching Standards", score: 85, target: 90 },
                          { id: "q2", area: "Curriculum Alignment", score: 78, target: 85 },
                          { id: "q3", area: "Assessment Quality", score: 82, target: 85 },
                          { id: "q4", area: "Student Support", score: 75, target: 80 },
                          { id: "q5", area: "Resource Adequacy", score: 68, target: 75 },
                        ].map((item, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{item.area}</span>
                              <span className="text-xs text-muted-foreground">
                                {item.score}/{item.target}
                              </span>
                            </div>
                            <Progress
                              value={(item.score / item.target) * 100}
                              className={item.score >= item.target ? "bg-green-100" : ""}
                            />
                            <div className="flex items-center justify-between text-xs">
                              {item.score >= item.target ? (
                                <span className="text-green-500 flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Target met
                                </span>
                              ) : (
                                <span className="text-amber-500">
                                  {Math.round((item.score / item.target) * 100)}% of target
                                </span>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-xs"
                                onClick={() => handleViewDetails('quality', item.id)}
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => router.push('/academic-board/quality')}
                      >
                        <ClipboardCheck className="mr-2 h-4 w-4" />
                        Full Quality Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>Curriculum Management</CardTitle>
                        <CardDescription>Review and approve curriculum changes</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <input
                            type="search"
                            placeholder="Search curriculum..."
                            className="pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleCreateNew('curriculum')}>
                          <Plus className="mr-2 h-4 w-4" />
                          New Proposal
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: "c1", title: "Science Curriculum Update", department: "Science", status: "Under Review", submittedBy: "Dr. James Wilson", date: "Mar 15, 2025" },
                        { id: "c2", title: "Mathematics Syllabus Revision", department: "Mathematics", status: "Approved", submittedBy: "Mrs. Emily Davis", date: "Mar 10, 2025" },
                        { id: "c3", title: "Language Arts Integration", department: "Languages", status: "Pending", submittedBy: "Mr. Robert Taylor", date: "Mar 8, 2025" },
                        { id: "c4", title: "History Curriculum Enhancement", department: "Social Studies", status: "Under Review", submittedBy: "Ms. Patricia Moore", date: "Mar 5, 2025" },
                        { id: "c5", title: "Computer Science Program Update", department: "ICT", status: "Approved", submittedBy: "Mr. Daniel Johnson", date: "Mar 1, 2025" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{item.title}</h3>
                              <Badge variant={
                                item.status === "Approved" ? "success" : 
                                item.status === "Under Review" ? "secondary" : 
                                "outline"
                              }>
                                {item.status}
                              </Badge>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <span>{item.department}</span>
                              <span className="mx-2">•</span>
                              <span>Submitted by: {item.submittedBy}</span>
                              <span className="mx-2">•</span>
                              <span>{item.date}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails('curriculum', item.id)}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditItem('curriculum', item.id)}
                            >
                              <Edit className="mr-1 h-3 w-3" />
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push('/academic-board/curriculum')}
                    >
                      View All Curriculum Items
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>Academic Performance Analytics</CardTitle>
                        <CardDescription>Detailed performance metrics and analysis</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleDownloadReport('performance-analytics')}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                        <Button onClick={() => router.push('/academic-board/performance/compare')}>
                          <BarChart className="mr-2 h-4 w-4" />
                          Compare Data
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Performance by Department</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { department: "Science", score: 76, change: "+3.2%" },
                            { department: "Mathematics", score: 78, change: "+1.5%" },
                            { department: "Languages", score: 75, change: "+2.1%" },
                            { department: "Social Studies", score: 72, change: "+4.0%" },
                            { department: "Technical", score: 71, change: "+5.8%" },
                            { department: "Arts", score: 79, change:\

