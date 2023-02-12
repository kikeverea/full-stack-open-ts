import { CoursePart } from './types';

const Total = ({ courseParts }:{ courseParts: CoursePart[]}): JSX.Element =>
  <p>
    <b>Number of exercises{' '}</b>
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>

export default Total