"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"

type FormState = {
  firstName: string
  lastName: string
  indexNumber: string
  gender: string
  email: string
  phone: string
  program: string
  documents: FileList | null
  address: string
  parentName: string
  parentContact: string
  emergencyContact: string
  healthInfo: string
  agreeToTerms: boolean
}

type FormErrors = {
  [key in keyof FormState]?: string
}

export default function AdmissionForm() {
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    indexNumber: "",
    gender: "male",
    email: "",
    phone: "",
    program: "",
    documents: null,
    address: "",
    parentName: "",
    parentContact: "",
    emergencyContact: "",
    healthInfo: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }))

    // Clear error when user checks
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormState((prev) => ({ ...prev, documents: e.target.files }))

      // Clear error when user uploads
      if (errors.documents) {
        setErrors((prev) => ({ ...prev, documents: undefined }))
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required fields validation
    if (!formState.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formState.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formState.indexNumber.trim()) newErrors.indexNumber = "BECE Index Number is required"
    if (!formState.email.trim()) newErrors.email = "Email is required"
    if (!formState.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formState.program) newErrors.program = "Please select a program"
    if (!formState.parentName.trim()) newErrors.parentName = "Parent/Guardian name is required"
    if (!formState.parentContact.trim()) newErrors.parentContact = "Parent/Guardian contact is required"
    if (!formState.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

    // Format validations
    if (formState.indexNumber && !/^\d{10}$/.test(formState.indexNumber)) {
      newErrors.indexNumber = "Index number must be 10 digits"
    }

    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (formState.phone && !/^\+?[\d\s-]{10,15}$/.test(formState.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Document validation
    if (!formState.documents || formState.documents.length === 0) {
      newErrors.documents = "Required documents must be uploaded"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0] as keyof FormState
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        element.focus()
      }
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real application, you would submit the form data to your backend
      // const response = await fetch('/api/admissions', {
      //   method: 'POST',
      //   body: JSON.stringify(formState),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      // if (!response.ok) throw new Error('Failed to submit application')

      setSubmitSuccess(true)
      toast({
        title: "Application Submitted",
        description: "Your admission application has been successfully submitted. We will contact you soon.",
      })

      // Reset form after successful submission
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitError("There was an error submitting your application. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
        <p className="mb-6">
          Thank you for applying to Ejisuman Senior High School. Your application has been received and is being
          processed. You will receive a confirmation email shortly.
        </p>
        <p className="mb-6">
          Your application reference number:{" "}
          <span className="font-bold">EJI-{Math.floor(100000 + Math.random() * 900000)}</span>
        </p>
        <Button onClick={() => (window.location.href = "/")}>Return to Homepage</Button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admission Application</h2>

      {submitError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center">
                First Name <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={errors.firstName ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-sm text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center">
                Last Name <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleInputChange}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={errors.lastName ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-sm text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="indexNumber" className="flex items-center">
              BECE Index Number <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="indexNumber"
              name="indexNumber"
              value={formState.indexNumber}
              onChange={handleInputChange}
              placeholder="10-digit number"
              aria-invalid={!!errors.indexNumber}
              aria-describedby={errors.indexNumber ? "indexNumber-error" : undefined}
              className={errors.indexNumber ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.indexNumber && (
              <p id="indexNumber-error" className="text-sm text-red-500">
                {errors.indexNumber}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              Gender <span className="text-red-500 ml-1">*</span>
            </Label>
            <RadioGroup
              value={formState.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                Email Address <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                Phone Number <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={errors.phone ? "border-red-500 focus:ring-red-500" : ""}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Residential Address</Label>
            <Textarea id="address" name="address" value={formState.address} onChange={handleInputChange} rows={3} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Academic Information</h3>

          <div className="space-y-2">
            <Label htmlFor="program" className="flex items-center">
              Preferred Program <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={formState.program} onValueChange={(value) => handleSelectChange("program", value)}>
              <SelectTrigger
                id="program"
                className={errors.program ? "border-red-500 focus:ring-red-500" : ""}
                aria-invalid={!!errors.program}
                aria-describedby={errors.program ? "program-error" : undefined}
              >
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="science">General Science</SelectItem>
                <SelectItem value="agriculture">Agricultural Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">General Arts</SelectItem>
                <SelectItem value="visualarts">Visual Arts</SelectItem>
                <SelectItem value="homeeconomics">Home Economics</SelectItem>
              </SelectContent>
            </Select>
            {errors.program && (
              <p id="program-error" className="text-sm text-red-500">
                {errors.program}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>

          <div className="space-y-2">
            <Label htmlFor="parentName" className="flex items-center">
              Parent/Guardian Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="parentName"
              name="parentName"
              value={formState.parentName}
              onChange={handleInputChange}
              aria-invalid={!!errors.parentName}
              aria-describedby={errors.parentName ? "parentName-error" : undefined}
              className={errors.parentName ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.parentName && (
              <p id="parentName-error" className="text-sm text-red-500">
                {errors.parentName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentContact" className="flex items-center">
              Parent/Guardian Contact <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="parentContact"
              name="parentContact"
              value={formState.parentContact}
              onChange={handleInputChange}
              aria-invalid={!!errors.parentContact}
              aria-describedby={errors.parentContact ? "parentContact-error" : undefined}
              className={errors.parentContact ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.parentContact && (
              <p id="parentContact-error" className="text-sm text-red-500">
                {errors.parentContact}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact (if different)</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              value={formState.emergencyContact}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Information</h3>

          <div className="space-y-2">
            <Label htmlFor="healthInfo">Health Information (allergies, conditions, etc.)</Label>
            <Textarea
              id="healthInfo"
              name="healthInfo"
              value={formState.healthInfo}
              onChange={handleInputChange}
              rows={3}
              placeholder="Please list any health conditions we should be aware of"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents" className="flex items-center">
              Required Documents <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="documents"
              type="file"
              multiple
              accept=".pdf,.jpg,.png,.jpeg"
              onChange={handleFileChange}
              aria-invalid={!!errors.documents}
              aria-describedby={errors.documents ? "documents-error" : undefined}
              className={errors.documents ? "border-red-500 focus:ring-red-500" : ""}
            />
            <p className="text-sm text-gray-500">
              Upload BECE results slip, birth certificate, and passport photo (Max size: 5MB each)
            </p>
            {errors.documents && (
              <p id="documents-error" className="text-sm text-red-500">
                {errors.documents}
              </p>
            )}
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="agreeToTerms"
              checked={formState.agreeToTerms}
              onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked === true)}
              aria-invalid={!!errors.agreeToTerms}
              aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="agreeToTerms"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.agreeToTerms ? "text-red-500" : ""}`}
              >
                I agree to the terms and conditions <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500">
                By submitting this form, I certify that all information provided is accurate and complete.
              </p>
              {errors.agreeToTerms && (
                <p id="terms-error" className="text-sm text-red-500">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </form>
    </div>
  )
}

