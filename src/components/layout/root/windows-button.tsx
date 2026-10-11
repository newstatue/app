import {cn} from "@/lib/utils.ts";

type WindowButtonType = "normal" | "close";

export function WindowButton({children, onClick, type = "normal"}: {
    children: React.ReactNode;
    onClick: () => void;
    type?: WindowButtonType
}) {
    return (
        <button
            className={cn(
                "flex h-full w-12 items-center justify-center",
                "transition-colors duration-150",
                "hover:bg-black/5",
                type === "close" && "hover:bg-red-500 hover:text-white"
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}