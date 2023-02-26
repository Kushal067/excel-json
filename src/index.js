import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as xlsx from 'xlsx'
import reportWebVitals from './reportWebVitals';

let exceldata=[];

const readUploadFile = (e) => {
  e.preventDefault();
  if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          console.log(json);
          this.exceldata=json;
          exceldata.forEach(x=>{
            console.log(x.Ingestion_ID)
          })
      };
      reader.readAsArrayBuffer(e.target.files[0]);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <form>
    <label htmlFor="upload">Upload File</label>
    <input
        type="file"
        name="upload"
        id="upload"
        onChange={readUploadFile}
    />
  </form> */}
  <App/>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
