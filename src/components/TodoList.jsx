import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

const TodoList = ({ todos, onToggleTodo }) => {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto', borderLeft: '2px dashed rgba(255,255,255,0.3)' }}>
      <h2 className="chalk-text" style={{ marginBottom: '20px', color: 'var(--chalk-blue)' }}>해야 할 일</h2>
      
      {todos.length === 0 ? (
        <p className="chalk-text" style={{ opacity: 0.7, textAlign: 'center', marginTop: '50px' }}>
          오늘은 등록된 할 일이 없어요!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {todos.map(todo => (
            <div 
              key={todo.id} 
              className="chalk-text"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '10px',
                cursor: onToggleTodo ? 'pointer' : 'default',
                opacity: todo.completed ? 0.5 : 1,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              onClick={() => onToggleTodo && onToggleTodo(todo.id)}
            >
              {todo.completed ? <CheckSquare size={24} /> : <Square size={24} />}
              <span style={{ fontSize: '1.2rem' }}>{todo.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
