import { CoursePart } from './types';

const Content = ({ courseParts }:{ courseParts: CoursePart[]}): JSX.Element =>
  <>
    { courseParts.map((coursePart: CoursePart) =>
      <p key={ coursePart.name }>
        { coursePart.name} {coursePart.exerciseCount }
      </p>
    )}
  </>

export default Content