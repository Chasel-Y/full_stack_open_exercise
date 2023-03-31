const PersonsFilter = (props)=>{
    return(
      <div>filter shown with<input value={props.value} onChange={props.onChange} /></div>
    )
}

export default PersonsFilter