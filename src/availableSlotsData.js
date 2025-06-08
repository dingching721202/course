import { courseData } from './courseData';

// Helper to find lesson title by id (e.g., '1-1')
const findLessonTitle = (partId) => {
  const [lessonNum, partNum] = partId.split('-').map(Number);
  const lesson = courseData.find(l => l.lesson === lessonNum);
  if (lesson && lesson.parts[partNum - 1]) {
    // Return the full original title including English and Chinese
    return lesson.parts[partNum - 1].title;
  }
  return `Lesson ${partId}`; // Fallback
};


export const availableSlotsData = [
  // Example data for June 2025 (Initial display month)
  { id: 101, date: '2025-06-02', time: '10:00', partId: '1-1', lessonTitle: findLessonTitle('1-1'), booked: false },
  { id: 102, date: '2025-06-02', time: '11:00', partId: '1-2', lessonTitle: findLessonTitle('1-2'), booked: false },
  { id: 103, date: '2025-06-03', time: '14:00', partId: '2-1', lessonTitle: findLessonTitle('2-1'), booked: false },
  { id: 104, date: '2025-06-04', time: '09:00', partId: '1-3', lessonTitle: findLessonTitle('1-3'), booked: false },
  { id: 105, date: '2025-06-05', time: '10:00', partId: '2-2', lessonTitle: findLessonTitle('2-2'), booked: false },
  { id: 106, date: '2025-06-06', time: '15:00', partId: '3-1', lessonTitle: findLessonTitle('3-1'), booked: false },
  { id: 107, date: '2025-06-09', time: '10:00', partId: '2-3', lessonTitle: findLessonTitle('2-3'), booked: false },
  { id: 108, date: '2025-06-10', time: '11:00', partId: '3-2', lessonTitle: findLessonTitle('3-2'), booked: false },
  { id: 109, date: '2025-06-11', time: '13:00', partId: '4-1', lessonTitle: findLessonTitle('4-1'), booked: false },
  { id: 110, date: '2025-06-12', time: '10:00', partId: '3-3', lessonTitle: findLessonTitle('3-3'), booked: false },
  { id: 111, date: '2025-06-13', time: '14:00', partId: '4-2', lessonTitle: findLessonTitle('4-2'), booked: false },
  { id: 112, date: '2025-06-16', time: '16:00', partId: '5-1', lessonTitle: findLessonTitle('5-1'), booked: false },
  { id: 113, date: '2025-06-17', time: '10:00', partId: '4-3', lessonTitle: findLessonTitle('4-3'), booked: false },
  { id: 114, date: '2025-06-18', time: '11:00', partId: '5-2', lessonTitle: findLessonTitle('5-2'), booked: false },
  { id: 115, date: '2025-06-19', time: '15:00', partId: '6-1', lessonTitle: findLessonTitle('6-1'), booked: false },
  { id: 116, date: '2025-06-20', time: '10:00', partId: '5-3', lessonTitle: findLessonTitle('5-3'), booked: false },
  { id: 117, date: '2025-06-23', time: '11:00', partId: '6-2', lessonTitle: findLessonTitle('6-2'), booked: false },
  { id: 118, date: '2025-06-24', time: '14:00', partId: '7-1', lessonTitle: findLessonTitle('7-1'), booked: false },
  { id: 119, date: '2025-06-25', time: '10:00', partId: '7-2', lessonTitle: findLessonTitle('7-2'), booked: false },
  { id: 120, date: '2025-06-26', time: '11:00', partId: '7-3', lessonTitle: findLessonTitle('7-3'), booked: false },
  { id: 121, date: '2025-06-27', time: '15:00', partId: '8-1', lessonTitle: findLessonTitle('8-1'), booked: false },


  // Keep existing July 2024 data for demonstration of multiple months
  { id: 1, date: '2024-07-15', time: '10:00', partId: '1-1', lessonTitle: findLessonTitle('1-1'), booked: false },
  { id: 2, date: '2024-07-15', time: '11:00', partId: '1-2', lessonTitle: findLessonTitle('1-2'), booked: false },
  { id: 3, date: '2024-07-15', time: '14:00', partId: '2-1', lessonTitle: findLessonTitle('2-1'), booked: false },
  { id: 4, date: '2024-07-16', time: '09:00', partId: '1-3', lessonTitle: findLessonTitle('1-3'), booked: false },
  { id: 5, date: '2024-07-16', time: '10:00', partId: '2-2', lessonTitle: findLessonTitle('2-2'), booked: false },
  { id: 6, date: '2024-07-16', time: '15:00', partId: '3-1', lessonTitle: findLessonTitle('3-1'), booked: false },
  { id: 7, date: '2024-07-17', time: '10:00', partId: '2-3', lessonTitle: findLessonTitle('2-3'), booked: false },
  { id: 8, date: '2024-07-17', time: '11:00', partId: '3-2', lessonTitle: findLessonTitle('3-2'), booked: false },
  { id: 9, date: '2024-07-17', time: '13:00', partId: '4-1', lessonTitle: findLessonTitle('4-1'), booked: false },
  { id: 10, date: '2024-07-18', time: '10:00', partId: '3-3', lessonTitle: findLessonTitle('3-3'), booked: false },
  { id: 11, date: '2024-07-18', time: '14:00', partId: '4-2', lessonTitle: findLessonTitle('4-2'), booked: false },
  { id: 12, date: '2024-07-18', time: '16:00', partId: '5-1', lessonTitle: findLessonTitle('5-1'), booked: false },
  { id: 13, date: '2024-07-19', time: '10:00', partId: '4-3', lessonTitle: findLessonTitle('4-3'), booked: false },
  { id: 14, date: '2024-07-19', time: '11:00', partId: '5-2', lessonTitle: findLessonTitle('5-2'), booked: false },
  { id: 15, date: '2024-07-19', time: '15:00', partId: '6-1', lessonTitle: findLessonTitle('6-1'), booked: false },
];