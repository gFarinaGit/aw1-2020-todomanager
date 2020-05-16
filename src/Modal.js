import React from 'react';

function Modal(props) {
    return <div className="modal" id="addModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New Task</h5>
                    <button type="button" className="close" id="closeModal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form/>
            </div>
        </div>
    </div>
}

function Form() {
    return <form role="form" method="POST" action="" id="new-task" autoComplete="off" name="post">
        <FormData/>
        <FormControl/>
    </form>
}

class FormData extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="modal-body">
            <div className="form-group row">
                <label htmlFor="form_description" className="col-lg-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control input-lg" name="Description"
                           placeholder="Type a description..." id="form_description" required/>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="form_project" className="col-lg-2 col-form-label">Project</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control input-lg" name="Description"
                           placeholder="Type a project for the task..." id="form_project"/>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-2">Important</div>
                <div className="col-sm-10">
                    <div className="form-check col-sm-10">
                        <input className="form-check-input" type="checkbox" id="form_important"/>
                        <label className="form-check-label" htmlFor="form_important">Yes</label>
                    </div>
                </div>
            </div>


            <div className="form-group row">
                <div className="col-sm-2">Private</div>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="form_private" checked/>
                        <label className="form-check-label" htmlFor="form_private">Yes</label>
                    </div>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-lg-2 col-form-label">Deadline</label>
                <div className="col-sm-10">
                    <input type="date" name="Deadline" id="form_date"/>
                    <input type="time" name="Deadline" id="form_time"/>
                </div>
            </div>
        </div>
    }
}

function FormControl() {
    return <div className="modal-footer">
        <button id="form_cancel" type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="submit" className="btn btn-warning">Add Task</button>
    </div>;
}

export default Modal;