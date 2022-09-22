import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Item() {
  const btnRef = useRef();
  const defaultRef = useRef();
  const resultRef = useRef();
  const [lang, setLang] = useState("en");
  const [selLang, setSelLang] = useState("ko");
  const [value, setValue] = useState([]);
  const [result, setResult] = useState("");
  const copy = () => {
    const el = resultRef.current;
    el.select();
    document.execCommand("Copy");
    alert("COPIED!");
  };

  const translate = () => {
    axios
      .post("https://paqago-server.herokuapp.com/papago", {
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
      <div id="translator" className="content">
        <select
          name="language"
          id="language"
          className="option"
          onChange={(e) => {
            setLang(e.currentTarget.value);
          }}
        >
          <option value="en">영어</option>
          <option value="ko">한국어</option>
          <option value="ja">일본어</option>
          <option value="zh-CN">중국어 간체</option>
          <option value="zh-TW">중국어 번체</option>
        </select>
        <textarea
          name=""
          id="txt"
          placeholder="번역할 내용을 입력하세요."
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
          <option value="ko">한국어</option>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
          <option value="zh-CN">중국어 간체</option>
          <option value="zh-TW">중국어 번체</option>
        </select>
        <textarea id="result" readOnly value={result} ref={resultRef}></textarea>

        <button className="btn" id="btnCopy" onClick={copy}>
          <span className="material-icons"> content_copy </span>
        </button>
      </div>
    </main>
  );
}
