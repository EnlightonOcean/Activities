import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
interface Props{
    closeForm: () => void;
    activity : IActivity | undefined;
    createOrEdit:(activity:IActivity) =>void;
    submitting: boolean;
}

const ActivityForm = ({closeForm,activity : selectedActivity,createOrEdit,submitting}:Props) => {
    const initialState = selectedActivity ?? {
        id: '',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }

    const [activity,setActivity] = useState<IActivity>(initialState);

    const handleSubmit = () => {
        //console.log(activity);
        createOrEdit(activity);
    }

    const handleInputChange = (e : ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) => {
       const {name ,value} = e.target;
       setActivity({...activity,[name]:value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={() => handleSubmit()} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={submitting} floated="right" positive type="submit" content='Submit'/>
                <Button floated="right" type="button" content='Cancel' onClick={() => closeForm()}/>
            </Form>
        </Segment>
    );
}
export default ActivityForm;