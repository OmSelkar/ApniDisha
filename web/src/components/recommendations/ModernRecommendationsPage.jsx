"use client"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  GraduationCap,
  BookOpen,
  Building,
  Briefcase,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  IndianRupee,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { recommendationsAPI } from "../../services/api"
import "../../i18n" // Import centralized i18n config

const ModernRecommendationsPage = () => {
  const { t, i18n } = useTranslation()
  const [recommendations, setRecommendations] = useState({
    streams: [],
    degrees: [],
    colleges: [],
    careers: [],
    content: [],
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("streams")

  useEffect(() => {
    fetchRecommendations()
  }, [i18n.language])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      try {
        const response = await recommendationsAPI.getPersonalized()
        const recoData = response.data.data || response.data.recommendations || {}

        setRecommendations({
          streams: recoData.streams || [],
          degrees: recoData.degrees || [],
          colleges: recoData.colleges || [],
          careers: recoData.careers || [],
          content: recoData.content || [],
        })
      } catch {
        console.log("User not authenticated - showing sample recommendations")
        setRecommendations({
          streams: [
            {
              _id: "1",
              name: t("recommendations_1.sampleData.streams.science.name"),
              description: t("recommendations_1.sampleData.streams.science.description"),
              matchScore: 85,
              category: t("recommendations_1.sampleData.streams.science.category"),
            },
            {
              _id: "2",
              name: t("recommendations_1.sampleData.streams.commerce.name"),
              description: t("recommendations_1.sampleData.streams.commerce.description"),
              matchScore: 75,
              category: t("recommendations_1.sampleData.streams.commerce.category"),
            },
            {
              _id: "3",
              name: t("recommendations_1.sampleData.streams.arts.name"),
              description: t("recommendations_1.sampleData.streams.arts.description"),
              matchScore: 70,
              category: t("recommendations_1.sampleData.streams.arts.category"),
            },
            {
              _id: "4",
              name: t("recommendations_1.sampleData.streams.vocational.name"),
              description: t("recommendations_1.sampleData.streams.vocational.description"),
              matchScore: 65,
              category: t("recommendations_1.sampleData.streams.vocational.category"),
            },
            {
              _id: "5",
              name: t("recommendations_1.sampleData.streams.law.name"),
              description: t("recommendations_1.sampleData.streams.law.description"),
              matchScore: 72,
              category: t("recommendations_1.sampleData.streams.law.category"),
            },
            {
              _id: "6",
              name: t("recommendations_1.sampleData.streams.medical.name"),
              description: t("recommendations_1.sampleData.streams.medical.description"),
              matchScore: 88,
              category: t("recommendations_1.sampleData.streams.medical.category"),
            },
            {
              _id: "7",
              name: t("recommendations_1.sampleData.streams.fineArts.name"),
              description: t("recommendations_1.sampleData.streams.fineArts.description"),
              matchScore: 60,
              category: t("recommendations_1.sampleData.streams.fineArts.category"),
            },
            {
              _id: "8",
              name: t("recommendations_1.sampleData.streams.agriculture.name"),
              description: t("recommendations_1.sampleData.streams.agriculture.description"),
              matchScore: 68,
              category: t("recommendations_1.sampleData.streams.agriculture.category"),
            },
          ],
          degrees: [
            {
              _id: "1",
              name: t("recommendations_1.sampleData.degrees.btech.name"),
              description: t("recommendations_1.sampleData.degrees.btech.description"),
              level: t("recommendations_1.sampleData.degrees.btech.level"),
              matchScore: 90,
              duration: "4 years",
              averageFee: 200000,
            },
            {
              _id: "2",
              name: t("recommendations_1.sampleData.degrees.bcom.name"),
              description: t("recommendations_1.sampleData.degrees.bcom.description"),
              level: t("recommendations_1.sampleData.degrees.bcom.level"),
              matchScore: 80,
              duration: "3 years",
              averageFee: 120000,
            },
            {
              _id: "3",
              name: t("recommendations_1.sampleData.degrees.ba.name"),
              description: t("recommendations_1.sampleData.degrees.ba.description"),
              level: t("recommendations_1.sampleData.degrees.ba.level"),
              matchScore: 75,
              duration: "3 years",
              averageFee: 100000,
            },
            {
              _id: "4",
              name: t("recommendations_1.sampleData.degrees.bsc.name"),
              description: t("recommendations_1.sampleData.degrees.bsc.description"),
              level: t("recommendations_1.sampleData.degrees.bsc.level"),
              matchScore: 78,
              duration: "3 years",
              averageFee: 150000,
            },
            {
              _id: "5",
              name: t("recommendations_1.sampleData.degrees.mbbs.name"),
              description: t("recommendations_1.sampleData.degrees.mbbs.description"),
              level: t("recommendations_1.sampleData.degrees.mbbs.level"),
              matchScore: 92,
              duration: "5.5 years",
              averageFee: 600000,
            },
            {
              _id: "6",
              name: t("recommendations_1.sampleData.degrees.bfa.name"),
              description: t("recommendations_1.sampleData.degrees.bfa.description"),
              level: t("recommendations_1.sampleData.degrees.bfa.level"),
              matchScore: 70,
              duration: "4 years",
              averageFee: 180000,
            },
            {
              _id: "7",
              name: t("recommendations_1.sampleData.degrees.llb.name"),
              description: t("recommendations_1.sampleData.degrees.llb.description"),
              level: t("recommendations_1.sampleData.degrees.llb.level"),
              matchScore: 82,
              duration: "3 years",
              averageFee: 220000,
            },
            {
              _id: "8",
              name: t("recommendations_1.sampleData.degrees.bba.name"),
              description: t("recommendations_1.sampleData.degrees.bba.description"),
              level: t("recommendations_1.sampleData.degrees.bba.level"),
              matchScore: 85,
              duration: "3 years",
              averageFee: 250000,
            },
          ],
          colleges: [
            {
              _id: "1",
              name: t("recommendations_1.sampleData.colleges.iitDelhi.name"),
              type: t("recommendations_1.sampleData.colleges.iitDelhi.type"),
              location: t("recommendations_1.sampleData.colleges.iitDelhi.location"),
              rating: 4.8,
              studentsCount: 8000,
              averageFee: 200000,
            },
            {
              _id: "2",
              name: t("recommendations_1.sampleData.colleges.delhiUniversity.name"),
              type: t("recommendations_1.sampleData.colleges.delhiUniversity.type"),
              location: t("recommendations_1.sampleData.colleges.delhiUniversity.location"),
              rating: 4.6,
              studentsCount: 200000,
              averageFee: 60000,
            },
            {
              _id: "3",
              name: t("recommendations_1.sampleData.colleges.christUniversity.name"),
              type: t("recommendations_1.sampleData.colleges.christUniversity.type"),
              location: t("recommendations_1.sampleData.colleges.christUniversity.location"),
              rating: 4.4,
              studentsCount: 25000,
              averageFee: 180000,
            },
            {
              _id: "4",
              name: t("recommendations_1.sampleData.colleges.stXaviers.name"),
              type: t("recommendations_1.sampleData.colleges.stXaviers.type"),
              location: t("recommendations_1.sampleData.colleges.stXaviers.location"),
              rating: 4.5,
              studentsCount: 5000,
              averageFee: 120000,
            },
            {
              _id: "5",
              name: t("recommendations_1.sampleData.colleges.aiims.name"),
              type: t("recommendations_1.sampleData.colleges.aiims.type"),
              location: t("recommendations_1.sampleData.colleges.aiims.location"),
              rating: 4.9,
              studentsCount: 15000,
              averageFee: 300000,
            },
            {
              _id: "6",
              name: t("recommendations_1.sampleData.colleges.nlsiu.name"),
              type: t("recommendations_1.sampleData.colleges.nlsiu.type"),
              location: t("recommendations_1.sampleData.colleges.nlsiu.location"),
              rating: 4.7,
              studentsCount: 2000,
              averageFee: 250000,
            },
            {
              _id: "7",
              name: t("recommendations_1.sampleData.colleges.bhu.name"),
              type: t("recommendations_1.sampleData.colleges.bhu.type"),
              location: t("recommendations_1.sampleData.colleges.bhu.location"),
              rating: 4.6,
              studentsCount: 30000,
              averageFee: 100000,
            },
            {
              _id: "8",
              name: t("recommendations_1.sampleData.colleges.symbiosis.name"),
              type: t("recommendations_1.sampleData.colleges.symbiosis.type"),
              location: t("recommendations_1.sampleData.colleges.symbiosis.location"),
              rating: 4.3,
              studentsCount: 18000,
              averageFee: 200000,
            },
          ],
          careers: [
            {
              _id: "1",
              title: t("recommendations_1.sampleData.careers.softwareEngineer.title"),
              description: t("recommendations_1.sampleData.careers.softwareEngineer.description"),
              industry: t("recommendations_1.sampleData.careers.softwareEngineer.industry"),
              matchScore: 88,
              averageSalary: 800000,
              growthRate: t("recommendations_1.sampleData.careers.softwareEngineer.growthRate"),
            },
            {
              _id: "2",
              title: t("recommendations_1.sampleData.careers.charteredAccountant.title"),
              description: t("recommendations_1.sampleData.careers.charteredAccountant.description"),
              industry: t("recommendations_1.sampleData.careers.charteredAccountant.industry"),
              matchScore: 82,
              averageSalary: 900000,
              growthRate: t("recommendations_1.sampleData.careers.charteredAccountant.growthRate"),
            },
            {
              _id: "3",
              title: t("recommendations_1.sampleData.careers.civilServicesOfficer.title"),
              description: t("recommendations_1.sampleData.careers.civilServicesOfficer.description"),
              industry: t("recommendations_1.sampleData.careers.civilServicesOfficer.industry"),
              matchScore: 78,
              averageSalary: 700000,
              growthRate: t("recommendations_1.sampleData.careers.civilServicesOfficer.growthRate"),
            },
            {
              _id: "4",
              title: t("recommendations_1.sampleData.careers.graphicDesigner.title"),
              description: t("recommendations_1.sampleData.careers.graphicDesigner.description"),
              industry: t("recommendations_1.sampleData.careers.graphicDesigner.industry"),
              matchScore: 72,
              averageSalary: 400000,
              growthRate: t("recommendations_1.sampleData.careers.graphicDesigner.growthRate"),
            },
            {
              _id: "5",
              title: t("recommendations_1.sampleData.careers.doctor.title"),
              description: t("recommendations_1.sampleData.careers.doctor.description"),
              industry: t("recommendations_1.sampleData.careers.doctor.industry"),
              matchScore: 92,
              averageSalary: 1200000,
              growthRate: t("recommendations_1.sampleData.careers.doctor.growthRate"),
            },
            {
              _id: "6",
              title: t("recommendations_1.sampleData.careers.lawyer.title"),
              description: t("recommendations_1.sampleData.careers.lawyer.description"),
              industry: t("recommendations_1.sampleData.careers.lawyer.industry"),
              matchScore: 80,
              averageSalary: 1000000,
              growthRate: t("recommendations_1.sampleData.careers.lawyer.growthRate"),
            },
            {
              _id: "7",
              title: t("recommendations_1.sampleData.careers.entrepreneur.title"),
              description: t("recommendations_1.sampleData.careers.entrepreneur.description"),
              industry: t("recommendations_1.sampleData.careers.entrepreneur.industry"),
              matchScore: 76,
              averageSalary: 1500000,
              growthRate: t("recommendations_1.sampleData.careers.entrepreneur.growthRate"),
            },
            {
              _id: "8",
              title: t("recommendations_1.sampleData.careers.dataScientist.title"),
              description: t("recommendations_1.sampleData.careers.dataScientist.description"),
              industry: t("recommendations_1.sampleData.careers.dataScientist.industry"),
              matchScore: 89,
              averageSalary: 1400000,
              growthRate: t("recommendations_1.sampleData.careers.dataScientist.growthRate"),
            },
          ],
          content: [
            {
              _id: "1",
              title: t("recommendations_1.sampleData.content.jeeGuide.title"),
              description: t("recommendations_1.sampleData.content.jeeGuide.description"),
              type: t("recommendations_1.sampleData.content.jeeGuide.type"),
              rating: 4.5,
              duration: "2 hours",
              enrollments: 1500,
            },
            {
              _id: "2",
              title: t("recommendations_1.sampleData.content.commercePack.title"),
              description: t("recommendations_1.sampleData.content.commercePack.description"),
              type: t("recommendations_1.sampleData.content.commercePack.type"),
              rating: 4.2,
              duration: "3 hours",
              enrollments: 1200,
            },
            {
              _id: "3",
              title: t("recommendations_1.sampleData.content.upscGuide.title"),
              description: t("recommendations_1.sampleData.content.upscGuide.description"),
              type: t("recommendations_1.sampleData.content.upscGuide.type"),
              rating: 4.6,
              duration: "5 hours",
              enrollments: 2500,
            },
            {
              _id: "4",
              title: t("recommendations_1.sampleData.content.graphicDesignCourse.title"),
              description: t("recommendations_1.sampleData.content.graphicDesignCourse.description"),
              type: t("recommendations_1.sampleData.content.graphicDesignCourse.type"),
              rating: 4.3,
              duration: "6 hours",
              enrollments: 3000,
            },
            {
              _id: "5",
              title: t("recommendations_1.sampleData.content.neetCourse.title"),
              description: t("recommendations_1.sampleData.content.neetCourse.description"),
              type: t("recommendations_1.sampleData.content.neetCourse.type"),
              rating: 4.7,
              duration: "10 hours",
              enrollments: 3500,
            },
            {
              _id: "6",
              title: t("recommendations_1.sampleData.content.corporateLaw.title"),
              description: t("recommendations_1.sampleData.content.corporateLaw.description"),
              type: t("recommendations_1.sampleData.content.corporateLaw.type"),
              rating: 4.1,
              duration: "4 hours",
              enrollments: 1000,
            },
            {
              _id: "7",
              title: t("recommendations_1.sampleData.content.entrepreneurshipMaster.title"),
              description: t("recommendations_1.sampleData.content.entrepreneurshipMaster.description"),
              type: t("recommendations_1.sampleData.content.entrepreneurshipMaster.type"),
              rating: 4.8,
              duration: "3 hours",
              enrollments: 4000,
            },
            {
              _id: "8",
              title: t("recommendations_1.sampleData.content.dataScienceBootcamp.title"),
              description: t("recommendations_1.sampleData.content.dataScienceBootcamp.description"),
              type: t("recommendations_1.sampleData.content.dataScienceBootcamp.type"),
              rating: 4.9,
              duration: "15 hours",
              enrollments: 5000,
            },
          ],
        })
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      console.warn("Failed to load recommendations")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">{t("recommendations_1.loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("recommendations_1.title")}</h1>
          <p className="text-lg text-gray-600">{t("recommendations_1.subtitle")}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="streams" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {t("recommendations_1.tabs.streams")}
            </TabsTrigger>
            <TabsTrigger value="degrees" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t("recommendations_1.tabs.degrees")}
            </TabsTrigger>
            <TabsTrigger value="colleges" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              {t("recommendations_1.tabs.colleges")}
            </TabsTrigger>
            <TabsTrigger value="careers" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {t("recommendations_1.tabs.careers")}
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t("recommendations_1.tabs.content")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="streams">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.streams.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t("recommendations_1.streams.noRecommendations")}
                      </h3>
                      <p className="text-gray-600">{t("recommendations_1.streams.noRecommendationsDesc")}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.streams.map((stream) => (
                  <Card key={stream._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{stream.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {stream.matchScore}% {t("recommendations_1.streams.match")}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{stream.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{stream.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{t("recommendations_1.streams.studentsEnrolled")}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          <span>{t("recommendations_1.streams.jobGrowth")}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        {t("recommendations_1.streams.learnMore")}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="degrees">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.degrees.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t("recommendations_1.degrees.noRecommendations")}
                      </h3>
                      <p className="text-gray-600">{t("recommendations_1.degrees.noRecommendationsDesc")}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.degrees.map((degree) => (
                  <Card key={degree._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{degree.level}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {degree.matchScore}% {t("recommendations_1.degrees.match")}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{degree.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{degree.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            {degree.duration} {t("recommendations_1.degrees.years")}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <IndianRupee className="h-4 w-4 mr-2" />
                          <span>
                            ₹{degree.averageFee?.toLocaleString()} {t("recommendations_1.degrees.avgFee")}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        {t("recommendations_1.degrees.viewColleges")}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="colleges">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.colleges.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t("recommendations_1.colleges.noRecommendations")}
                      </h3>
                      <p className="text-gray-600">{t("recommendations_1.colleges.noRecommendationsDesc")}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.colleges.map((college) => (
                  <Card key={college._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{college.type}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{college.rating}/5</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{college.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {college.studentsCount} {t("recommendations_1.colleges.students")}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <IndianRupee className="h-4 w-4 mr-2" />
                          <span>
                            ₹{college.averageFee?.toLocaleString()} {t("recommendations_1.colleges.perYear")}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        {t("recommendations_1.colleges.viewDetails")}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="careers">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.careers.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t("recommendations_1.careers.noRecommendations")}
                      </h3>
                      <p className="text-gray-600">{t("recommendations_1.careers.noRecommendationsDesc")}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.careers.map((career) => (
                  <Card key={career._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{career.industry}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {career.matchScore}% {t("recommendations_1.careers.match")}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{career.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <IndianRupee className="h-4 w-4 mr-2" />
                          <span>
                            ₹{career.averageSalary?.toLocaleString()} {t("recommendations_1.careers.perYear")}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          <span>
                            {career.growthRate} {t("recommendations_1.careers.jobGrowth")}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        {t("recommendations_1.careers.exploreCareer")}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.content.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t("recommendations_1.content.noRecommendations")}
                      </h3>
                      <p className="text-gray-600">{t("recommendations_1.content.noRecommendationsDesc")}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.content.map((content) => (
                  <Card key={content._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">{content.type}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{content.rating}/5</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{content.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{content.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {content.enrollments} {t("recommendations_1.content.enrolled")}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        {t("recommendations_1.content.accessContent")}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ModernRecommendationsPage