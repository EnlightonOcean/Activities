import React from "react";
import { Grid} from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities : IActivity[];
    selectedActivity :IActivity|undefined;
    selectActivity: (id:string) => void;
    cancelActivity: () => void;
    editMode : boolean;
    openForm : (id?:string) => void;
    closeForm : () => void;
    createOrEdit : (activity: IActivity) =>void;
    deleteActivity : (id:string) => void;
    submitting : boolean;
}


const ActivityDashborad = ({activities,selectedActivity,
        selectActivity,cancelActivity,editMode,openForm,
        closeForm,createOrEdit,deleteActivity,submitting}: Props) =>
    (
        <Grid>
            <Grid.Column width={10}>
                {/* <List>
                    {activities.map(v=>(
                        <List.Item key={v.id}>
                        {v.title}
                        </List.Item>
                    ))}
                </List> */}
                
                <ActivityList 
                    activities = {activities}
                    selectActivity = {selectActivity}
                    deleteActivity = {deleteActivity}
                    submitting={submitting}
                />
                
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                    activity = {selectedActivity} 
                    cancelActivity ={cancelActivity}
                    openForm ={openForm}    
                />}
                { editMode &&
                    <ActivityForm 
                        closeForm={closeForm} 
                        activity = {selectedActivity}  
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    );

export default ActivityDashborad;