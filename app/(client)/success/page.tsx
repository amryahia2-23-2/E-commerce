import React, { Suspense } from 'react'
import SuccessContent from "@/components/SuccessContent"

function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20">Loading...</div>}>
            <SuccessContent />
        </Suspense>
  )
}

export default SuccessPage
