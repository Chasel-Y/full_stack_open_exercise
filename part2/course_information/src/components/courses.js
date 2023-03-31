const Course = (props)=>{
    return(
      <div>
        <Header text={props.course.name}/>
        <Content content={props.course.parts}/>
        <Total content={props.course.parts}/>
      </div>
    )
  }
  
  const Header = (props)=>{
    return(
      <div>
        <h1>{props.text}</h1>
      </div>
    )
  }
  
  const Content = ({content}) =>{
    return(
      <div>
          {content.map(part=>
          <Part key={part.id} part={part}/>
          )}
      </div>
    )
  }
  
  const Part = ({part}) =>{
    return(
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Total = ({content})=>{
    const total = content.reduce((accumulator,obj)=>{return accumulator + obj.exercises}, 0,)
    return(
      <div>
        <p><strong>total of {total} exercises</strong></p>
      </div>
    )
  }

  export default Course