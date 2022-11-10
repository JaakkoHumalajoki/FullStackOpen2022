import React from 'react'

const PersonForm = ({name, onChangeName, number, onChangeNumber, onSubmit}) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>add</button>
      </div>
    </form>
  )
}

export default PersonForm