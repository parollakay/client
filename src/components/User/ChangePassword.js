import React from 'react';
import Paper from 'material-ui/Paper';

const ChangePassword = props => {

  return (
    <Paper className="changePwPaper" zDepth={2}>
      <div className="row passwordMiddle">
        <div className="col-md-12">
          <h4>Change Password</h4>
        </div>
        <form>
          <div className="col-md-3">
            <div className="form-group">
              <input className="form-control" placeholder="Current Password" name="currentPw" type="password" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input className="form-control" placeholder="New Password" name="currentPw" type="password" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input className="form-control" placeholder="Confirm" name="currentPw" type="password" />
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