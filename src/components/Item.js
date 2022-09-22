import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Item() {
  const btnRef = useRef();
  const [lang, setLang] = useState("ko");
  const [selLang, setSelLang] = useState("en");
  const [value, setValue] = useState([]);
  const [result, setResult] = useState("");
  const translate = () => {
    axios
      .post("http://127.0.0.1:8099", {
        source: lang,
        target: selLang,
        text: value,
      })
      .then((res) => {
        setResult(res.data.result);
        console.log(result);
      });
  };
  return (
    <main id="main">
      <div id="translator" class="content">
        <select
          name="language"
          id="language"
          class="option"
          onChange={(e) => {
            setLang(e.currentTarget.value);
          }}
        >
          <option value="ko">한국어</option>
          <option value="en">영어</option>
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
        <button class="btn" id="btnTR" ref={btnRef} onClick={translate}>
          <span class="material-icons"> cached </span>
        </button>
      </div>
      <div id="resultBox" class="content">
        <select
          name="translated"
          id="translated"
          class="option"
          onChange={(e) => {
            setSelLang(e.currentTarget.value);
          }}
        >
          <option value="ko">한국어</option>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
          <option value="zh-CN">중국어 간체</option>
          <option value="zh-TW">중국어 번체</option>
        </select>
        <textarea id="result" readOnly value={result}></textarea>

        <button class="btn" id="btnCopy">
          <span class="material-icons"> content_copy </span>
        </button>
      </div>
    </main>
  );
}
