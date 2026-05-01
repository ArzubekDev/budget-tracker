import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/routes";
import { UserSettings } from "@/generated/client";
import { useQuery } from "@tanstack/react-query";

interface Props {
    from: Date,
    to: Date,
    userSettings: UserSettings
}

const StatsCards = ({from, to, userSettings}: Props) => {
    const statsQuery = useQuery<GetBalanceStatsResponseType>({
        queryKey: ["overview", "stats", from, to]
    })
  return (
    <>
    </>
  );
};

export default StatsCards;