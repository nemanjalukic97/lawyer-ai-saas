"use client"

import { BookOpen, Scale } from "lucide-react"

import { RagSourcesPanel } from "@/components/RagSourcesPanel"
import { CaseLawSourcesPanel } from "@/components/CaseLawSourcesPanel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/LanguageProvider"
import type { RagMetadata } from "@/types/rag"

type Props = {
  ragData: RagMetadata
  showSimilarity?: boolean
}

export function LawCaseLawRagTabs({ ragData, showSimilarity }: Props) {
  const { t } = useLanguage()

  const lawCount = ragData.sources?.length ?? 0
  const caseCount = ragData.caseLawSources?.length ?? 0
  const showLawsTab = lawCount > 0
  const showCaseTab = caseCount > 0

  if (!showLawsTab && !showCaseTab) return null

  const defaultTab = lawCount > 0 ? "laws" : "caselaw"

  return (
    <Tabs
      key={`${lawCount}-${caseCount}`}
      defaultValue={defaultTab}
      className="mt-4 space-y-3"
    >
      <TabsList className="h-auto w-full flex-wrap justify-start gap-1">
        {showLawsTab ? (
          <TabsTrigger value="laws">
            <BookOpen className="mr-2 h-4 w-4" />
            {t("research.results.lawsTab")}
            {` (${lawCount})`}
          </TabsTrigger>
        ) : null}
        {showCaseTab ? (
          <TabsTrigger value="caselaw">
            <Scale className="mr-2 h-4 w-4" />
            {t("research.results.caseLawTab")}
            {` (${caseCount})`}
          </TabsTrigger>
        ) : null}
      </TabsList>
      {showLawsTab ? (
        <TabsContent value="laws">
          <RagSourcesPanel ragData={ragData} showSimilarity={showSimilarity} />
        </TabsContent>
      ) : null}
      {showCaseTab ? (
        <TabsContent value="caselaw">
          <CaseLawSourcesPanel
            sources={ragData.caseLawSources ?? []}
            confidence={ragData.caseLawConfidence}
            showSimilarity={showSimilarity}
          />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
