"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"

const faqs = [
  {
    question: "How do I reset a student's password?",
    answer:
      "To reset a student's password, go to the Users page, find the student's account, click on the Edit button, and select 'Reset Password'. This will generate a new temporary password that the student can use to log in and then change to a password of their choice.",
  },
  {
    question: "How can I generate a report of student grades?",
    answer:
      "To generate a report of student grades, navigate to the Reports page, select 'Student Grades' from the report type dropdown, choose the relevant class and subject, and click on 'Generate Report'. You can then download the report in various formats such as PDF or Excel.",
  },
  {
    question: "How do I add a new course to the system?",
    answer:
      "To add a new course, go to the Courses page and click on the 'Add New Course' button. Fill in the required details such as course name, code, instructor, and schedule. Once you've entered all the information, click 'Save' to add the course to the system.",
  },
  {
    question: "How can I set up email notifications for important events?",
    answer:
      "To set up email notifications, go to the Settings page and select the 'Notifications' tab. Here you can choose which events you want to receive email notifications for, such as new user registrations, grade updates, or system alerts. Don't forget to save your changes after making your selections.",
  },
  {
    question: "How do I assign roles and permissions to staff members?",
    answer:
      "To assign roles and permissions, navigate to the Roles and Permissions page. Here you can create new roles or edit existing ones. To assign a role to a staff member, go to the Users page, find the staff member's account, click on Edit, and select the appropriate role from the dropdown menu.",
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Help Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No results found. Please try a different search term.</p>
          )}
          <div className="mt-8 text-center">
            <p className="mb-4">Can't find what you're looking for?</p>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

