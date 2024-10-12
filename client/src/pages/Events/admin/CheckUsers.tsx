import { useState, useEffect } from "react";
import Verified from "../../../images/verifiedAnimation.gif"
import Mistake from "../../../images/mistake-5026_256.gif"
import DontAllow from "../../../images/sign.png"
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
function CheckUsers() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [data1,setData1] = useState<any>("");
  const [eventname, setEventname] = useState<string>("");
  const [loading,setLoading] = useState(false);
  const [button,showButton] = useState(true);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      true
    );
    scanner.render(success, error);
    function success(result: string) {
      scanner.clear();
      setScanResult(result);
    }

    function error(erro: any) {
      console.warn(erro);
    }
    return () => {
      scanner.clear();
    };
  }, []);
  async function handleAllow(result: string) {
    setLoading(true);
    let posted = { order_id: result };
    let res = await axios.put(
      `${process.env.REACT_APP_BACK_URL}/registration/register`,
      posted
    );
    setMsg(res.data.message);
    setData(res.data.payload.name);
    setEventname(res.data.payload.event);
    setData1(res.data.payload);
    showButton(false);
    setLoading(false);
  }
  if(loading) return <p className="text-center block mx-auto">Loading...</p>
  return (
    <div className="">
      {scanResult ? (
        <div>
          <div className="flex justify-center mt-9">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAllow(scanResult)}
              type="submit"
            >
              Check
            </button>
          </div>
          <p className="text-center mt-9">{msg} </p>
          {
            msg==="Allow To Workshop" ? <img src={Verified} alt="Verified" className="block mx-auto"/> : (
              msg==="Already Scanned Dont Allow to Workshop" ? <img src={DontAllow} alt="Already Scanned" /> : <img src={Mistake} alt="Invalid QR" />
            ) 
          }
          <p className="block text-center mt-4">{data}  {data1.rollno}</p>
          <p className="block text-center mt-4">{eventname}</p>
        </div>
      ) : (
        <div id="reader" style={{marginTop:"200px"}}></div>
      )}
    </div>
  );
}

export default CheckUsers;
