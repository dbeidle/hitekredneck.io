import Footer from "./footer";
import NavBar from "./navbar";
import ScrollTop from "./scrolltop";

export default function Layout({ children }) {
  return (
    <div className="flex w-screen min-h-screen flex-col" id="parent">
      <NavBar />
      <div className="flex-grow">{children}</div>
      <ScrollTop />

      <Footer />
    </div>
  );
}
