"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Video, MessageSquare, Star, User, Target, Award, Search, Filter, Plus } from "lucide-react"

interface MentorshipSessionsProps {
  className?: string
}

// Mock data for mentors
const mockMentors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Software Engineer",
    company: "Google",
    expertise: ["React", "System Design", "Career Guidance"],
    rating: 4.9,
    sessions: 156,
    experience: "8+ years",
    image: "/placeholder.svg?height=40&width=40",
    availability: "Available",
    price: "Free",
    bio: "Passionate about mentoring the next generation of developers. Specializes in frontend technologies and career development.",
  },
  {
    id: 2,
    name: "Mike Chen",
    title: "Data Science Manager",
    company: "Microsoft",
    expertise: ["Machine Learning", "Python", "Data Analysis"],
    rating: 4.8,
    sessions: 89,
    experience: "6+ years",
    image: "/placeholder.svg?height=40&width=40",
    availability: "Busy",
    price: "₹500/session",
    bio: "Helping students transition into data science roles. Expert in ML algorithms and data visualization.",
  },
  {
    id: 3,
    name: "Lisa Zhang",
    title: "Product Manager",
    company: "Amazon",
    expertise: ["Product Strategy", "Leadership", "Business Analysis"],
    rating: 4.7,
    sessions: 124,
    experience: "10+ years",
    image: "/placeholder.svg?height=40&width=40",
    availability: "Available",
    price: "₹800/session",
    bio: "Former startup founder turned PM. Passionate about product development and entrepreneurship.",
  },
]

// Mock data for booked sessions
const mockBookedSessions = [
  {
    id: 1,
    mentor: "Dr. Sarah Johnson",
    topic: "React Best Practices",
    date: "2024-02-20",
    time: "10:00 AM",
    duration: "60 minutes",
    status: "Upcoming",
    type: "Video Call",
    notes: "Discuss component architecture and state management",
  },
  {
    id: 2,
    mentor: "Mike Chen",
    topic: "Machine Learning Career Path",
    date: "2024-02-18",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "Completed",
    type: "Video Call",
    notes: "Great session! Got clarity on ML roles and required skills",
    rating: 5,
  },
  {
    id: 3,
    mentor: "Lisa Zhang",
    topic: "Product Management Fundamentals",
    date: "2024-02-25",
    time: "4:00 PM",
    duration: "60 minutes",
    status: "Upcoming",
    type: "Video Call",
    notes: "Learn about product lifecycle and user research",
  },
]

// Mock data for session history
const mockSessionHistory = [
  {
    id: 1,
    mentor: "Dr. Sarah Johnson",
    topic: "Frontend Development Roadmap",
    date: "2024-01-15",
    rating: 5,
    feedback: "Excellent guidance on learning path. Very helpful!",
    duration: "60 minutes",
  },
  {
    id: 2,
    mentor: "Mike Chen",
    topic: "Data Science Interview Prep",
    date: "2024-01-10",
    rating: 4,
    feedback: "Good technical insights. Could have been more interactive.",
    duration: "45 minutes",
  },
]

export function MentorshipSessions({ className }: MentorshipSessionsProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("all")
  const [selectedMentor, setSelectedMentor] = React.useState<any>(null)

  const renderFindMentors = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentors by name, company, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="product">Product Management</SelectItem>
                <SelectItem value="career">Career Guidance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockMentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>{mentor.title}</CardDescription>
                        <p className="text-sm text-muted-foreground">{mentor.company}</p>
                      </div>
                      <Badge variant={mentor.availability === "Available" ? "default" : "secondary"}>
                        {mentor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{mentor.bio}</p>

                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mentor.rating}</span>
                    </div>
                    <p className="text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{mentor.sessions}</p>
                    <p className="text-muted-foreground">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{mentor.experience}</p>
                    <p className="text-muted-foreground">Experience</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-primary">{mentor.price}</span>
                  <Button onClick={() => setSelectedMentor(mentor)} disabled={mentor.availability === "Busy"}>
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderMyBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">My Booked Sessions</h3>
          <p className="text-sm text-muted-foreground">Manage your upcoming and past mentorship sessions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Book New Session
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="completed">Completed Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="space-y-4">
            {mockBookedSessions
              .filter((session) => session.status === "Upcoming")
              .map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{session.topic}</h4>
                          <p className="text-sm text-muted-foreground mb-2">with {session.mentor}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4 text-muted-foreground" />
                              <span>{session.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{session.duration}</span>
                            </div>
                          </div>

                          {session.notes && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm">{session.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Join Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="space-y-4">
            {mockBookedSessions
              .filter((session) => session.status === "Completed")
              .map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{session.topic}</h4>
                          <p className="text-sm text-muted-foreground mb-2">with {session.mentor}</p>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{session.duration}</span>
                            </div>
                            {session.rating && (
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{session.rating}/5</span>
                              </div>
                            )}
                          </div>

                          {session.notes && (
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm">{session.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderProgress = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Progress</CardTitle>
          <CardDescription>Track your learning journey and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Sessions", value: "12", icon: Video },
              { label: "Hours Learned", value: "18", icon: Clock },
              { label: "Mentors Met", value: "5", icon: User },
              { label: "Skills Improved", value: "8", icon: Target },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center p-4 border rounded-lg">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Learning Goals */}
          <div>
            <h4 className="font-semibold mb-4">Learning Goals Progress</h4>
            <div className="space-y-4">
              {[
                { goal: "Master React Development", progress: 75, sessions: 8 },
                { goal: "Learn System Design", progress: 40, sessions: 3 },
                { goal: "Improve Interview Skills", progress: 60, sessions: 4 },
                { goal: "Build Portfolio Projects", progress: 85, sessions: 6 },
              ].map((goal, index) => (
                <div key={goal.goal} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{goal.goal}</span>
                    <span className="text-sm text-muted-foreground">{goal.sessions} sessions</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <h4 className="font-semibold mb-4">Recent Achievements</h4>
            <div className="space-y-3">
              {[
                { achievement: "Completed React Fundamentals", date: "2024-01-20", mentor: "Dr. Sarah Johnson" },
                { achievement: "Built First Full-Stack Project", date: "2024-01-15", mentor: "Mike Chen" },
                { achievement: "Aced Technical Interview", date: "2024-01-10", mentor: "Lisa Zhang" },
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <div className="flex-1">
                    <p className="font-medium">{achievement.achievement}</p>
                    <p className="text-sm text-muted-foreground">
                      {achievement.date} • Guided by {achievement.mentor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBookingModal = () => {
    if (!selectedMentor) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Book Session with {selectedMentor.name}</CardTitle>
            <CardDescription>Schedule your mentorship session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Session Topic</Label>
              <Input id="topic" placeholder="What would you like to discuss?" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input type="date" id="date" />
              </div>
              <div>
                <Label htmlFor="time">Preferred Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Session Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any specific topics or questions you'd like to cover?" rows={3} />
            </div>
            <div className="flex gap-2 pt-4">
              <Button className="flex-1">Book Session</Button>
              <Button variant="outline" onClick={() => setSelectedMentor(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={className}>
      <Tabs defaultValue="find-mentors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="my-bookings">My Sessions</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentors" className="space-y-6">
          {renderFindMentors()}
        </TabsContent>

        <TabsContent value="my-bookings" className="space-y-6">
          {renderMyBookings()}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {renderProgress()}
        </TabsContent>
      </Tabs>

      {renderBookingModal()}
    </div>
  )
}
