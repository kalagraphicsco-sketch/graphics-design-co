import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import type {
  Category,
  PortfolioItem,
  Service,
  TeamMember,
  Testimonial,
} from "../backend.d";
import { useActor } from "./useActor";

export { ExternalBlob };

export function useGetPortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTeamMembers() {
  const { actor, isFetching } = useActor();
  return useQuery<TeamMember[]>({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      title,
      category,
      description,
      imageBlob,
      featured,
    }: {
      id: string;
      title: string;
      category: Category;
      description: string;
      imageBlob: ExternalBlob;
      featured: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.addPortfolioItem(
        id,
        title,
        category,
        description,
        imageBlob,
        featured,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] }),
  });
}

export function useUpdatePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      title,
      category,
      description,
      imageBlob,
      featured,
    }: {
      id: string;
      title: string;
      category: Category;
      description: string;
      imageBlob: ExternalBlob;
      featured: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.updatePortfolioItem(
        id,
        title,
        category,
        description,
        imageBlob,
        featured,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] }),
  });
}

export function useDeletePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.deletePortfolioItem(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["portfolioItems"] }),
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message,
    }: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(name, email, subject, message);
    },
  });
}
