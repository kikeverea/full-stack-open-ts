import { CoursePart } from './types';

const Part = ({ coursePart }:{ coursePart: CoursePart }): JSX.Element => {

  const renderPartAttributes = (): JSX.Element => {
    switch (coursePart.kind) {
    case 'basic':
      return <><em>{ coursePart.description }</em><br/></>
    case 'group':
      return <>{ `Project exercises: ${ coursePart.groupProjectCount }` }<br /></>
    case 'background':
      return(
        <>
          <em>{ coursePart.description }</em>
          <br/>
          { coursePart.backgroundMaterial }
          <br/>
        </>)
    case 'special':
      return(
        <>
          <em>{ coursePart.description }</em>
          <br/>
          { `required skills: ${ coursePart.requirements.join(',') }` }
          <br/>
        </>)
    default:
      // eslint-disable-next-line no-case-declarations
      const invalid: never = coursePart
      console.log(`Invalid kind: ${ invalid }`)
      return invalid
    }
  }

  return (
    <>
      <b>{ coursePart.name } { coursePart.exerciseCount }</b>
      <br/>
      { renderPartAttributes() }
      <br/>
    </>
  )
}


export default Part