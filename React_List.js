function DataList(props) {
  const { data } = props
  return (
    <div>
      <h2>code goes here</h2>
      <ul>
        {data.map((item, index) => (
          //to be able to create a li using this method we need some key
          //as we do not have any unique ID or anything else I could
          //assume is unique for the array of data, I will use the index
          //of the array  which is NOT ok to do, but it is possible to
          //have same names with the same ages
          <li key={index}>
            <span>{item.name}</span> <span>{item.age}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const data = [
  { name: 'Daniel', age: 25 },
  { name: 'John', age: 24 },
  { name: 'Jen', age: 31 },
]

ReactDOM.render(<DataList data={data} />, document.getElementById('root'))
