import React from 'react';
import Paper from 'material-ui/Paper';

const ChangePassword = props => {

  return (
    <Paper className="changePwPaper" zDepth={2}>
      <button className="closePw hover" onClick={props.hidePw}>
        &times;
      </button>
      <div className="row passwordMiddle">
        <div className="col-md-12">
          <h4>Change Your Password</h4>
        </div>
        {props.error && <p className="text-danger hover" onClick={props.cancelErr}> <i className="glyphicon glyphicon-exclamation-sign"></i> {props.error} </p>}
        <form onSubmit={e => props.action(e)}>
          <div className="col-md-3">
            <div className="form-group">
              <input className="form-control" placeholder="Current Password" name="currentPw" type="password" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input className="form-control" placeholder="New Password" name="password" type="password" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input className="form-control" placeholder="Confirm" name="confirmPass" type="password" />
            </div>
          </div>
          <div className="col-md-3">
            <button action="submit" className="btn btn-primary btn-block">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </Paper>
  )
}

export default ChangePassword;