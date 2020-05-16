import React from 'react';
import * as moment from 'moment';
import {deleteImg, editImg, sharedImg} from "./svgImages";

function MainContent(props) {
    return <main className="col-sm-8 col-12 below-nav bg-light" id="maintext">
        <p id="title">{props.activeFilter.name.toUpperCase()}</p>
        <TasksTable tasks={props.tasks}
                    deleteTask={props.deleteTask}
                    editTask={props.editTask}/>
        <AddButton addTask={props.addTask}/>
        <p className="version d-none d-sm-block">v-beta-3.0</p>
    </main>
}

class TasksTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return <table className="table">
            <tbody>
            { this.props.tasks.map( (t) => <TaskRow key={t.id} task={t}
                                                    deleteTask={this.props.deleteTask}
                                                    editTask={this.props.editTask}/> )}
            </tbody>
        </table>
    }
}

function TaskRow(props) {
    return <tr key = {props.task.id}>
            <TaskData task={props.task}/>
            <TaskControl task={props.task}
                         deleteTask={props.deleteTask}
                         editTask={props.editTask}/>
        </tr>
}

class TaskData extends React.Component {
    constructor(props) {
        super(props);

        this.state = { expired: false };
    }

    render() {
        if(this.props.task.deadline){
            const now = moment();
            setTimeout( () => {
                this.setState( {expired: true} );
            }, this.props.task.deadline.diff(now));
        }
        return <>
            <td>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                           className={ this.props.task.important ? "custom-control-input important" : "custom-control-input" }
                           id={"checkbox" + this.props.task.id}
                           defaultChecked={this.props.task.completed} />
                    <label className="custom-control-label" htmlFor={"checkbox" + this.props.task.id}>
                        { this.props.task.description }
                    </label>
                </div>
            </td>
            <td>
                { (this.props.task.project) &&
                <span className="label bg-secondary text-white"
                      id={"projectTask" + this.props.task.id}>
                    {this.props.task.project}
                </span>
                }
            </td>
            <td>
                { (!this.props.task.privateTask) && sharedImg }
            </td>
            <td>
                { (this.props.task.deadline) &&
                    <p className={this.props.expired ? "deadline text-danger" : "deadline"}
                       id={"deadline" + this.props.task.id}>
                        { this.props.task.deadline.format("dddd Do MMMM YYYY") + " at " + this.props.task.deadline.format("HH:mm") }
                    </p>
                }
            </td>
        </>
    }
}

function TaskControl(props) {
    return <td>
        <a className="link" id={"edit" + props.task.id}
           onClick={ () => props.editTask(props.task) }>
            {editImg}
        </a>
        <a className="link" id={"delete" + props.task.id}
           onClick={ () => props.deleteTask(props.task.id) }>
            {deleteImg}
        </a>
    </td>
}

function AddButton(props) {
    return <button type="button" id="addButton" className="btn btn-warning btn-lg fixed-right-bottom"
                   onClick={props.addTask}>&#43;</button>;
}

export default MainContent;