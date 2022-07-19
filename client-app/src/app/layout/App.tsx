import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashborad from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import Agent from '../api/agent';
import LoadingComponents from './loadingComponent';

function App() {
  
  //const url="https://localhost:5001/api/";
  const [activities,setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setActivity] = useState<IActivity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  const [loading,setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);



  useEffect(() => {
    // axios.get<IActivity[]>(url+'Activities').then(r => {
    //   //console.log(r);
    //   setActivities(r.data);
    // })
    Agent.Activities.list().then(r => {
      let activities: IActivity[] =[];
      r.forEach(a => {
        a.date = a.date.split('T')[0];
        activities.push(a);
      });
      setActivities(activities);
      setLoading(false);
    })
  },[]);

  const handleSelectActivity = (id:string) => {
    setActivity(activities.find(x => x.id === id));
  };

  const handleCancelActivity = () => {
    setActivity(undefined);
  };

  const handleFormOpen = (id?:string) => {
    id ?  handleSelectActivity(id): handleCancelActivity() ; 
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCreateOrEditActivity = (activity :IActivity) =>{
    setSubmitting(true);
    if(activity.id){
      Agent.Activities.update(activity).then(() =>{
        setActivities([...activities.filter(x => x.id !== activity.id),activity]);
        setActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id=uuid();
      Agent.Activities.create(activity).then(() => {
        setActivities([...activities,activity]);
        setActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
    // activity.id 
    // ? setActivities([...activities.filter(x => x.id !== activity.id),activity]) 
    // : setActivities([...activities,{...activity,id:uuid()}]);
    // setEditMode(false);
    // setActivity(activity);
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    Agent.Activities.delete(id).then(() =>{
      setActivities(activities.filter(x => x.id !== id));
      setSubmitting(false);
    });
  }

  if (loading) return (
    <LoadingComponents content='Loading App ...'/>
  );
  return (
    <>
      {/* <Header as='h2' icon='users' content='Reactivities' /> */}
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
      <ActivityDashborad 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
      />
      </Container>
    </>
  );
}

export default App;
