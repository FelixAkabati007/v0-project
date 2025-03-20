"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Admissions</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-4">
            Ejisuman Senior High School welcomes students who are passionate about learning and ready to embark on an
            exciting academic journey. Our admissions process is designed to identify motivated students who will thrive
            in our challenging and supportive environment.
          </p>
          <Button asChild>
            <a href="https://cssps.gov.gh" target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Check CSSPS</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Check Your CSSPS Placement</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/276325051_2101406356702181_5387610399561603644_n.jpg-L2ZUJFc4rdz5rRdl5745Gbub2TlKth.jpeg"
                  alt="CSSPS Instructions"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
                <div className="space-y-2">
                  <h3 className="font-semibold">Follow these steps:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Dial *920*44#</li>
                    <li>Select option (2)</li>
                    <li>Enter your index number</li>
                    <li>Confirm your details</li>
                  </ol>
                </div>
                <Button onClick={() => (window.location.href = "https://cssps.gov.gh")}>Visit CSSPS Portal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Admission Requirements</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Successful completion of Basic Education Certificate Examination (BECE)</li>
            <li>Minimum aggregate score of 30 or better in BECE</li>
            <li>Good conduct and character references</li>
            <li>Completed application form</li>
            <li>Payment of application fee</li>
          </ul>
        </section>

        <section id="application-process" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1. Online Application",
                description: "Complete the online application form with your personal and academic information.",
              },
              {
                title: "2. Document Submission",
                description: "Submit required documents, including BECE results and birth certificate.",
              },
              {
                title: "3. Entrance Examination",
                description: "Participate in our entrance examination to assess your academic readiness.",
              },
              {
                title: "4. Interview",
                description: "Shortlisted candidates will be invited for a personal interview.",
              },
              {
                title: "5. Admission Decision",
                description: "Receive your admission decision within 4 weeks of completing all steps.",
              },
              {
                title: "6. Enrollment",
                description:
                  "If accepted, complete the enrollment process by paying fees and submitting additional forms.",
              },
            ].map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Financial Aid</h2>
          <p className="mb-4">
            Ejisuman Senior High School is committed to making quality education accessible. We offer various financial
            aid options and scholarships to deserving students. Please contact our admissions office for more
            information on financial assistance programs.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Admissions Office</Link>
          </Button>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                We encourage prospective students and their families to visit our campus. Experience firsthand our
                vibrant community, state-of-the-art facilities, and meet with our faculty and current students.
              </p>
              <Button asChild>
                <Link href="/virtual-tour">Take a Virtual Tour</Link>
              </Button>
            </div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/entrance.jpg-ObyaPSDHPCX2UCdsFAe4Hwtw26N3TW.jpeg"
              alt="Ejisuman Senior High School Campus"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

