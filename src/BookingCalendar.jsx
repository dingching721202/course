import React, { useState, useMemo, useCallback } from 'react';
import { availableSlotsData } from './availableSlotsData';

// Helper function to get days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the day of the week for the first day of the month
const getFirstDayOfWeek = (year, month) => {
  return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to format date for display (e.g., 2025年6月2日 星期一)
const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
};

// Helper function to extract Chinese title from full title
const getChineseTitle = (fullTitle) => {
    const parts = fullTitle.split(' | ');
    return parts.length > 1 ? parts[1] : fullTitle; // Return Chinese part if exists, otherwise full title
};


function BookingCalendar() {
  // State for the currently displayed month and year
  const [displayYear, setDisplayYear] = useState(2025); // Initial year
  const [displayMonth, setDisplayMonth] = useState(5); // Initial month (0-indexed: 5 is June)

  // State for the current view ('month' or 'list')
  const [view, setView] = useState('month'); // Initial view

  const [slots, setSlots] = useState(availableSlotsData);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Filter and group slots by date for the currently displayed month/year
  const slotsByMonth = useMemo(() => {
    const grouped = {};
    const currentMonthSlots = slots.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.getFullYear() === displayYear && slotDate.getMonth() === displayMonth;
    });

    // Sort slots within each day by time
    currentMonthSlots.forEach(slot => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });

    // Sort dates
    const sortedDates = Object.keys(grouped).sort();
    const sortedGrouped = {};
    sortedDates.forEach(date => {
        sortedGrouped[date] = grouped[date].sort((a, b) => a.time.localeCompare(b.time));
    });

    return sortedGrouped;

  }, [slots, displayYear, displayMonth]); // Re-calculate when slots, year, or month changes


  // Generate calendar days for the month view
  const daysInMonth = getDaysInMonth(displayYear, displayMonth);
  const firstDayOfWeek = getFirstDayOfWeek(displayYear, displayMonth); // 0 (Sun) - 6 (Sat)

  // Create an array representing the calendar grid
  const calendarDays = useMemo(() => {
      const days = [];
      // Add padding days from the previous month
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null); // Use null for empty padding cells
      }
      // Add days of the current month
      for (let i = 1; i <= daysInMonth; i++) {
        const dateString = `${displayYear}-${(displayMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        days.push({ day: i, dateString: dateString });
      }
      // Add padding days for the next month (to fill the last week row)
      while (days.length % 7 !== 0) {
        days.push(null);
      }
      return days;
  }, [displayYear, displayMonth, daysInMonth, firstDayOfWeek]);


  const handleSlotClick = useCallback((slotId) => {
    const slot = slots.find(s => s.id === slotId);
    if (!slot || slot.booked) return; // Cannot select booked slots

    const isSelected = selectedSlots.some(s => s.id === slotId);

    if (isSelected) {
      // Deselect the slot
      setSelectedSlots(selectedSlots.filter(s => s.id !== slotId));
    } else {
      // Select the slot
      setSelectedSlots([...selectedSlots, slot]);
    }
  }, [slots, selectedSlots]);

  const handleConfirmBooking = useCallback(() => {
    if (selectedSlots.length === 0) {
      alert("請選擇至少一個時段進行預約。");
      return;
    }
    // In a real application, you would send the selectedSlots data to a backend
    console.log("確定預約以下時段:", selectedSlots);
    alert(`已確定預約 ${selectedSlots.length} 個時段。\n\n${selectedSlots.map(s => `${formatDisplayDate(s.date)} ${s.time} - ${s.lessonTitle}`).join('\n')}`);

    // Optionally, mark selected slots as booked and clear selection
    const updatedSlots = slots.map(slot =>
      selectedSlots.some(s => s.id === slot.id) ? { ...slot, booked: true } : slot
    );
    setSlots(updatedSlots);
    setSelectedSlots([]);
  }, [selectedSlots, slots]);

  // Handle month navigation
  const handleMonthChange = useCallback((direction) => {
      const newDate = new Date(displayYear, displayMonth + direction, 1);
      setDisplayYear(newDate.getFullYear());
      setDisplayMonth(newDate.getMonth());
  }, [displayYear, displayMonth]);


  // Format the display month
  const displayMonthText = new Date(displayYear, displayMonth).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' });


  // Generate options for year and month selects
  const years = Array.from({ length: 5 }, (_, i) => 2024 + i); // 2024 to 2028
  const months = Array.from({ length: 12 }, (_, i) => i); // 0 to 11

  return (
    <section className="calendar-section">
      <h2>課程預約</h2>

      <div className="calendar-controls">
        {/* Date Navigation (always visible) */}
        <div className="date-nav">
            <button onClick={() => handleMonthChange(-1)}>{"<"}</button>
            <select value={displayYear} onChange={(e) => setDisplayYear(Number(e.target.value))}>
              {years.map(year => (
                <option key={year} value={year}>{year} 年</option>
              ))}
            </select>
            <select value={displayMonth} onChange={(e) => setDisplayMonth(Number(e.target.value))}>
              {months.map(month => (
                <option key={month} value={month}>{month + 1} 月</option>
              ))}
            </select>
            <button onClick={() => handleMonthChange(1)}>{">"}</button>
        </div>

        {/* View Toggle */}
        <div className="view-toggle">
            <button
                className={view === 'month' ? 'active' : ''}
                onClick={() => setView('month')}
            >
                月曆
            </button>
            <button
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}
            >
                列表
            </button>
        </div>
      </div>

      {/* Month View */}
      {view === 'month' && (
        <>
            {/* Month/Year display is now part of date-nav or can be added here if preferred */}
            {/* <h3>{displayMonthText}</h3> */}
            <div className="calendar-header">
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>

            <div className="calendar-grid">
                {calendarDays.map((dayInfo, index) => (
                <div key={index} className={`calendar-day ${dayInfo ? '' : 'empty'}`}>
                    {dayInfo && (
                    <>
                        <div className="day-number">{dayInfo.day}</div>
                        <div className="day-slots">
                        {/* Filter slots again here to only show slots for this specific day */}
                        {slotsByMonth[dayInfo.dateString]?.map(slot => (
                            <div
                            key={slot.id}
                            className={`time-slot ${slot.booked ? 'booked' : (selectedSlots.some(s => s.id === slot.id) ? 'selected' : 'available')}`}
                            onClick={() => handleSlotClick(slot.id)}
                            >
                            {slot.time}
                            <br />
                            {/* Display ONLY Chinese title in month view */}
                            <small>{getChineseTitle(slot.lessonTitle)}</small>
                            </div>
                        ))}
                        </div>
                    </>
                    )}
                </div>
                ))}
            </div>
        </>
      )}

      {/* List View */}
      {view === 'list' && (
          <div className="list-view">
              {/* Date navigation is above */}
              <h3>{displayMonthText} 可預約時段列表</h3>
              {Object.keys(slotsByMonth).length > 0 ? (
                  Object.keys(slotsByMonth).map(dateString => (
                      <div key={dateString} className="list-day-group">
                          <h4 className="list-date-header">{formatDisplayDate(dateString)}</h4>
                          {slotsByMonth[dateString].map(slot => (
                              <div
                                  key={slot.id}
                                  className={`time-slot ${slot.booked ? 'booked' : (selectedSlots.some(s => s.id === slot.id) ? 'selected' : 'available')}`}
                                  onClick={() => handleSlotClick(slot.id)}
                              >
                                  {/* Display time and full lesson title in list view */}
                                  {slot.time} <small>{slot.lessonTitle}</small>
                              </div>
                          ))}
                      </div>
                  ))
              ) : (
                  <p>本月沒有可預約時段。</p>
              )}
          </div>
      )}


      {selectedSlots.length > 0 && (
        <div className="selected-slots">
          <h3>已選擇的時段 ({selectedSlots.length} 次)</h3>
          <ul>
            {selectedSlots.map(slot => (
              <li key={slot.id}>
                {/* Display formatted date with weekday, time, and full lesson title */}
                {formatDisplayDate(slot.date)} {slot.time} - {slot.lessonTitle}
              </li>
            ))}
          </ul>
          <button onClick={handleConfirmBooking}>確定預約 ({selectedSlots.length} 次)</button>
          <button onClick={() => setSelectedSlots([])}>取消選擇</button>
        </div>
      )}
    </section>
  );
}

export default BookingCalendar;