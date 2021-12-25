export default () => {
  const techdate = new Date().getFullYear() - 2005;
  const codedate = new Date().getFullYear() - 2017;
  const indent = { textIndent: "1rem" };
  return (
    <div className="sm:grid sm:grid-cols-2 sm:gap-8 justify-items-center items-center mx-20 mt-32">
      <div className="pb-3 md:pb-0">
        <img
          className="border-2 border-solid rounded-full border-sb-med m-auto w-3/4 h-auto grayscale hover:grayscale-0"
          src="/images/headshot.png"
          alt="Dave"
        />
      </div>
      <div className="text-left m-auto w-4/5 sm:w-auto">
        <h2
          className="text-xl sm:text-2xl sm:px-auto sm:py-5 text-sb-med"
          style={indent}>
          <em>Who am I you ask?</em>
        </h2>
        <p className=" text-sm sm:text-base py-2 sm:py-5" style={indent}>
          I'm Dave and I have been working in Networking for the past {techdate}{" "}
          years. I have been coding with Python, NodeJS, and ReactJS for{" "}
          {codedate} years. I have written HTML since the mid 1990's. I have a
          passion for coding and it brings me peace and tranquility while
          working on projects.
        </p>
        <p className="text-sm sm:text-base py-2 sm:py-5" style={indent}>
          I enjoy photography. I am an automotive junkie. I love anything with
          wheels. I try to go to as many car shows as possible in my free time.
          I also enjoy rail-fanning with my father. I am currently working on a
          10+ year project of restoring a 1949 Chevy Truck. It has been in the
          family for well over 30 years.{" "}
        </p>
      </div>
    </div>
  );
};
