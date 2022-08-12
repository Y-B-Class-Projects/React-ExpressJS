import './Title.css'
function Title(props) {
  return (
      <div className="container text-start">
        <div><br /></div>
        <div className="wrapper">
            <div className="first">{props.children}</div>
            <div className="second align-items-center">
                {!props.isNoRefresh && <button onClick={props.refreshHandler} className="btn btn-outline-secondary rounded-pill mt-2">Refresh</button>}
            </div>
        </div>
          <hr align="left" className="rounded" />
      </div>
  )
}

export default Title;