import React from 'react';
import Parser from 'html-react-parser';
import './Skills.css';

function Skills(props) {
    // getting skills as props from Home componenet
    let skills = props.tags;
    // setting up heading for skills
    let ele = "<h6>Skills</h6>";
    let count = 0;
    // this function takes care of creating jsx element with the skills
    for(let i=0; i<skills.length; i++){
        if(count >= 2){
            break;
        }
        ele += '<p>'+skills[i]+'</p>'; 
        count++;
    }
    return (
        <div className="skillsContainer">
        {Parser(ele)}
        </div>
    );
}

export default Skills;