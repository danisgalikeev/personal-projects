import { Header } from "../components/Header.jsx";
import "./ErrorPage.css";

export function ErrorPage({cart}) {
    return (
        <>
            <Header cart={cart} />
            <main className="error-page">
                <div className="error-text">Page not found</div>
            </main>
        </>
    );
}
