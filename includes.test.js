//import itIncludesCoordinate from "./includes";
const itIncludesCoordinate = require('./includes');
test("includesTest",()=>{
    expect((itIncludesCoordinate("7","9",5,7))).toBe(true)
})