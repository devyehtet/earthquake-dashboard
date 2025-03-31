"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitImpactData } from "@/lib/impact-data-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Loader2, Lock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"
import { useAuth, UserRole } from "@/contexts/auth-context"
import Link from "next/link"

// Update the component to check for authentication
export function ImpactDataForm() {
  const { t, language } = useLanguage()
  const { user } = useAuth()

  // Check if user is logged in (not a guest)
  const isLoggedIn = user && user.role !== UserRole.GUEST

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    location: "",
    buildings: 0,
    roads: 0,
    affected: 0,
    lost: 0,
    infrastructure: 0,
    economic_loss: 0,
    relief_centers: 0,
    medical: 0,
    response_teams: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})
  const [activeTab, setActiveTab] = useState("basic")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Convert numeric fields to numbers
    if (name !== "date" && name !== "location") {
      setFormData({
        ...formData,
        [name]: Number.parseInt(value) || 0,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      setSubmitStatus({})

      const result = await submitImpactData(formData)

      if (result) {
        setSubmitStatus({
          success: true,
          message: t("form.success.message"),
        })

        // Reset form
        setFormData({
          date: new Date().toISOString().split("T")[0],
          location: "",
          buildings: 0,
          roads: 0,
          affected: 0,
          lost: 0,
          infrastructure: 0,
          economic_loss: 0,
          relief_centers: 0,
          medical: 0,
          response_teams: 0,
        })
      } else {
        setSubmitStatus({
          success: false,
          message: t("form.error.message"),
        })
      }
    } catch (error: any) {
      setSubmitStatus({
        success: false,
        message: error.message || t("form.error.message"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // If user is not logged in or is a guest, show login prompt
  // if (!user || user.role === UserRole.GUEST) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle className={language === "my" ? "myanmar-font" : ""}>{t("form.title")}</CardTitle>
  //         <CardDescription className={language === "my" ? "myanmar-font" : ""}>{t("form.description")}</CardDescription>
  //       </CardHeader>
  //       <CardContent className="space-y-4">
  //         <div className="flex flex-col items-center justify-center py-6 text-center">
  //           <div className="mb-4 rounded-full bg-muted p-3">
  //             <Lock className="h-6 w-6 text-muted-foreground" />
  //           </div>
  //           <h3 className="mb-1 text-lg font-medium">{t("auth.login_required")}</h3>
  //           <p className="mb-4 text-sm text-muted-foreground">{t("auth.submit_data_login")}</p>
  //           <Link href="/login">
  //             <Button>{t("auth.login")}</Button>
  //           </Link>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  // return (
  //   <Card>
  //     <CardHeader>
  //       <CardTitle className={language === "my" ? "myanmar-font" : ""}>{t("form.title")}</CardTitle>
  //       <CardDescription className={language === "my" ? "myanmar-font" : ""}>{t("form.description")}</CardDescription>
  //     </CardHeader>
  //     <form onSubmit={handleSubmit}>
  //       <CardContent className="space-y-4">
  //         <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
  //           <TabsList className="grid w-full grid-cols-3">
  //             <TabsTrigger value="basic" className={language === "my" ? "myanmar-font" : ""}>
  //               {t("form.tab.basic")}
  //             </TabsTrigger>
  //           <TabsTrigger value="damage" className={language === "my" ? "myanmar-font" : ""}>
  //               {t("form.tab.damage")}
  //             </TabsTrigger>
  //             <TabsTrigger value="response" className={language === "my" ? "myanmar-font" : ""}>
  //               {t("form.tab.response")}
  //             </TabsTrigger>
  //           </TabsList>

  //           <TabsContent value="basic" className="space-y-4 mt-4">
  //             <div className="space-y-2">
  //               <Label htmlFor="date" className={language === "my" ? "myanmar-font" : ""}>
  //                 {t("label.date")}
  //               </Label>
  //               <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="location" className={language === "my" ? "myanmar-font" : ""}>
  //                 {t("label.location")}
  //               </Label>
  //               <Input
  //                 id="location"
  //                 name="location"
  //                 placeholder="e.g., Yangon, Mandalay"
  //                 value={formData.location}
  //                 onChange={handleChange}
  //                 required
  //               />
  //             </div>

  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="affected" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.affected")}
  //                 </Label>
  //                 <Input
  //                   id="affected"
  //                   name="affected"
  //                   type="number"
  //                   min="0"
  //                   value={formData.affected}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="lost" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.lost")}
  //                 </Label>
  //                 <Input
  //                   id="lost"
  //                   name="lost"
  //                   type="number"
  //                   min="0"
  //                   value={formData.lost}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>
  //             </div>
  //           </TabsContent>

  //           <TabsContent value="damage" className="space-y-4 mt-4">
  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="buildings" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.buildings")}
  //                 </Label>
  //                 <Input
  //                   id="buildings"
  //                   name="buildings"
  //                   type="number"
  //                   min="0"
  //                   value={formData.buildings}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="roads" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.roads")}
  //                 </Label>
  //                 <Input
  //                   id="roads"
  //                   name="roads"
  //                   type="number"
  //                   min="0"
  //                   value={formData.roads}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>
  //             </div>

  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="infrastructure" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.infrastructure")}
  //                 </Label>
  //                 <Input
  //                   id="infrastructure"
  //                   name="infrastructure"
  //                   type="number"
  //                   min="0"
  //                   value={formData.infrastructure}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="economic_loss" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.economic")}
  //                 </Label>
  //                 <Input
  //                   id="economic_loss"
  //                   name="economic_loss"
  //                   type="number"
  //                   min="0"
  //                   value={formData.economic_loss}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="medical" className={language === "my" ? "myanmar-font" : ""}>
  //                 {t("label.medical")}
  //               </Label>
  //               <Input
  //                 id="medical"
  //                 name="medical"
  //                 type="number"
  //                 min="0"
  //                 value={formData.medical}
  //                 onChange={handleChange}
  //                 required
  //               />
  //             </div>
  //           </TabsContent>

  //           <TabsContent value="response" className="space-y-4 mt-4">
  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="space-y-2">
  //                 <Label htmlFor="relief_centers" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.relief")}
  //                 </Label>
  //                 <Input
  //                   id="relief_centers"
  //                   name="relief_centers"
  //                   type="number"
  //                   min="0"
  //                   value={formData.relief_centers}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>

  //               <div className="space-y-2">
  //                 <Label htmlFor="response_teams" className={language === "my" ? "myanmar-font" : ""}>
  //                   {t("label.response")}
  //                 </Label>
  //                 <Input
  //                   id="response_teams"
  //                   name="response_teams"
  //                   type="number"
  //                   min="0"
  //                   value={formData.response_teams}
  //                   onChange={handleChange}
  //                   required
  //                 />
  //               </div>
  //             </div>
  //           </TabsContent>
  //         </Tabs>

  //         {submitStatus.message && (
  //           <Alert variant={submitStatus.success ? "default" : "destructive"}>
  //             {submitStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
  //             <AlertTitle className={language === "my" ? "myanmar-font" : ""}>
  //               {submitStatus.success ? t("form.success") : t("form.error")}
  //             </AlertTitle>
  //             <AlertDescription className={language === "my" ? "myanmar-font" : ""}>
  //               {submitStatus.message}
  //             </AlertDescription>
  //           </Alert>
  //         )}
  //       </CardContent>
  //       <CardFooter>
  //         <Button type="submit" disabled={isSubmitting} className="w-full">
  //           {isSubmitting ? (
  //             <>
  //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //               <span className={language === "my" ? "myanmar-font" : ""}>{t("form.submitting")}</span>
  //             </>
  //           ) : (
  //             <span className={language === "my" ? "myanmar-font" : ""}>{t("form.submit")}</span>
  //           )}
  //         </Button>
  //       </CardFooter>
  //     </form>
  //   </Card>
  // )
  return (
    <Card>
      <CardHeader>
        <CardTitle className={language === "my" ? "myanmar-font" : ""}>{t("form.title")}</CardTitle>
        <CardDescription className={language === "my" ? "myanmar-font" : ""}>{t("form.description")}</CardDescription>
      </CardHeader>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic" className={language === "my" ? "myanmar-font" : ""}>
                  {t("form.tab.basic")}
                </TabsTrigger>
                <TabsTrigger value="damage" className={language === "my" ? "myanmar-font" : ""}>
                  {t("form.tab.damage")}
                </TabsTrigger>
                <TabsTrigger value="response" className={language === "my" ? "myanmar-font" : ""}>
                  {t("form.tab.response")}
                </TabsTrigger>
              </TabsList>

              {/* Rest of the tabs content remains the same */}
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className={language === "my" ? "myanmar-font" : ""}>
                    {t("label.date")}
                  </Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className={language === "my" ? "myanmar-font" : ""}>
                    {t("label.location")}
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Yangon, Mandalay"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="affected" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.affected")}
                    </Label>
                    <Input
                      id="affected"
                      name="affected"
                      type="number"
                      min="0"
                      value={formData.affected}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lost" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.lost")}
                    </Label>
                    <Input
                      id="lost"
                      name="lost"
                      type="number"
                      min="0"
                      value={formData.lost}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="damage" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buildings" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.buildings")}
                    </Label>
                    <Input
                      id="buildings"
                      name="buildings"
                      type="number"
                      min="0"
                      value={formData.buildings}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roads" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.roads")}
                    </Label>
                    <Input
                      id="roads"
                      name="roads"
                      type="number"
                      min="0"
                      value={formData.roads}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="infrastructure" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.infrastructure")}
                    </Label>
                    <Input
                      id="infrastructure"
                      name="infrastructure"
                      type="number"
                      min="0"
                      value={formData.infrastructure}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="economic_loss" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.economic")}
                    </Label>
                    <Input
                      id="economic_loss"
                      name="economic_loss"
                      type="number"
                      min="0"
                      value={formData.economic_loss}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical" className={language === "my" ? "myanmar-font" : ""}>
                    {t("label.medical")}
                  </Label>
                  <Input
                    id="medical"
                    name="medical"
                    type="number"
                    min="0"
                    value={formData.medical}
                    onChange={handleChange}
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value="response" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="relief_centers" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.relief")}
                    </Label>
                    <Input
                      id="relief_centers"
                      name="relief_centers"
                      type="number"
                      min="0"
                      value={formData.relief_centers}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response_teams" className={language === "my" ? "myanmar-font" : ""}>
                      {t("label.response")}
                    </Label>
                    <Input
                      id="response_teams"
                      name="response_teams"
                      type="number"
                      min="0"
                      value={formData.response_teams}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {submitStatus.message && (
              <Alert variant={submitStatus.success ? "default" : "destructive"}>
                {submitStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle className={language === "my" ? "myanmar-font" : ""}>
                  {submitStatus.success ? t("form.success") : t("form.error")}
                </AlertTitle>
                <AlertDescription className={language === "my" ? "myanmar-font" : ""}>
                  {submitStatus.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className={language === "my" ? "myanmar-font" : ""}>{t("form.submitting")}</span>
                </>
              ) : (
                <span className={language === "my" ? "myanmar-font" : ""}>{t("form.submit")}</span>
              )}
            </Button>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 rounded-full bg-muted p-3">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">{t("auth.login_required")}</h3>
          <p className="mb-6 text-sm text-muted-foreground">{t("auth.submit_data_login")}</p>
          <Link href="/login">
            <Button>{t("auth.login")}</Button>
          </Link>
        </CardContent>
      )}
    </Card>
  )
}

