const Sum = (x) => ({
    x,
    concat: other => Sum(x + other.x)
})

const Any = (x) => ({
    x,
    concat: other => Any(x || other.x)
})

const All = (x) => ({
    x,
    concat: other => Any(x && other.x)
})

All.empty = () => All(true)

const Alternative = (ex) => ({
    ex,
    concat: other =>
        other.ex.isLeft ? ex : ex.concat(other.ex)
})

console.log(Any(true).concat(Any(false)))