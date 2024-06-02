import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDkLAPzC29ZUXN2SaX5XHHHMxEC8D2mSck",
        method: "post",
        data: {
          contents: [
            { parts: [{ text: question }] },
          ],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="bg-white h-screen flex flex-col p-3">
      <div className="flex-grow overflow-auto">
        <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 p-3">
          <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank" rel="noopener noreferrer">
            <h1 className="text-4xl text-center">Chat AI</h1>
          </a>
        </div>
        <div className="w-full md:w-2/3 m-auto text-left rounded bg-gray-50 my-1 p-3 text-lg">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>
      <form onSubmit={generateAnswer} className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2">
        <textarea
          required
          className="border rounded w-full my-2 min-h-fit p-3 text-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 text-lg"
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Generating..." : "Generate answer"}
        </button>
      </form>
    </div>
  );
}

export default App;
