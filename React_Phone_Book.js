import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'

const style = {
  table: {
    borderCollapse: 'collapse',
  },
  tableHolder: {
    padding: '20px',
    border: '1px solid #F0F8FF',
    borderRadius: '15px',
    width: 'max-content',
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px',
    textAlign: 'center',
  },
  p: {
    color: 'red',
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px',
    },
    inputs: {
      marginBottom: '5px',
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
    },
  },
}

function PhoneBookForm({ addEntryToPhoneBook }) {
  const initialFormValues = {
    userFirstname: '',
    userLastname: '',
    userPhone: '',
  }
  const [formValues, setFormValues] = useState(initialFormValues)

  const handleChange = (e) => {
    const newFormValues = formValues

    newFormValues[e.target.name] = e.target.value
    setFormValues(newFormValues)
  }

  const toPhoneList = (e) => {
    e.preventDefault()
    const enteredValues = Object.values(formValues)

    if (!enteredValues.includes('')) {
      e.target.reset()
      addEntryToPhoneBook(formValues)
      setFormValues(initialFormValues)
    }
    return null
  }

  return (
    <form onSubmit={toPhoneList} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
        placeholder='Coder'
        onChange={handleChange}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
        placeholder='Byte'
        onChange={handleChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='text'
        placeholder='8885559999'
        onChange={handleChange}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
        value='Add User'
      />
    </form>
  )
}

function InformationTable(props) {
  const { newUser } = props
  const [phoneList, setPhoneList] = useState([])
  const [showError, setShowError] = useState(false)

  const createPhoneList = useCallback(() => {
    const prevLIstId = phoneList.length
    const tempPhoneList = phoneList
    const userExists = tempPhoneList.find(
      (user) =>
        user.userFirstname.toLowerCase() ===
          newUser.userFirstname.toLowerCase() &&
        user.userLastname.toLowerCase() ===
          newUser.userLastname.toLowerCase() &&
        user.userPhone.toLowerCase() === newUser.userPhone.toLowerCase()
    )
    userExists ? setShowError(true) : setShowError(false)
    if (newUser.userLastname && !userExists) {
      newUser['id'] = prevLIstId + 1
      tempPhoneList.push(JSON.parse(JSON.stringify(newUser)))
      tempPhoneList.sort((customerA, customerB) => {
        return customerA.userLastname.toLowerCase() >
          customerB.userLastname.toLowerCase()
          ? 1
          : customerA.userLastname.toLowerCase() <
            customerB.userLastname.toLowerCase()
          ? -1
          : 0
      })

      setPhoneList([...tempPhoneList])
    }
    return null
  }, [newUser])

  useEffect(() => {
    createPhoneList()
  }, [createPhoneList])

  return (
    <div style={style.tableHolder}>
      <table style={style.table} className='informationTable'>
        <thead>
          <tr>
            <th style={style.tableCell}>First name</th>
            <th style={style.tableCell}>Last name</th>
            <th style={style.tableCell}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {phoneList.map((user) => (
            <tr key={user.id}>
              <td style={style.tableCell}>{user.userFirstname}</td>
              <td style={style.tableCell}>{user.userLastname}</td>
              <td style={style.tableCell}>{user.userPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showError && <p style={style.p}>User already exists</p>}
    </div>
  )
}

function Application(props) {
  const [userToAdd, setUserToAdd] = useState({})

  const addEntryToPhoneBook = (newUser) => {
    setUserToAdd(JSON.parse(JSON.stringify(newUser)))
  }

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable newUser={userToAdd} />
    </section>
  )
}

ReactDOM.render(<Application />, document.getElementById('root'))
