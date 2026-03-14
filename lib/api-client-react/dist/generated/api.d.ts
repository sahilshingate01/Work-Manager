import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { CreateWorkInput, DeleteResponse, HealthStatus, SummarizeInput, SummarizeResponse, UpdateWorkInput, Work } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get all work entries
 */
export declare const getGetWorksUrl: () => string;
export declare const getWorks: (options?: RequestInit) => Promise<Work[]>;
export declare const getGetWorksQueryKey: () => readonly ["/api/works"];
export declare const getGetWorksQueryOptions: <TData = Awaited<ReturnType<typeof getWorks>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorks>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWorks>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWorksQueryResult = NonNullable<Awaited<ReturnType<typeof getWorks>>>;
export type GetWorksQueryError = ErrorType<unknown>;
/**
 * @summary Get all work entries
 */
export declare function useGetWorks<TData = Awaited<ReturnType<typeof getWorks>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWorks>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a work entry
 */
export declare const getCreateWorkUrl: () => string;
export declare const createWork: (createWorkInput: CreateWorkInput, options?: RequestInit) => Promise<Work>;
export declare const getCreateWorkMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWork>>, TError, {
        data: BodyType<CreateWorkInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createWork>>, TError, {
    data: BodyType<CreateWorkInput>;
}, TContext>;
export type CreateWorkMutationResult = NonNullable<Awaited<ReturnType<typeof createWork>>>;
export type CreateWorkMutationBody = BodyType<CreateWorkInput>;
export type CreateWorkMutationError = ErrorType<unknown>;
/**
 * @summary Create a work entry
 */
export declare const useCreateWork: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createWork>>, TError, {
        data: BodyType<CreateWorkInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createWork>>, TError, {
    data: BodyType<CreateWorkInput>;
}, TContext>;
/**
 * @summary Get a single work entry
 */
export declare const getGetWorkUrl: (id: number) => string;
export declare const getWork: (id: number, options?: RequestInit) => Promise<Work>;
export declare const getGetWorkQueryKey: (id: number) => readonly [`/api/works/${number}`];
export declare const getGetWorkQueryOptions: <TData = Awaited<ReturnType<typeof getWork>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWork>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWork>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWorkQueryResult = NonNullable<Awaited<ReturnType<typeof getWork>>>;
export type GetWorkQueryError = ErrorType<void>;
/**
 * @summary Get a single work entry
 */
export declare function useGetWork<TData = Awaited<ReturnType<typeof getWork>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWork>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a work entry
 */
export declare const getUpdateWorkUrl: (id: number) => string;
export declare const updateWork: (id: number, updateWorkInput: UpdateWorkInput, options?: RequestInit) => Promise<Work>;
export declare const getUpdateWorkMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateWork>>, TError, {
        id: number;
        data: BodyType<UpdateWorkInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateWork>>, TError, {
    id: number;
    data: BodyType<UpdateWorkInput>;
}, TContext>;
export type UpdateWorkMutationResult = NonNullable<Awaited<ReturnType<typeof updateWork>>>;
export type UpdateWorkMutationBody = BodyType<UpdateWorkInput>;
export type UpdateWorkMutationError = ErrorType<void>;
/**
 * @summary Update a work entry
 */
export declare const useUpdateWork: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateWork>>, TError, {
        id: number;
        data: BodyType<UpdateWorkInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateWork>>, TError, {
    id: number;
    data: BodyType<UpdateWorkInput>;
}, TContext>;
/**
 * @summary Delete a work entry
 */
export declare const getDeleteWorkUrl: (id: number) => string;
export declare const deleteWork: (id: number, options?: RequestInit) => Promise<DeleteResponse>;
export declare const getDeleteWorkMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteWork>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteWork>>, TError, {
    id: number;
}, TContext>;
export type DeleteWorkMutationResult = NonNullable<Awaited<ReturnType<typeof deleteWork>>>;
export type DeleteWorkMutationError = ErrorType<void>;
/**
 * @summary Delete a work entry
 */
export declare const useDeleteWork: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteWork>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteWork>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Generate AI summary for work details
 */
export declare const getGenerateSummaryUrl: () => string;
export declare const generateSummary: (summarizeInput: SummarizeInput, options?: RequestInit) => Promise<SummarizeResponse>;
export declare const getGenerateSummaryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateSummary>>, TError, {
        data: BodyType<SummarizeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof generateSummary>>, TError, {
    data: BodyType<SummarizeInput>;
}, TContext>;
export type GenerateSummaryMutationResult = NonNullable<Awaited<ReturnType<typeof generateSummary>>>;
export type GenerateSummaryMutationBody = BodyType<SummarizeInput>;
export type GenerateSummaryMutationError = ErrorType<unknown>;
/**
 * @summary Generate AI summary for work details
 */
export declare const useGenerateSummary: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateSummary>>, TError, {
        data: BodyType<SummarizeInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof generateSummary>>, TError, {
    data: BodyType<SummarizeInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map