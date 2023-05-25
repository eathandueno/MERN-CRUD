import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditExercise = ({currentExercise, setCurrentExercise}) => {
  
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios.get('http:/localhost:5000/exercises/' + currentExercise)
      .then(response => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(function (error) {
        console.log(error);
      });

    
  }, [id]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date
    };

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <input 
                        className='form-control'
                        type="text"
                        required
                        placeholder={username}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input 
                            type='text'
                            required
                            className='form-control'
                            value={description}
                            onChange={onChangeDescription}
                            placeholder={description}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Duration (in minutes): </label>
                        <input
                            type='text'
                            className='form-control'
                            value={duration}
                            onChange={onChangeDuration}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                            />
                        </div>
                    </div>
                    <br />
                    <div className='form-group'>
                        <input type='submit' value="Edit Exercise Log" className='btn btn-primary' />
                    </div>
                
      </form>
    </div>
  );
};

export default EditExercise;
