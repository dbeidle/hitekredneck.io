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
          "This is a  personal website with Blog and Image gallery. Built with a MERN stack with a redis kicker. Dockerized MongoDB and Redis instances. It will always be a work in progress.",
        projectStack: [
          "Javascript",
          "React",
          "Redux",
          "NodeJS API",
          "MongoDB",
          "Redis",
          "Oauth2",
          "Material UI",
          "Docker",
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
          "This is a fully functional Web Store built completely in React with Google Firebase for Authentication and NOSQL Database. It is integrated into the Stripe API for mock credit card transactions using a test credit card number.",
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
          "This is a fun little application that utilizes the Clarifai API to pick out faces from pictures and put bounding boxes around them. It uses bcrypt and PostgreSQL for authentication and storage needs.",
        projectStack: [
          "Javascript",
          "React",
          "NodeJS",
          "Clarifai API",
          "PostgreSQL",
          "bcrypt",
        ],
      },
      {
        id: 5,
        projectName: "Hello World",
        projectImg: "/images/hello-world.png",
        projectLink: "https://hello-world.hitekredneck.io",
        project_gh_url: "https://github.com/dbeidle/hello_world",
        projectDescription:
          "Fun little Hello World app that has a YouTube video of Hello World by Lady Antebellum.",
        projectStack: ["Javascript", "Vue JS", "CSS", "Babel", "ES Lint"],
      },
    ]);
  }
  return res.status(404).send("Not Found");
}
