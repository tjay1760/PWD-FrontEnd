import React from 'react'
import CalendarView from './CalendarView'
import { BookAssessmentForm } from './PWD_Assesment_Form'
const PWDAssesmentsPage = () => {
  return (
    <div>
        <div className="flex p-6 gap-6">
            <BookAssessmentForm />
            <CalendarView />
        </div>
    </div>
  )
}

export default PWDAssesmentsPage