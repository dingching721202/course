import React, { useState } from 'react';
import { courseData } from './courseData';

function CourseContent() {
  const [expandedLesson, setExpandedLesson] = useState(null); // State to track which lesson is expanded

  const handleLessonClick = (lessonId) => {
    // Toggle the expanded state for the clicked lesson
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  return (
    <section>
      <h2>課程內容</h2>
      {courseData.map((lesson) => (
        <div key={lesson.lesson} className="lesson">
          {/* Lesson Title - Clickable Header */}
          {/* This h3 contains the main title and is always visible */}
          <h3
            onClick={() => handleLessonClick(lesson.lesson)}
            className={expandedLesson === lesson.lesson ? 'expanded' : ''}
            title={`Lesson ${lesson.lesson}: ${lesson.title}`} // Add title for full text on hover
          >
            Lesson {lesson.lesson}: {lesson.title}
          </h3>

          {/* Lesson Content - Collapsible Area */}
          {/* This div contains the parts (sub-titles) and textbook link */}
          {/* It is hidden when max-height is 0 in CSS */}
          <div className={`lesson-content ${expandedLesson === lesson.lesson ? 'expanded' : ''}`}>
            {lesson.parts.map((part) => (
              <div key={part.id} className="part">
                {/* Display Part Title (sub-title) */}
                <strong>{part.id} {part.title}</strong>
              </div>
            ))}
            {/* Textbook Link */}
            {lesson.textbook && (
              <p>
                <a href={`#textbook-l${lesson.lesson}`} target="_blank" rel="noopener noreferrer">
                  Textbook L{lesson.lesson}
                </a>
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default CourseContent;