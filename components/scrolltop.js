import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const [showScroll, setShowScroll] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div className=" fixed bottom-5 right-5 md:right-20">
      {showScroll && (
        <FontAwesomeIcon
          className="text-sb-med bg-sb-norm border-2 border-solid border-sb-dark rounded-full text-4xl md:text-5xl cursor-pointer"
          icon={faChevronCircleUp}
          title="Back to Top"
          onClick={scrollTop}
        />
      )}
    </div>
  );
};
