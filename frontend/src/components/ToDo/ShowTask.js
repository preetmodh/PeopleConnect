import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './App.css';
//components
import DeleteTask from './DeleteTask';
import CompleteTask from './CompleteTask';

const useStyles = makeStyles((theme) => ({

    heading: {
      fontSize: 25,
      flexBasis: '33.33%',
      flexShrink: 0,
      font:'bold',
      fontFamily:'sans-serif',
    },
    secondaryHeading: {
      fontSize: 18,
      font:'bold',
      
    },
  }));

const AllTask=(props)=>{
  
  const taskList=props.props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //converting date to readable...
  const dateFormatter=(date)=>{
    // console.log(date.slice(0,9)+date.slice(11,19));
    return date.slice(0,10)+' Time:'+date.slice(11,19);
  }
  return (
    <div  className="todo" style={{backgroundColor: '#F0F8FF',}}>
      
     {taskList&&
        taskList.map((task)=>{
            return (
              <div >
                <Accordion className={classes.root} expanded={expanded === `${task.id}`} onChange={handleChange(`${task.id}`)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    style={{overflow:'auto '}} 
                    >
                    
                        <Typography style={{
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'break-word',
                            }}
                            className={classes.heading}>{task.title}</Typography>
                        {task && task.due_date&&
                          <Typography className={classes.secondaryHeading}>
                              {'Due: '+dateFormatter(task.due_date)}
                          </Typography>
                        }
              
                      {window.innerWidth >700 && <div>
                      <DeleteTask props={task}/>
                       <CompleteTask props={task}/>
                      </div>}
                       
                    </AccordionSummary>
                    <AccordionDetails  >
                        <Typography style={{fontSize:20,fontFamily:'sans-serif'}}>
                            {task.desc}
                        </Typography>
                    </AccordionDetails>
                    <div style={{marginBottom:'10px'}}>
                    <DeleteTask props={task}/>
                    <CompleteTask props={task}/>
                    </div>
                    
            </Accordion>
            <br/>
            </div>
            )
        })
     }
    </div>
  );
};

export default AllTask;