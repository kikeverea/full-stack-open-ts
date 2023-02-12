import { CoursePart } from './types';
import Part from './Part';
const Content = ({ courseParts }:{ courseParts: CoursePart[]}): JSX.Element =>
  <>
    { courseParts.map((coursePart: CoursePart) =>
      <Part key={ coursePart.name } coursePart={ coursePart }/>
    )}
  </>

export default Content