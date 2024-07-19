// import React, { useEffect } from "react";
// import CodeMirror from "codemirror";
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/theme/dracula.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import { useRef } from "react";

// const Editor = ({ socketRef, roomId ,onCodeChange}) => {
//   const textareaRef = useRef(null);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (textareaRef.current && !editorRef.current) {
//       editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
//         mode: { name: "javascript", json: true },
//         theme: "dracula",
//         autoCloseTags: true,
//         autoCloseBrackets: true,
//         lineNumbers: true,
//       });
//     }
//     editorRef.current.on("change", (instance, changes) => {
//       // console.log('changes',changes);
//       const { origin } = changes;
//       const code = instance.getValue();
//       onCodeChange(code);
//       console.log("code", code);
//       if (origin !== "setValue") {
//         socketRef.current.emit("change", {
//           roomId,
//           code,
//         });
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on("change", ({ code }) => {
//         if (code !== null) {
//           editorRef.current.setValue(code);
//         }
//       });
//     }
//   }, [socketRef.current]);

//   return (
//     <div>
//       <textarea
//         ref={textareaRef}
//         className="textArea"
//         id="realtimeEditor"
//         defaultValue="// Enter your code here"
//       ></textarea>
//     </div>
//   );
// };

// export default Editor;



// import React, { useEffect, useState, useRef } from "react";
// import CodeMirror from "codemirror";
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/python/python";
// import "codemirror/theme/dracula.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import axios from "axios";

// const Editor = ({ socketRef, roomId, onCodeChange }) => {
//   const textareaRef = useRef(null);
//   const editorRef = useRef(null);
//   const [language, setLanguage] = useState("javascript");
//   const [output, setOutput] = useState("");

//   useEffect(() => {
//     if (textareaRef.current && !editorRef.current) {
//       editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
//         mode: { name: "javascript", json: true },
//         theme: "dracula",
//         autoCloseTags: true,
//         autoCloseBrackets: true,
//         lineNumbers: true,
//       });
//     }

//     editorRef.current.on("change", (instance, changes) => {
//       const { origin } = changes;
//       const code = instance.getValue();
//       onCodeChange(code);
//       if (origin !== "setValue") {
//         socketRef.current.emit("change", {
//           roomId,
//           code,
//         });
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on("change", ({ code }) => {
//         if (code !== null) {
//           editorRef.current.setValue(code);
//         }
//       });
//     }
//   }, [socketRef.current]);

//   const handleCompile = async () => {
//     const code = editorRef.current.getValue();
//     let lang;
//     switch (language) {
//       case "javascript":
//         lang = "nodejs";
//         break;
//       case "python":
//         lang = "python3";
//         break;
//       case "cpp":
//         lang = "cpp14";
//         break;
//       case "java":
//         lang = "java";
//         break;
//       default:
//         lang = "nodejs";
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/compile", {
//         script: code,
//         language: lang,
//         versionIndex: "0", // Depending on the language version
//       });

//       setOutput(response.data.output);
//     } catch (error) {
//       setOutput("Error compiling code");
//       console.error(error);
//     }
//   };

//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
//     editorRef.current.setOption("mode", event.target.value === "javascript" ? "javascript" : event.target.value);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <div>
//           <label htmlFor="language" style={{color:"whitesmoke"}}>Choose Language: </label>
//           <select id="language" value={language} onChange={handleLanguageChange}>
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//             <option value="cpp">C++</option>
//             <option value="java">Java</option>
//           </select>
//           <button style={{marginLeft:"65px"}} onClick={handleCompile}>Compile</button>
//         </div>
//         <textarea
//           ref={textareaRef}
//           className="textArea"
//           id="realtimeEditor"
//           defaultValue="// Enter your code here"
//           style={{ flex: 1 }}
//         ></textarea>
        
//       </div>
//       <div style={{ width: "300px", display: "flex", flexDirection: "column", marginLeft: "20px" }}>
//         <div>
//           <h3 style={{color:"whitesmoke"}}>Input:</h3>
//           <textarea style={{ width: "100%", height: "100px" }} />
//         </div>
//         <div>
//           <h3 style={{color:"whitesmoke"}}>Output:</h3>
//           <pre style={{ width: "100%", height: "calc(50vh - 180px)", overflowY: "auto" ,backgroundColor:"white"}}>{output}</pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Editor;


// import React, { useEffect, useState, useRef } from "react";
// import CodeMirror from "codemirror";
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/python/python";
// import "codemirror/theme/dracula.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import axios from "axios";

// const Editor = ({ socketRef, roomId, onCodeChange }) => {
//   const textareaRef = useRef(null);
//   const editorRef = useRef(null);
//   const [language, setLanguage] = useState("javascript");
//   const [output, setOutput] = useState("");
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     if (textareaRef.current && !editorRef.current) {
//       editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
//         mode: { name: "javascript", json: true },
//         theme: "dracula",
//         autoCloseTags: true,
//         autoCloseBrackets: true,
//         lineNumbers: true,
//       });
//     }

//     editorRef.current.on("change", (instance, changes) => {
//       const { origin } = changes;
//       const code = instance.getValue();
//       onCodeChange(code);
//       if (origin !== "setValue") {
//         socketRef.current.emit("change", {
//           roomId,
//           code,
//         });
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on("change", ({ code }) => {
//         if (code !== null) {
//           editorRef.current.setValue(code);
//         }
//       });
//     }
//   }, [socketRef.current]);

//   const handleCompile = async () => {
//     const code = editorRef.current.getValue();
//     let lang;
//     switch (language) {
//       case "javascript":
//         lang = "nodejs";
//         break;
//       case "python":
//         lang = "python3";
//         break;
//       case "cpp":
//         lang = "cpp14";
//         break;
//       case "java":
//         lang = "java";
//         break;
//       default:
//         lang = "nodejs";
//     }

//     try {
//       const response = await axios.post("http://localhost:8000/compile", {
//         script: code,
//         language: lang,
//         versionIndex: "0", // Depending on the language version
//         input,
//       });

//       setOutput(response.data.output);
//     } catch (error) {
//       setOutput("Error compiling code");
//       console.error(error);
//     }
//   };

//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
//     editorRef.current.setOption("mode", event.target.value === "javascript" ? "javascript" : event.target.value);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <div>
//           <label htmlFor="language" style={{color:"whitesmoke"}}>Choose Language: </label>
//           <select id="language" value={language} onChange={handleLanguageChange}>
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//             <option value="cpp">C++</option>
//             <option value="java">Java</option>
//           </select>
//           <button style={{marginLeft:"65px"}} onClick={handleCompile}>Compile</button>
//         </div>
//         <textarea
//           ref={textareaRef}
//           className="textArea"
//           id="realtimeEditor"
//           defaultValue="// Enter your code here"
//           style={{ flex: 1 }}
//         ></textarea>
//       </div>
//       <div style={{ width: "300px", display: "flex", flexDirection: "column", marginLeft: "20px" }}>
//         <div>
//           <h3 style={{color:"whitesmoke"}}>Input:</h3>
//           <textarea
//             style={{ width: "100%", height: "100px" }}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//         </div>
//         <div>
//           <h3 style={{color:"whitesmoke"}}>Output:</h3>
//           <pre style={{ width: "100%", height: "calc(50vh - 180px)", overflowY: "auto", backgroundColor:"white" }}>{output}</pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Editor;



import React, { useEffect, useState, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import axios from "axios";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [expectedInputs, setExpectedInputs] = useState(0);

  useEffect(() => {
    if (textareaRef.current && !editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
        mode: { name: "clike", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
    }

    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      countExpectedInputs(code);
      if (origin !== "setValue") {
        socketRef.current.emit("change", {
          roomId,
          code,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("change", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
  }, [socketRef.current]);

  const countExpectedInputs = (code) => {
    const inputStatements = code.match(/cin\s*>>\s*[a-zA-Z_][a-zA-Z_0-9]*(\s*>>\s*[a-zA-Z_][a-zA-Z_0-9]*)*/g);
    let inputCount = 0;
    if (inputStatements) {
      inputStatements.forEach((statement) => {
        const matches = statement.match(/>>\s*[a-zA-Z_][a-zA-Z_0-9]*/g);
        inputCount += matches ? matches.length : 0;
      });
    }
    setExpectedInputs(inputCount);
  };

  const validateInput = () => {
    const inputs = input.trim().split(/\s+/);
    if (inputs.length !== expectedInputs) {
      setError(`Please provide exactly ${expectedInputs} inputs.`);
      return false;
    }
    setError("");
    return true;
  };

  const handleCompile = async () => {
    if (!validateInput()) {
      return;
    }

    const code = editorRef.current.getValue();
    let lang;
    switch (language) {
      case "javascript":
        lang = "nodejs";
        break;
      case "python":
        lang = "python3";
        break;
      case "cpp":
        lang = "cpp14";
        break;
      case "java":
        lang = "java";
        break;
      default:
        lang = "nodejs";
    }

    try {
      const response = await axios.post("http://localhost:8000/compile", {
        script: code,
        language: lang,
        versionIndex: "0", // Depending on the language version
        input,
      });

      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error compiling code");
      console.error(error);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    editorRef.current.setOption("mode", event.target.value === "javascript" ? "javascript" : event.target.value);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div>
          <label htmlFor="language" style={{ color: "whitesmoke" }}>Choose Language: </label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <button style={{marginLeft:"700px", marginBottom:"5px"}}  onClick={handleCompile}>Compile</button>
        {/* <button > hemant</button> */}
        <textarea
          ref={textareaRef}
          className="textArea"
          id="realtimeEditor"
          defaultValue="// Enter your code here"
          style={{ flex: 1 }}
        ></textarea>
      </div>
      <div style={{ width: "300px", display: "flex", flexDirection: "column", marginLeft: "20px" }}>
        <div>
          <h3 style={{ color: "whitesmoke" }}>Input:</h3>
          <textarea
            style={{ width: "100%", height: "100px" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <h3 style={{ color: "whitesmoke" }}>Output:</h3>
          <pre style={{ width: "100%", height: "calc(50vh - 180px)", overflowY: "auto", backgroundColor: "white" }}>{output}</pre>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default Editor;
