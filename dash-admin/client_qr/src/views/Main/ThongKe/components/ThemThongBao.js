import React from 'react'

function ThemThongBao() {
    // const []
    return (
        <div className="col-md-12">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h3 className="card-title">Compose New Message</h3>
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <div className="form-group">
              <input className="form-control" placeholder="To:" />
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Subject:" />
            </div>
            <div className="form-group">
              <textarea id="compose-textarea" className="form-control" style={{height: '300px'}} defaultValue={""} />
            </div>
            <div className="form-group">
              <div className="btn btn-default btn-file">
                <i className="fas fa-paperclip" /> Attachment
                <input type="file" name="attachment" />
              </div>
              <p className="help-block">Max. 32MB</p>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <div className="float-right">
              <button type="button" className="btn btn-default"><i className="fas fa-pencil-alt" /> Draft</button>
              <button type="submit" className="btn btn-primary"><i className="far fa-envelope" /> Send</button>
            </div>
            <button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button>
          </div>
          {/* /.card-footer */}
        </div>
        {/* /.card */}
      </div>
      
    )
}

export default ThemThongBao
