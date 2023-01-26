import axios from "axios";
import { useState, useRef } from "react";

export default function Item() {
  const btnRef = useRef();
  const defaultRef = useRef();
  const resultRef = useRef();
  const [lang, setLang] = useState("en");
  const [selLang, setSelLang] = useState("ko");
  const [value, setValue] = useState([]);
  const [result, setResult] = useState("");

  const [alert, setAlert] = useState(false);

  const alertHandler = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const copy = () => {
    const el = resultRef.current;
    el.select();
    document.execCommand("Copy");
    alertHandler();
  };

  const translate = () => {
    axios
      .post("https://paqago-server.fly.dev/papago", {
        source: lang,
        target: selLang,
        text: value,
      })
      .then((res) => {
        setResult(res.data.result);
      });
  };
  return (
    <main id="main">
      {alert && (
        <div className="alert">
          <p>COPIED!</p>
        </div>
      )}
      <div id="translator" className="content">
        <select
          name="language"
          id="language"
          className="option"
          onChange={(e) => {
            setLang(e.currentTarget.value);
          }}
        >
          <option value="en">English</option>
          <option value="ko">Korean</option>
          <option value="ja">Japanese</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
        </select>
        <textarea
          name=""
          id="txt"
          placeholder="Enter text"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          onClick={translate}
        ></textarea>
        <button className="btn" id="btnTR" ref={btnRef} onClick={translate}>
          <span className="material-icons"> cached </span>
        </button>
      </div>
      <div id="resultBox" className="content">
        <select
          name="translated"
          id="translated"
          className="option"
          onChange={(e) => {
            setSelLang(e.currentTarget.value);
          }}
          ref={defaultRef}
        >
          <option value="ko">Korean</option>
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
        </select>
        <textarea id="result" readOnly value={result} ref={resultRef}></textarea>

        <button className="btn" id="btnCopy" onClick={copy}>
          <span className="material-icons"> content_copy </span>
        </button>
      </div>
      <div className="copyright">
        ALL COPYRIGHT RESERVED BY <strong>JW.MOON</strong>
      </div>
    </main>
  );
}
