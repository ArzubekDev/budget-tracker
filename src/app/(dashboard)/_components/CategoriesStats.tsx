'use client'

import { UserSettings } from '@/generated/client'
import React from 'react'


interface Props {
    userSettings: UserSettings
    from: Date,
    to: Date
}
const CategoriesStats = ({userSettings, from, to}: Props) => {
  return (
    <div>CategoriesStats</div>
  )
}

export default CategoriesStats