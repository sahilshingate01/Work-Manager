import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetWorks, 
  useCreateWork, 
  useUpdateWork, 
  useDeleteWork, 
  useGenerateSummary,
  getGetWorksQueryKey
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

// Wrappers around the generated hooks to handle cache invalidation and toasts

export function useWorksList() {
  return useGetWorks();
}

export function useCreateWorkMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useCreateWork({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetWorksQueryKey() });
        toast({
          title: "Work Created",
          description: "Your daily work has been logged successfully.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to create work entry.",
          variant: "destructive",
        });
      }
    }
  });
}

export function useUpdateWorkMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useUpdateWork({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetWorksQueryKey() });
        toast({
          title: "Work Updated",
          description: "Your changes have been saved.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to update work entry.",
          variant: "destructive",
        });
      }
    }
  });
}

export function useDeleteWorkMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useDeleteWork({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetWorksQueryKey() });
        toast({
          title: "Work Deleted",
          description: "The work entry has been removed.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to delete work entry.",
          variant: "destructive",
        });
      }
    }
  });
}

export function useAiSummaryMutation() {
  const { toast } = useToast();
  return useGenerateSummary({
    mutation: {
      onError: (error: any) => {
        toast({
          title: "AI Generation Failed",
          description: error.message || "Could not generate summary.",
          variant: "destructive",
        });
      }
    }
  });
}
