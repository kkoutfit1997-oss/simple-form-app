import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "./style.css";

Amplify.configure(outputs);

const client = generateClient();

function App() {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!field1 || !field2) {
      setMessage("2つとも入力してください");
      return;
    }

    const { errors } = await client.models.Submission.create({
      field1,
      field2,
    });

    if (errors) {
      setMessage("送信に失敗しました");
      return;
    }

    setField1("");
    setField2("");
    setMessage("送信しました");
  };

  return (
    <main className="container">
      <div className="card">
        <h1>入力フォーム</h1>

        <form onSubmit={submit}>
          <label>入力項目1</label>
          <input
            value={field1}
            onChange={(e) => setField1(e.target.value)}
            placeholder="入力してください"
          />

          <label>入力項目2</label>
          <input
            value={field2}
            onChange={(e) => setField2(e.target.value)}
            placeholder="入力してください"
          />

          <button type="submit">送信</button>
        </form>

        {message && <p className="message">{message}</p>}

        <a href="/admin" className="admin-link">
          管理画面
        </a>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
