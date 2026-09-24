import React from "react";
import { Toaster as Sonner } from "sonner";

// Removido next-themes para funcionar no Vite.
// Se quiser tema dark/light depois, posso adaptar com context ou useTheme custom.

const Toaster = ({ theme = "system", ...props }) => {
    return (
        <Sonner
            theme={theme}
            className="toaster group"
            style={{
                "--normal-bg": "var(--popover)",
                "--normal-text": "var(--popover-foreground)",
                "--normal-border": "var(--border)",
            }}
            {...props}
        />
    );
};

export { Toaster };