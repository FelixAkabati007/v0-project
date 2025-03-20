import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const staffMembers = [
  {
    name: "Mr. Yaw Asante",
    role: "Head of Science Department",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Ms. Akua Mensah",
    role: "Head of Mathematics Department",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Mr. Kwesi Boateng",
    role: "Head of English Department",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    name: "Mrs. Ama Darko",
    role: "School Counselor",
    image: "/placeholder.svg?height=150&width=150",
  },
  // Add more staff members as needed
]

export default function StaffDirectoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Staff Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staffMembers.map((staff, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src={staff.image || "/placeholder.svg"}
                alt={staff.name}
                width={150}
                height={150}
                className="rounded-full mx-auto"
              />
              <CardTitle className="text-center mt-4">{staff.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">{staff.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

