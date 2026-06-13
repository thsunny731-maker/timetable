import React, { useState } from 'react';
import { Trash2, Plus, LogOut, Save } from 'lucide-react';

const TeacherDashboard = ({ timetable, todos, onSave, onExit }) => {
  const [editTimetable, setEditTimetable] = useState([...timetable]);
  const [editTodos, setEditTodos] = useState([...todos]);
  const [newTodoText, setNewTodoText] = useState('');

  const handleTimetableChange = (id, field, value) => {
    setEditTimetable(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false
    };
    setEditTodos([...editTodos, newTodo]);
    setNewTodoText('');
  };

  const handleDeleteTodo = (id) => {
    setEditTodos(editTodos.filter(todo => todo.id !== id));
  };

  const handleSave = () => {
    onSave(editTimetable, editTodos);
    alert('저장되었습니다.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="chalk-text" style={{ color: 'var(--chalk-pink)' }}>👨‍🏫 교사 모드 (설정)</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="chalk-button" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Save size={20} /> 저장
          </button>
          <button className="chalk-button" onClick={onExit} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <LogOut size={20} /> 나가기
          </button>
        </div>
      </div>

      <div className="content-wrapper" style={{ overflowY: 'auto' }}>
        <div style={{ flex: 1, paddingRight: '20px' }}>
          <h3 className="chalk-text" style={{ color: 'var(--chalk-yellow)', marginBottom: '15px' }}>시간표 설정</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {editTimetable.map(period => (
              <div key={period.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  className="chalk-input" 
                  style={{ width: '30%', fontSize: '1.2rem', textAlign: 'left' }}
                  value={period.name}
                  onChange={(e) => handleTimetableChange(period.id, 'name', e.target.value)}
                />
                <input 
                  type="time"
                  className="chalk-input" 
                  style={{ width: '30%', fontSize: '1.2rem' }}
                  value={period.startTime}
                  onChange={(e) => handleTimetableChange(period.id, 'startTime', e.target.value)}
                />
                <span className="chalk-text">~</span>
                <input 
                  type="time"
                  className="chalk-input" 
                  style={{ width: '30%', fontSize: '1.2rem' }}
                  value={period.endTime}
                  onChange={(e) => handleTimetableChange(period.id, 'endTime', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, borderLeft: '2px dashed rgba(255,255,255,0.3)', paddingLeft: '20px' }}>
          <h3 className="chalk-text" style={{ color: 'var(--chalk-blue)', marginBottom: '15px' }}>할 일 관리</h3>
          
          <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              className="chalk-input" 
              placeholder="새로운 할 일 입력..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              style={{ textAlign: 'left', margin: 0 }}
            />
            <button type="submit" className="chalk-button" style={{ margin: 0, padding: '5px 10px' }}>
              <Plus size={24} />
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {editTodos.map(todo => (
              <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="chalk-text" style={{ fontSize: '1.2rem' }}>{todo.text}</span>
                <button 
                  className="chalk-button" 
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{ padding: '5px', margin: 0, border: 'none', color: 'var(--chalk-pink)' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
