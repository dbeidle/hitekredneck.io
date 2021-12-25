import React from "react";
import Image from "next/image";
import Link from "next/link";
import getJsonData from "../lib/getJsonData";
import { shimmer, toBase64 } from "../lib/blur";

export default function Projects({ projects }) {
  return (
    <section id="projects">
      <div className="grid grid-cols-1 gap-4 mt-20 md:my-auto">
        {projects &&
          projects.map(item => (
            <ProjectListItem key={item.projectName} {...item} />
          ))}
      </div>
    </section>
  );
}

function ProjectStack({ projectStackItem }) {
  return (
    <span className="border-sb-dark border-2 m-1 p-1 rounded-xl hover:transition hover:bg-white hover:ease-in-out hover:duration-700">
      {projectStackItem}
    </span>
  );
}

function ProjectListItem({
  id,
  projectName,
  projectImg,
  projectLink,
  projectDescription,
  projectStack,
}) {
  return (
    <div className="border text-sb-dark bg-sb-light border-sb-dark shadow hover:shadow-md rounded-md p-4 md:w-5/6 m-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 ">
        <Link href={projectLink}>
          <a>
            <span className="font-bold text-lg mt-5 border-b-4 border-sb-dark pb-2">
              {projectName}
            </span>
            <div className=" pt-4 block border-b-4 border-sb-dark md:border-b-0 pb-4">
              {projectImg && (
                <div className="border-4 rounded-md border-sb-dark hover:animate-greyscale">
                  <Image
                    src={projectImg}
                    alt={projectName}
                    width="75%"
                    height="50%"
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer("100%", "75%")
                    )}`}
                  />
                </div>
              )}
            </div>
          </a>
        </Link>
        <div className="pt-4  md:flex-block justify-center m-auto md:col-span-2 md:w-2/3">
          <div className="border-sb-dark border-b-4 pb-4">
            <span className="text-md font-semibold">Description:</span>
            <br />
            {projectDescription}
          </div>
          <div>
            <p className="mt-2 text-lg font-medium pb-2">Tech Stack:</p>
          </div>
          <div className=" mx-2 flex flex-wrap ">
            {projectStack &&
              projectStack.map(stack_item => (
                <ProjectStack
                  key={projectName + "_" + stack_item}
                  projectStackItem={stack_item}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getJsonData();
  const data = await res;

  // Pass data to the page via props
  return { props: { projects: data } };
}
