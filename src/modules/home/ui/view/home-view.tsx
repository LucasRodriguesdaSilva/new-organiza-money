"use client";

import { Button } from "@/components/ui/button";

export const HomeView = () => {


    return (
        <div className="flex flex-col p-4 gap-y-4">
            <p>Logged In as </p>
            <Button>
                Sign out
            </Button>
        </div>
    )
}
