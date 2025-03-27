import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../../api/src/trpc";

export const { TRPCProvider, useTRPC, useTRPCClient } =
	createTRPCContext<AppRouter>();
