"use client"; // If using client-side features like state for the modal
import { AuthDialog } from "@/components/AuthDialog";
import Providers from "@/components/Provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    router.back(); // Close the modal by navigating back
    setOpen(false)
  };

  return (
    // <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
    //   <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
    //     <h2>Sign In Dialog</h2>
    //     {/* Your sign-in form here */}
    //     <button onClick={handleClose} cur>Close</button>
    //   </div>
    // </div>
    <Providers>
      <AuthDialog open={true} onOpenChange={handleClose} onSuccess={(user) => console.log(user)} />
    </Providers>
  );
}
