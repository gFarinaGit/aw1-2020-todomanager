import Modal from 'react-bootstrap/Modal'
import React from "react";
import moment from "moment";

function MyModal(props) {
    return <Modal
        {...props}
        show={ (props.mode === "edit" || props.mode === "add") }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {(props.mode === "edit") ? "Edit Task" : "Add New Task"}
            </Modal.Title>
        </Modal.Header>
        <Form {...props}/>
    </Modal>
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        let id, desc, project, important, privateTask, date, time;
        if(props.mode === 'edit') {
            id = props.editedtask.id;
            desc = props.editedtask.description;
            project = props.editedtask.project;
            important = props.editedtask.important;
            privateTask = props.editedtask.privateTask;
            if (props.editedtask.deadline) {
                date = props.editedtask.deadline.format('YYYY-MM-DD');
                time = props.editedtask.deadline.format('HH:mm');
            }
        }

        this.state = { id: id, description: desc, project: project, important: important, privateTask: privateTask, date: date, time: time};
    }

    updateField = (name, value) =>  this.setState({[name]: value});
    validateAndSubmit = (values) => {
        if (this.form.checkValidity()) {
            this.props.formSubmit(values);
        } else {
            this.form.reportValidity();
        }
    }

    render() {
        return <form role="form" method="POST" action="" id="new-task" autoComplete="off" name="post"
                     onSubmit={ (ev) => ev.preventDefault() }>
            <FormData {...this.props} task={this.state} updateField={this.updateField}/>
            <FormControl {...this.props} submit={ () => this.validateAndSubmit(this.state) }/>
        </form>
    }
}

function FormData(props) {
    return <Modal.Body>
        <div className="form-group row">
            <label htmlFor="form_description" className="col-lg-2 col-form-label">Description</label>
            <div className="col-sm-10">
                <input type="text" className="form-control input-lg" name="description"
                       placeholder="Type a description..." id="form_description"
                       value={ props.task.description || '' }
                       onChange={ (ev) => props.updateField(ev.target.name, ev.target.value) } required/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="form_project" className="col-lg-2 col-form-label">Project</label>
            <div className="col-sm-10">
                <input type="text" className="form-control input-lg" name="project"
                       placeholder="Type a project for the task..." id="form_project"
                       value={ props.task.project || '' }
                       onChange={ (ev) => props.updateField(ev.target.name, ev.target.value) } />
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-2">Important</div>
            <div className="col-sm-10">
                <div className="form-check col-sm-10">
                    <input className="form-check-input" type="checkbox" id="form_important" name="important"
                           checked={ props.task.important }
                           onChange={ (ev) => props.updateField(ev.target.name, ev.target.checked) } />
                    <label className="form-check-label" htmlFor="form_important">Yes</label>
                </div>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-2">Private</div>
            <div className="col-sm-10">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="form_private" name="privateTask"
                           defaultChecked={ props.task.privateTask || true }
                           onChange={ (ev) => props.updateField(ev.target.name, ev.target.checked) } />
                    <label className="form-check-label" htmlFor="form_private">Yes</label>
                </div>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-lg-2 col-form-label">Deadline</label>
            <div className="col-sm-10">
                <input type="date" name="date" id="form_date"
                       min={moment().format('YYYY-MM-DD')}
                       value={ props.task.date || '' }
                       onChange={ (ev) => props.updateField(ev.target.name, ev.target.value) } />
                <input type="time" name="time" id="form_time"
                       value={ props.task.time || '' }
                       onChange={ (ev) => props.updateField(ev.target.name, ev.target.value) } />
            </div>
        </div>
    </Modal.Body>
}

function FormControl(props) {
    return <Modal.Footer>
        <button id="form_cancel" type="button" className="btn btn-secondary" onClick={props.onHide}>Cancel</button>
        <button type="submit" className="btn btn-warning"
                onClick={ () => props.submit() }>
            { (props.mode === "edit") ? "Edit Task" : "Add Task" }
        </button>
    </Modal.Footer>;
}

export default MyModal;