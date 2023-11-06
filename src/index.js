import { useState } from "react";
import ReactDOM from 'react-dom/client';
import "./index.css";

	localStorage.setItem('okState', 0);
	localStorage.setItem('textState', "ZeroState1");
	localStorage.setItem('tnumber', 0);
	let thisnumb = 1; //TESTBRANCH TESTA1 HERE!!!
	
  
	const startdataArray = [
		{ thework: 'Empty', statusState: 0, numb: 0 },
		];
			
	localStorage.setItem('dataStore', JSON.stringify(startdataArray));		

function App() {
	
	const [textLine, setTextLine] = useState("");
	const [okField, setOkField] = useState(0); 
	const [inputValue, setInputValue] = useState('');  
	const [tNumb, settNumb] = useState(0);  
	
	function addawork() {
		
		thisnumb = thisnumb + 1;
		const storedData1 = JSON.parse(localStorage.getItem('dataStore'));
		
		//DataStore change:
		const newItem = { thework: inputValue, statusState: 1, numb: thisnumb };
		setOkField(1);
		setTextLine(inputValue);
		settNumb(thisnumb);
		
		storedData1.push(newItem);
		localStorage.setItem('dataStore', JSON.stringify(storedData1));
		DataPush();
	};
	
	function DataPush() {
	
		const storedData1 = JSON.parse(localStorage.getItem('dataStore'));
		alphasort();
		
		return (
		<div>
			<p id="NewList">
			{storedData1.map((item, index) => (
				<tr key={index}>
				<td id={"FinA" + item.numb} onClick={change01}>{item.statusState}</td>
				<td id={"FinA" + item.numb}>{item.thework}</td>
				<td id={"FinA"+ item.numb} onClick={delfunc}>Delete</td>
				</tr>
			))}
		</p>
		</div>
		);	
	};
	
	function change01(pressinfo) {
	
		const storedData1 = JSON.parse(localStorage.getItem('dataStore'));
		const changeEle = document.getElementById(pressinfo.target.id);

		const changeEleString = String(pressinfo.target.id);
		const makenumb = changeEleString.slice(4,6);
		
		
		switch (changeEle.innerHTML) {
			case "1":
				storedData1[makenumb].statusState = 0;
				settNumb(0);
				changeEle.innerHTML = "0";
				break;
			case "0":
				storedData1[makenumb].statusState = 1;
				settNumb(1);
				changeEle.innerHTML = "1";
				break;
		}
		localStorage.setItem('dataStore', JSON.stringify(storedData1));
		DataPush();
	};
	
	function alphasort() { 
		
		const storedData1 = JSON.parse(localStorage.getItem('dataStore'));
		
		storedData1.sort((a, b) => a.thework.localeCompare(b.thework));
		
		for(let z=0; z<storedData1.length;z++) {
			storedData1[z].numb = z;
		}
		
		localStorage.setItem('dataStore', JSON.stringify(storedData1));
	
	};
	
	function delfunc(pressinfo) {
		
		const storedData1 = JSON.parse(localStorage.getItem('dataStore'));
		const changeEle = document.getElementById(pressinfo.target.id);
		
		const changeEleString = String(pressinfo.target.id);
		const makenumb = changeEleString.slice(4,6);
		
		storedData1.splice(makenumb,1);
		localStorage.setItem('dataStore', JSON.stringify(storedData1));
		DataPush();
	};
	
	const handleInputChange = (theField) => {
		setInputValue(theField.target.value);
		DataPush();
	};
	
		return ( 
	
	<div id="StartHeader">
      <h1>This is a To Do List:</h1>
	  <h2>(made by Penguwyn)</h2>
	  <p>
		<label htmlFor="myInput">New Work:</label>
		<input type="text" id="myInput" value={inputValue} onChange={handleInputChange}/>
		<button onClick={addawork} id="WordAdd">Add</button>
	  </p>
	  <DataPush />
	 </div>
	
	);
	
};
	
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;