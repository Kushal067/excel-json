import React, { Component } from 'react';
import * as xlsx from 'xlsx'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isDataAvailable: false,
      error: null,
      json:""
    };
    
  }

  componentDidMount=(e)=> {
    console.log("inside"+this);
    this.setState({ isDataAvailable: false });
    //e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          xlsx.utils.sheet_to_html(worksheet)
          const json = xlsx.utils.sheet_to_json(worksheet);
          console.log(JSON.stringify(json))
          this.setState({
            data: json,
            isDataAvailable : true,
            json: JSON.stringify(json)
          })
          this.state.data.forEach(x=>{
            console.log(JSON.stringify(x))
          })
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  render() {
    const { data, isDataAvailable, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (!isDataAvailable) {
      return (
        <form>
      <label htmlFor="upload">Upload File</label>
      <input
          type="file"
          name="upload"
          id="upload"
          onChange={this.componentDidMount}
      />
    </form>
      );
    }

    return (
      
      <ul>
         <form>
          <label htmlFor="upload">Upload File</label>
          <input
              type="file"
              name="upload"
              id="upload"
              onChange={this.componentDidMount}
          />
        </form>
        {
          <table>
            <tr>
              <th>Ingestion_ID</th>
              <th>Master_Dimensions</th>
              <th>Ingestion_Metadata</th>
              <th>DQ_Trigger</th>
              <th>name</th>
              <th>job_key</th>
            </tr>
            {data.map((item =>
            <tr key={item.Ingestion_ID}>
              <td>{item.Ingestion_ID}</td>
              <td>{item.Master_Dimensions}</td>
              <td>{item.Ingestion_Metadata}</td>
              <td>{item.DQ_Trigger}</td>
              <td>{item.name}</td>
              <td>{item.job_key}</td>
            </tr>
            ))}
          </table>
        }
        {
           <h1>JSON extract</h1>
        }
        {
          <p>{this.state.json}</p>
        }
      </ul>
    );
  }
}


export default App;