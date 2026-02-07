import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );
};

export default Loading;
