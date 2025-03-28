import { UserButton } from "@daveyplate/better-auth-ui";
import { Link, useLocation } from "@tanstack/react-router";
import {
	Home,
	LayoutDashboard,
	type LucideIcon,
	PanelLeftClose,
	PanelLeftOpen,
	Plus,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Tooltip } from "./ui/tooltip";

type SidebarItemProps = {
	Icon: LucideIcon;
	label: string;
	href: string;
};

export function Sidebar() {
	const { pathname } = useLocation();
	const [isExpanded, setIsExpanded] = useState(true);

	function SidebarItem({ Icon, label, href }: SidebarItemProps) {
		return (
			<Tooltip defaultOpen={false}>
				<TooltipTrigger asChild>
					<Link
						className="flex items-center gap-2 bg-muted p-1.5 rounded-md ring-1 ring-muted-foreground/30 justify-start w-full"
						to={href}
					>
						<Icon className="size-3" />
						<span
							className={cn(
								"text-xs transition-opacity duration-200",
								!isExpanded && "opacity-0",
							)}
						>
							{label}
						</span>
					</Link>
				</TooltipTrigger>
				<TooltipContent side="right" hidden={isExpanded}>
					<p>{label}</p>
				</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<nav
			className={cn(
				"relative flex flex-col items-start gap-1 transition-all duration-300 p-3",
				isExpanded ? "w-64" : "w-16",
			)}
		>
			<div className="pointer-events-auto fixed left-3 top-2 z-50 flex flex-row gap-0.5 p-1">
				<Button
					type="button"
					variant="ghost"
					onClick={() => setIsExpanded(!isExpanded)}
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-muted/40 hover:text-foreground z-10 h-8 w-8 text-muted-foreground"
					aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
				>
					{isExpanded ? (
						<PanelLeftClose className="h-5 w-5" />
					) : (
						<PanelLeftOpen className="h-5 w-5" />
					)}
				</Button>
			</div>

			<h1
				className={cn(
					"select-none self-center flex h-8 shrink-0 items-center text-sm justify-center font-semibold text-foreground transition-opacity duration-200 whitespace-nowrap overflow-hidden",
					isExpanded ? "opacity-100" : "opacity-0",
				)}
			>
				Social Relay
			</h1>

			<Tooltip defaultOpen={false}>
				<TooltipTrigger asChild>
					<Button
						variant="default"
						className={cn("self-center my-5", isExpanded ? "w-[70%]" : "w-10")}
					>
						<Plus />
						<span
							className={cn(
								"transition-opacity duration-200",
								isExpanded ? "opacity-100" : "opacity-0 hidden",
							)}
						>
							New Post
						</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right" hidden={isExpanded}>
					<p>New Post</p>
				</TooltipContent>
			</Tooltip>

			<SidebarItem Icon={Home} label="Home" href="/" />
			<SidebarItem Icon={Home} label="Dashboard" href="/dashboard" />

			<div className="m-auto mb-0">
				<UserButton
					size={isExpanded ? "full" : "icon"}
					className="cursor-pointer"
					disableDefaultLinks
				/>
			</div>
		</nav>
	);
}
