export default function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    res.status(200).json([
      {
        id: 1,
        projectName: "New HiTekRedneck.io",
        projectImg: "/images/htrn.png",
        projectLink: "https://hitekredneck.io",
        projectDescription:
          "The site you are currently viewing. Re-designed and re-written with NextJS and Tailwind CSS. I added a Tech Blog to the site. Continuously evolving as I find new ideas to refresh the site..",
        projectStack: ["Javascript", "React", "NextJS", "TailwindCSS"],
      },
      {
        id: 2,
        projectName: "Old HiTekRedneck.io",
        projectImg: "/images/hello-world.png",
        projectLink: "https://bs.hitekredneck.io",
        projectDescription:
          "This was my original portfolio site made with a static Bootstrap templated site.",
        projectStack: ["HTML", "Bootstrap 5"],
      },
      {
        id: 3,
        projectName: "DriveLikeYaStoleIt.com",
        projectImg: "/images/dlysi.png",
        projectLink: "https://drivelikeyastoleit.com",
        projectDescription:
          "This is my first solo project. A personal website with Blog and Image gallery. Built with a MERN stack with a redis kicker. Dockerized MongoDB and Redis instances. Always will be a work in progress.",
        projectStack: [
          "Javascript",
          "React",
          "Redux",
          "NodeJS API",
          "MongoDB",
          "Redis",
          "Oauth2",
        ],
      },
      {
        id: 4,
        projectName: "Crown Clothing",
        projectImg: "/images/crwn.png",
        projectLink: "https://crwn.drivelikeyastoleit.com",
        projectDescription:
          "This site was based on a course I took. It's a very thorough example that I first learned React on. This is a fully functional store with Stripe API integration for payments using a test Credit Card Number. ",
        projectStack: [
          "Javascript",
          "React",
          "Redux",
          "ReduxSaga",
          "Firebase",
          "Sass",
          "Stripe API",
          "Google Oauth2",
        ],
      },
      {
        id: 5,
        projectName: "Face Recognition",
        projectImg: "/images/faces.png",
        projectLink: "https://faces.drivelikeyastoleit.com",
        projectDescription:
          "Application that will pick out faces in a picture and put a box around them",
        projectStack: [
          "Javascript",
          "React",
          "NodeJS",
          "Clarifai API",
          "PostgreSQL",
        ],
      },
      {
        id: 6,
        projectName: "Hello World",
        projectImg: "/images/hello-world.png",
        projectLink: "https://hello-world.hitekredneck.io",
        projectDescription:
          "Fun little Hello World app that has a YouTube video of Hello World by Lady Antebellum",
        projectStack: ["Javascript", "Vue JS", "CSS", "Babel", "ES Lint"],
      },
    ]);
  }
  return res.status(404).send("Not Found");
}
