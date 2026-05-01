'use client'

import { UserSettings } from "@/generated/client";
import { startOfMonth } from "date-fns";
import { useState } from "react";


const Overview = ({userSettings}: {userSettings: UserSettings}) => {
    const [dateRange, setDateRange] = useState<{from: Date; to: Date}>({
        from: startOfMonth(new Date()),
        to: new Date()
    })
  return (
   <>
   </>
  );
};

export default Overview;