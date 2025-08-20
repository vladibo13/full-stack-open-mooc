const Total = ({parts}) => {
  const sum = parts.reduce((acc,curr) => acc + curr.exercises, 0)
  return (
    <strong>
      total of {sum} exercises
    </strong>
  )
}

export default Total