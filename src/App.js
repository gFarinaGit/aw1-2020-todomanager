import React from 'react';
import API from './API';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import MyModal from "./MyModal";

const filters = [
    { id: "all", name: "All" },
    { id: "important", name: "Important" },
    { id: "today", name: "Today" },
    { id: "next7days", name: "Next 7 Days" },
    { id: "private", name: "Private" },
    { id: "shared", name: "Shared with..." },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            projects: [],
            activeFilter: filters[0],
            mode: "view",
            editedTask: null,
        };
    }

    componentDidMount() {
        API.getTasks().then( (t) => this.setState({tasks: t}));
        API.getProjects().then( (p) => this.setState({projects: p}));
    }

    updateActiveFilter = (f) => {
        this.setState({activeFilter: f});
        API.filterTasks(f).then( (t) => this.setState({tasks: t}));
    };

    deleteTask = (id) => {
        API.deleteTask(id);
        API.filterTasks(this.state.activeFilter).then((t) => this.setState({tasks: t}));
    };

    editTask = (t) => this.setState({mode: "edit", editedTask: t});

    addTask = () => this.setState({mode: "add"});

    hideModal = () => this.setState({mode: "view"});

    formSubmit = (values) => {
        API.updateTask(values);
        API.filterTasks(this.state.activeFilter).then((t) => this.setState({tasks: t}));
        this.hideModal();
    }

    render() {
        return <div className="App">
            <Navbar/>
            <div className="row vheight-100">
                <Sidebar filters={filters}
                         projects={this.state.projects}
                         updateActiveFilter={this.updateActiveFilter}
                         activeFilter={this.state.activeFilter}/>
                <MainContent activeFilter={this.state.activeFilter}
                             tasks={this.state.tasks}
                             deleteTask={this.deleteTask}
                             editTask={this.editTask}
                             addTask={this.addTask}/>
                <MyModal mode={this.state.mode}
                         editedtask={this.state.editedTask}
                         onHide={this.hideModal}
                         formSubmit={this.formSubmit}/>
            </div>
        </div>;
    }
}

export default App;