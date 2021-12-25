import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default props => {
  const { info, buttonClick } = props;

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const Icon = info => {
    if (info.type === "error") {
      return <FontAwesomeIcon icon={faExclamationTriangle} />;
    } else {
      return <FontAwesomeIcon icon={faCheck} />;
    }
  };
  if (isBrowser) {
    console.log(info.type);
    return ReactDOM.createPortal(
      <div
        className="fixed insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="modal">
        <div className="relative top-20 mx-auto p-5 border border-sb-light w-96 shadow-lg rounded-md bg-sb-norm">
          <div className="mt-3 text-center">
            {info.type === "error" ? (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500 border-sb-dark border-2">
                <Icon type={info.type} />
              </div>
            ) : (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500 border-sb-dark border-2">
                <Icon type={info.type} />
              </div>
            )}

            <h3 className="text-lg leading-6 font-medium text-sb-light">
              {info.head}
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-sb-light whitespace-pre">
                {info.text}
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={buttonClick}
                className="px-4 py-2 bg-sb-dark ring-1 ring-sb-med text-white 
                      text-base font-medium rounded-md w-full 
                      shadow-sm hover:bg-sb-light hover:ring-sb-dark hover:text-sb-norm focus:outline-none focus:ring-2 focus:ring-sb-dark">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("parent")
    );
  } else {
    return null;
  }
};
