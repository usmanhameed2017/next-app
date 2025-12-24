import Footer from "@/components/Footer";
import NavbarBS from "@/components/NavbarBS";

export const metadata = {
    title:"Practice Project"
};

export default function MarketingLayout({ children })
{
    return(
        <>
            <NavbarBS />
            { children } 
            {/* <Footer />          */}
        </>
    );
}