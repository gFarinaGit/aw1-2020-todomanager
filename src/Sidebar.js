import React from 'react';

function Sidebar(props) {
    return <aside className="collapse d-sm-block col-sm-4 col-12 bg-secondary text-white below-nav" id="sidebar">
        <Filters filters={props.filters}
                 updateActiveFilter={props.updateActiveFilter}
                 activeFilter={props.activeFilter}/>
        <Projects projects={props.projects}
                  updateActiveFilter={props.updateActiveFilter}
                  activeFilter={props.activeFilter}/>
    </aside>;
}

function Filters(props){
    return <ul className="list-unstyled components">
        <p>FILTERS</p>
        {props.filters.map( (f) => <FilterRow key={f.id} filter={f}
                                              activeFilter={props.activeFilter}
                                              updateActiveFilter={props.updateActiveFilter}/> )}
    </ul>
}

function FilterRow(props) {
    return <li className={ (props.filter.id === props.activeFilter.id) ? "active" : undefined}>
        <a id={props.filter.id} onClick={ () =>
            props.updateActiveFilter(props.filter)
        }>{props.filter.name}</a>
    </li>
}

function Projects(props){
    return <ul className="list-unstyled components" id="projectList">
        <p>PROJECTS</p>
        {props.projects.map( (p) => <ProjectRow key={p.id} project={p}
                                                activeFilter={props.activeFilter}
                                                updateActiveFilter={props.updateActiveFilter}/> )}
    </ul>
}

function ProjectRow(props) {
    return <li className={ (props.project.id === props.activeFilter.id) ? "active" : undefined}>
        <a id={props.project.id} onClick={ () =>
            props.updateActiveFilter(props.project)
        }>{props.project.name}</a>
    </li>
}

export default Sidebar;