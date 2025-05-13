// Import the Header component to include a consistent site-wide header or navigation
import Header from "./Header";

// Import Outlet from react-router-dom to allow rendering of child route components
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Header />
      {/* 
        The <Outlet /> is a placeholder provided by React Router.
        It renders the matched child route's component inside this layout.
        
        For example:
          - If the route is "/", <IndexPage /> will render here.
          - If the route is "/login", <LoginPage /> will render here.
        
        This makes Layout reusable and keeps the UI structure (like the header) consistent.
      */}
      <Outlet />
    </main>
  );
}
