import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste, faArrowDown } from "@fortawesome/free-solid-svg-icons";
//
import { Button, Modal } from "antd";
//
import giftIm from "./assets/done.gif";
import loadingImg from "./assets/loading.gif";

function App() {
  const [urlVideo, setUrlVideo] = useState("");
  const [urlVideo_Done, setUrlVideoDone] = useState("");

  const [isDownloadDone, setDownloadDone] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const changeUrl = (e) => {
    console.log(e.target.value);
    setUrlVideo(e.target.value);
  };

  const pasteFunction = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrlVideo(clipboardText);
      console.log("Pasted text:", clipboardText);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const callFireBaseFunction = async (url) => {
    const apiUrl = `/api/helloWorld?url=${encodeURIComponent(url)}`;
    console.log("Calling API URL:", apiUrl); // In ra đường dẫn API
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Đọc phản hồi dưới dạng văn bản
      const text = await response.text();
      console.log("Response Text:", text);

      // Trích xuất URL video từ phản hồi
      const urlMatch = text.match(/Found HD Video URL: (https:\/\/[^\s]+)/);
      if (urlMatch && urlMatch[1]) {
        const videoUrl = urlMatch[1];
        // console.log("Extracted Video URL:", videoUrl);
        setUrlVideoDone(videoUrl);
        setDownloadDone(true);
        showLoading();
      } else {
        setDownloadDone(false);
        console.error("Failed to extract video URL from response.");
      }
    } catch (error) {
      setDownloadDone(false);
      console.error("Error calling function:", error);
    }
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const downLoad = async () => {
    if (urlVideo) {
      setDownloadDone(true);
      const urlback = await callFireBaseFunction(urlVideo);
      console.log("Done", urlback);
      setDownloadDone(false);
    } else {
      console.log("error");
      setDownloadDone(false);
    }
  };

  const saveBtn = async () => {
    window.open(urlVideo_Done, "_blank");
  };

  return (
    <div className="App">
      <header className="header-con">
        <div>
          <h4>Download</h4>
        </div>
        <div>
          <span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr9i8xsQEbVRQ8LpcyhGTj1E7Rc_FZhFGFBA&s"
              style={{
                width: "60px",
                height: "60px",
              }}
              alt="logo"
            />
          </span>
        </div>
      </header>
      <div className="div-container">
        <div className="top-container">
          <div className="text-con">
            <h1 className="text">TikTok Video Download</h1>
            <h2 className="text">Without Watermark. Fast. All devices</h2>
          </div>
          <div className="input-group">
            <div className="sup-div">
              <input
                type="text"
                className="form-control"
                aria-label="Paste TikTok link here"
                placeholder="Paste TikTok link here"
                onChange={(e) => changeUrl(e)}
                value={urlVideo}
              ></input>
              <div
                className="input-group-append"
                onClick={() => pasteFunction()}
              >
                <FontAwesomeIcon
                  style={{ width: 25, height: 25, color: "#1129ee" }}
                  width={30}
                  height={30}
                  icon={faPaste}
                />
                Paste
              </div>
            </div>
            <button
              className="btn btn-down"
              disabled={isDownloadDone}
              onClick={() => downLoad()}
            >
              <FontAwesomeIcon
                style={{ width: 18, height: 18, color: "#fff" }}
                icon={faArrowDown}
              />
              {!isDownloadDone ? (
                "Download"
              ) : (
                <>
                  <img
                    style={{
                      height: "40px",
                    }}
                    src={loadingImg}
                    alt="loading ..."
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <Modal
        title={<p>LoadedVideo</p>}
        footer={
          <>
            <Button type="primary" onClick={() => saveBtn()}>
              Download
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <img src={giftIm} alt="done" />
        <div className="modal_done">
          <h3> Thank You </h3>
          <h4>Load video successful</h4>
          <span className="click" onClick={() => saveBtn()}>
            Click to view download
          </span>
        </div>
      </Modal>
    </div>
  );
}

export default App;
