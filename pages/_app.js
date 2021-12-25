import "tailwindcss/tailwind.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import "prism-themes/themes/prism-vsc-dark-plus.css"; // Required for code highlighting in code blocks
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="w-full h-full m-auto mt-20 flex-grow mb-5">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
