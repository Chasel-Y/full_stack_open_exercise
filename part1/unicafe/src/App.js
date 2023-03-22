import { useState } from 'react'

const StatisticLine = (props) =>{
  if(props.text==="positive"){
    return(
      <>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}%</td>
        </tr>
      </>
    )
  } else{
    return(
      <>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </>
    )
  }
}

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  let all = props.good + props.neutral +props.bad;
  if(props.good===0 && props.neutral===0 && props.bad===0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else{
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value ={props.good} />
            <StatisticLine text="neutral" value ={props.neutral} />
            <StatisticLine text="bad" value ={props.bad} />
            <StatisticLine text="all" value ={all} />
            <StatisticLine text="average" value={(props.good-props.bad)/all}/>
            <StatisticLine text="positive" value={props.good/all*100} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      <br/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
