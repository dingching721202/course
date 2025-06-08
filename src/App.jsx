import React from 'react';
import CourseContent from './CourseContent';
import BookingCalendar from './BookingCalendar';
import './App.css'; // You can add specific App styling here if needed

function App() {
  return (
    <div className="container">
      <h1>華語文初級課程</h1>
      <CourseContent />
      <BookingCalendar />
    </div>
  );
}

export default App;