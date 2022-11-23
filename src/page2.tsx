import './App.css';
import useSpinner from './hooks/usespinner';

function Page2() {
  const { start, end, clear, SpinnerContainer } = useSpinner();

  const getData = () => {
    start("slowapi")
    console.log("Starting slowapi action")
    fetch("https://flash-the-slow-api.herokuapp.com/delay/3000")
    .then(res => res.text())
    .then(data => console.log(data))
    .finally(() => {
      
      console.log("Ending slowapi action")
      end("slowapi")
    })
  }
  return (
    <div className="App">
      <h1>Header</h1>
      <button onClick={()=>{start("1Sec", {delay: 1000})}}>1 sec</button><button onClick={()=>{end("1Sec")}}>End</button><br/>
      <button onClick={()=>{start("10Sec")}}>Default</button><button onClick={()=>{end("10Sec")}}>End</button><br/>
      <button onClick={()=>{start("10Sec2")}}>Default sec 2</button><button onClick={()=>{end("10Sec2")}}>End</button><br/>
      <button onClick={()=>{start("10Sec3")}}>Default sec 3</button><button onClick={()=>{end("10Sec3")}}>End</button><br/>
      <button onClick={()=>{start("20Sec", {delay: 20000})}}>20 sec</button><button onClick={()=>{end("20Sec")}}>End</button><br/>
      
      <br/>
      <button onClick={()=>{getData()}}>Get Data</button>
      <br/>
      <button onClick={()=>{clear()}}>Clear</button>
      <SpinnerContainer>
        LOADING
      </SpinnerContainer>
    </div>
  );
}

export default Page2;
