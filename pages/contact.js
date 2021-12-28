import { useState, useRef } from "react";
import Head from "next/head";
import Modal from "../components/modal";
import ReCAPTCHA from "react-google-recaptcha";
import getCaptchaResults from "../lib/getCaptchaResults";

export default () => {
  const [note, setNote] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [modal, setModal] = useState(null);
  const [valid, setValid] = useState(false);
  const recaptchaRef = useRef();

  const URL =
    process.env.NODE_ENV === "development"
      ? "localhost:8080"
      : "localhost:5600";

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setNote(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // Validate there name input is only letters.
  const validateName = name => {
    const re = /^[A-Z][a-z]*\b\s[A-Z][a-z]*$/;
    return re.test(name);
  };

  // Validate the Email address is in a valid format.
  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  // Validate the message length is greater than 0 to keep from sending an empty form.
  const validateNote = note => {
    return note.length > 0;
  };

  // Call the reCaptcha verification script.
  const checkCaptcha = async ({ response_key }) => {
    console.log("firing check captcha");
    // check response key is provided
    if (response_key === null) {
      // return falise if no response key
      return false;
    } else {
      const res = await getCaptchaResults(response_key);
      // Return true of status is 200 OK else return false.
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    }
  };
  const sendMail = async props => {
    console.log(props);
    const res = await fetch("http://localhost:5600/api/sendmail", {
      method: "post",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status;
  };

  const validateCaptcha = async () => {
    const token = await recaptchaRef.current.getValue();

    console.log("token", token);
    // Kick off the reCaptcha
    const a = await checkCaptcha({ response_key: token });
    setValid(a);
  };

  // Handle when the "Send" button is clicked.
  const handleSubmit = async e => {
    e.preventDefault();
    recaptchaRef.current.reset();

    const { name, email, content } = note;
    const msg = [];
    // Validate the name is valid and not empty
    if (!validateName(name)) {
      msg = [...msg, "Name"];
    }
    // Validate the email is a valid e-mail
    if (!validateEmail(email)) {
      msg = [...msg, "Email address"];
    }
    // Validate the message body is not empty
    if (!validateNote(content)) {
      msg = [...msg, "Message body"];
    }
    // Validate reCaptcha
    if (!valid) {
      msg = [...msg, "reCaptcha Response"];
    }
    // If msg is not empty, this means there an error has occurred show the error modal.
    if (msg.length !== 0) {
      setModal({
        type: "error",
        head: "All fields required",
        text: `Invalid ${msg.join().replaceAll(",", ", ")}.`,
      });
      // Return Early to keep stop any further processing
      return;
    } else {
      //TODO: Finish Sendmail functionality
      // Form is submitted and passed to the mail message
      const mail = await sendMail({ note, valid }).then(resp => resp);
      // If response from mail is 200 status code then return success Modal.
      if (mail === 200) {
        setModal({
          type: "success",
          head: "Success",
          text: "Your message was successfully sent. \n You will receive a copy in your inbox. \n Please check your junk/spam folder if not seen.",
        });

        // setNote({ name: "", email: "", content: "" });
      } else {
        // If not 200 status code, Call Error modal.
        setModal({
          type: "error",
          head: "Server Error",
          text: "Internal server error, Please try again later.",
        });
      }
    }
  };

  const dismissModal = () => {
    // if (modal.type === "success") {
    //   router.push("/");
    // }
    setModal(null);
    setNote({ name: "", email: "", content: "" });
    setValid(false);
  };

  // Handles when the clear button is clicked before submitting the data.
  const handleClear = e => {
    e.preventDefault();
    setNote({ name: "", email: "", content: "" });
  };

  return (
    <div>
      <div>
        {" "}
        {modal ? (
          <Modal info={modal} buttonClick={() => dismissModal()} />
        ) : null}
      </div>
      <div className=" w-3/4 lg:w-1/2 h-full overflow-scroll m-auto text-sb-norm border-sb-dark border-solid border-2 rounded-lg bg-sb-light shadow-2xl shadow-black p-3 mt-20 ">
        <Head>
          <title>Contact Me</title>
        </Head>

        <div className="m-auto items-center w-5/6 mb-4 ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-2 uppercase font-semibold text-lg ">
                Name:
              </label>
              <input
                className=" border-2 border-sb-dark py-2 px-3 "
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={note.name}
                type="text"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 uppercase font-semibold text-lg">
                E-mail:
              </label>
              <input
                className="border-2 border-sb-dark border-red py-2 px-3 "
                name="email"
                placeholder="Your Email Address"
                onChange={handleChange}
                value={note.email}
                type="email"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 uppercase font-semibold text-lg">
                Message:
              </label>
              <textarea
                className=" border-2 border-sb-dark py-2 px-3 md:h-60 resize-none overflow-scroll"
                name="content"
                placeholder="Write me a note..."
                onChange={handleChange}
                value={note.content}
              />
            </div>
            <div className="flex w-full m-auto justify-between pb-4">
              <button
                className=" disabled inline bg-sb-norm text-sb-light shadow-black shadow-lg border-2 border-sb-dark hover:ring-2 hover:ring-sb-dark hover:bg-sb-med hover:text-sb-dark p-2 rounded-xl"
                onClick={handleSubmit}>
                Send
              </button>
              <button
                className="inline bg-sb-norm text-sb-light shadow-black shadow-lg border-2 border-sb-dark hover:ring-2 hover:ring-sb-dark hover:bg-sb-med hover:text-sb-dark p-2 rounded-xl"
                onClick={handleClear}>
                Clear
              </button>
            </div>
            <div className="flex w-full m-auto justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                size="normal"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC}
                onChange={() => validateCaptcha()}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
