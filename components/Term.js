import React, { Fragment, useState, useEffect, useRef } from "react";

export default () => {
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState("");
  const codedate = new Date().getFullYear() - 2017;

  const data = {
    small: `dave@hitekredneck.io# vi about.sh
    !/bin/bash 
    
    echo I am Dave, a Network Enginner and Web Developer. 
    echo Click About in the menu to learn more!
    exit 0

    :wq
    dave@hitekredneck.io#  
    `,

    large: `dave@hitekredneck.io# vi about.sh
     !/bin/bash

     echo I am Dave, a Network Engineer and Web Developer. 
     echo I have been coding with Python and JavaScript(Node, React, CSS, HTML) for the last ${codedate}+ years. 
     echo Click About from the menu to learn more. \n 
     exit 0 
     :wq 
     dave@hitekredneck.io#  `,
  };
  const [input, setInput] = useState("");
  const index = useRef(0);

  useEffect(() => {
    const status = document.getElementById("Terminal");
    const width = document.getElementsByTagName("body");
    if (width[0].clientWidth <= 500) {
      setInput(data.small);
    } else {
      setInput(data.large);
    }

    if (status.classList.contains("active")) {
      setTimeout(() => setLoaded(true), 5000);
    }

    function type() {
      setText(prev => prev + input[index.current]);
      index.current++;
    }

    if (loaded && index.current < input.length) {
      let addChar = setInterval(type, 100);
      return () => clearInterval(addChar);
    }
  }, [text, loaded]);

  return (
    <Fragment>
      <span className="whitespace-pre-line text-term font-term text-lg md:text-xl lg:text-2xl">
        {text}
      </span>
      <span className="opacity-1 -mb-0.5 border-l-8 border-solid border-term animate-blinker h-3.5">
        &nbsp; &#32;
      </span>
    </Fragment>
  );
};
