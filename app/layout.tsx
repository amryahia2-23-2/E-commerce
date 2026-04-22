
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { SanityLive } from "@/sanity/lib/live"

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="font-poppins antialiased">
                {children}
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#000000",
                            color: "#fff"
                        }
                    }}

                />
                <SanityLive />
            </body>
        </html>
    )
}
export default RootLayout;