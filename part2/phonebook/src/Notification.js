import React from "react"

const successStyle = {
  backgroundColor: "lightgray",
  color: "green",
  fontSize: "1.5em",
  border: "4px solid green",
  marginBottom: "20px",
  padding: "5px 10px",
  display: "inline-block",
  minWidth: "300px",
}

const errorStyle = {
  ...successStyle,
  color: "red",
  border: "4px solid red",
}

const Notification = ({ message }) => {
  if (message.text === null) return null
  return (
    <div style={message.error ? errorStyle : successStyle}>{message.text}</div>
  )
}

export default Notification
