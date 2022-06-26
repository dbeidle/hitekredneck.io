export default function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    res.status(200).json([
      {
        id: 1,
        projectName: "DriveLikeYaStoleIt.com",
        projectImg: "/images/dlysi.png",
        projectLink: "https://drivelikeyastoleit.com",
        project_gh_url: null,
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
          "Material UI",
        ],
      },
      {
        id: 2,
        projectName: "Placeholder",
        projectImg: "/images/placeholder.png",
        projectLink: "https://placeholder.hitekredneck.io/docs",
        project_gh_url: "https://github.com/dbeidle/image_placeholder",
        projectDescription:
          "I needed some placeholder images for another project so I built this App to return an image when fetched.",
        projectStack: ["Python 3", "FastAPI", "Uvicorn", "Pillow"],
      },
      {
        id: 3,
        projectName: "Crown Clothing",
        projectImg: "/images/crwn.png",
        projectLink: "https://crwn.drivelikeyastoleit.com",
        project_gh_url: "https://github.com/dbeidle/crwn-clothing",
        projectDescription:
          "This site was based on a course I took. It's a very thorough example that I first learned React on. This is a fully functional store with Stripe API integration for payments using a test Credit Card Number. ",
        projectStack: [
          "Javascript",
          "React",
          "Redux",
          "ReduxSaga",
          "Google Firebase",
          "Sass",
          "Stripe API",
          "Google Oauth2",
          "Jest",
          "Enzyme",
        ],
      },
      {
        id: 4,
        projectName: "Face Recognition",
        projectImg: "/images/faces.png",
        projectLink: "https://faces.drivelikeyastoleit.com",
        project_gh_url: "https://github.com/dbeidle/face-recognition",
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
        id: 5,
        projectName: "Hello World",
        projectImg: "/images/hello-world.png",
        projectLink: "https://hello-world.hitekredneck.io",
        project_gh_url: "https://github.com/dbeidle/hello_world",
        projectDescription:
          "Fun little Hello World app that has a YouTube video of Hello World by Lady Antebellum",
        projectStack: ["Javascript", "Vue JS", "CSS", "Babel", "ES Lint"],
      },
    ]);
  }
  return res.status(404).send("Not Found");
}
