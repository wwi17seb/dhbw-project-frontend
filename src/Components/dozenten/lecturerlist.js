import axios from 'axios';
import React, { forwardRef } from 'react';


export default class LecturerList extends React.Component {
  state = {
    lecturers: []
  }

  componentDidMount() {
    axios.get(`api/lecturers`)
      .then(res => {
        const lecturers = res.data;
        this.setState({ lecturers });
      })
  }

  render() {
    return (
      <ul>
        { this.state.lecturers.map(lecturers =>
            
            <><li>lecturers.lecturer_id</li>
            <li>lecturers.firstname</li>
            <li>lecturers.lastname</li>
            <li>lecturers.academic_title</li>
            <li>lecturers.email</li>
            <li>lecturers.salutation</li>
            <li>lecturers.phonenumber</li>
            <li>lecturers.experience</li>
            <li>lecturers.comment</li>
            <li>lecturers.is_extern</li>
            </>
            )}
      </ul>
    )
  }
}
