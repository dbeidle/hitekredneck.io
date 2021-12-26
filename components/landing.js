import Head from "next/head";
import Term from "./Term";
import { MacTerminal } from "react-window-ui";
export default function Landing() {
  return (
    <div
      className=" block m-auto w-5/6 md:w-4/5 lg:3/5 xl:w-1/2 h-1/2 active"
      id="Terminal">
      <Head>
        <title>HiTekRedneck Home</title>
      </Head>
      <MacTerminal
        className="text-left w-full h-full m-auto p-5"
        topbarTitle="hitekredneck.io"
        topbarTitleColor="#fff"
        topbarColor="rgba(45, 45, 45,.9)"
        border="0.2rem solid rgba(45, 45, 45,.9)">
        <Term />
      </MacTerminal>
    </div>
  );
}
