import React from 'react';
//components
import ShowTask from './ShowTask';
const PendingTask=(props)=>{
    const taskList=props.props;
    
   const altList= taskList.filter(function(task){
        return (task.complete===false);
      },);

      
      
    return (
        <ShowTask props={altList} />
    )
};

export default PendingTask;