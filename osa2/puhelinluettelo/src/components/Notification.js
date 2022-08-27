const Notification = (props) => {
    if (props.message === null) {
      return null
    }
    if (props.nature==="good") {
        return (
            <div className="person">
              {props.message}
            </div>
          )
    } else {
        return (
            <div className="error">
              {props.message}
            </div>
          )
    }
    
  }
  export default Notification
