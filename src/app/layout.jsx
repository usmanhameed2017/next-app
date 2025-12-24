import './globals.css';
import { ToastContainer } from "react-toastify";

export const metadata = {
    title:"Practice Project"
};

export default function RootLayout({ children })
{
    return(
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Bootstrap CDN */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" 
                rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" 
                crossOrigin="anonymous">
                </link>
            </head>
            <body>
              { children }
              <ToastContainer />
            </body>
        </html>
    );
}