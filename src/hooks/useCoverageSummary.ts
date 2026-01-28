import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useCoverageSummary() {
  return useQuery({
    queryKey: ["coverage-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coverage_summary")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });
}
