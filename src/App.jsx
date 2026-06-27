import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Lock } from 'lucide-react';
import Timetable from './components/Timetable';
import TodoList from './components/TodoList';
import TeacherModeModal from './components/TeacherModeModal';
import TeacherDashboard from './components/TeacherDashboard';
import NotificationModal from './components/NotificationModal';
import EthicsGate from './components/EthicsGate';
import PolicyModal from './components/PolicyModal';

import privacyPolicyRaw from '../../개인정보처리방침.md?raw';
import termsOfServiceRaw from '../../이용약관.md?raw';
// 기본 시간표 데이터
const defaultTimetable = [
  { id: 1, name: '아침 활동', startTime: '08:40', endTime: '09:00' },
  { id: 2, name: '1교시', startTime: '09:00', endTime: '09:40' },
  { id: 3, name: '2교시', startTime: '09:40', endTime: '10:20' },
  { id: 4, name: '중간 놀이', startTime: '10:20', endTime: '10:40', isRecess: true },
  { id: 5, name: '3교시', startTime: '10:40', endTime: '11:20' },
  { id: 6, name: '4교시', startTime: '11:20', endTime: '12:00' },
  { id: 7, name: '점심 시간', startTime: '12:00', endTime: '13:00', isRecess: true },
  { id: 8, name: '5교시', startTime: '13:00', endTime: '13:40' },
  { id: 9, name: '6교시', startTime: '13:40', endTime: '14:20' },
  { id: 10, name: '종례', startTime: '14:20', endTime: '14:30' },
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timetable, setTimetable] = useState(defaultTimetable);
  const [todos, setTodos] = useState([]);
  
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [isEthicsAgreed, setIsEthicsAgreed] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedTimetable = localStorage.getItem('timetable');
    const savedTodos = localStorage.getItem('todos');
    
    if (savedTimetable) setTimetable(JSON.parse(savedTimetable));
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  // 타이머 1초마다 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      checkNotifications(now);
    }, 1000);
    return () => clearInterval(timer);
  }, [timetable]);

  // 알림 체크 로직 (쉬는 시간 종료 3분 전)
  const checkNotifications = (now) => {
    const currentH = now.getHours();
    const currentM = now.getMinutes();
    const currentTotalM = currentH * 60 + currentM;

    // 초가 0일 때만 체크해서 한 번만 알림을 띄우게 함 (간이 로직)
    if (now.getSeconds() !== 0) return;

    timetable.forEach(period => {
      if (period.isRecess) {
        const [endH, endM] = period.endTime.split(':').map(Number);
        const endTotalM = endH * 60 + endM;
        
        // 종료 3분 전
        if (endTotalM - currentTotalM === 3) {
          setNotificationMsg("수업 시작 3분 전입니다! 자리에 앉아 준비해 주세요.");
          setShowNotification(true);
        }
      }
    });
  };

  const handleSaveData = (newTimetable, newTodos) => {
    setTimetable(newTimetable);
    setTodos(newTodos);
    localStorage.setItem('timetable', JSON.stringify(newTimetable));
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  if (!isEthicsAgreed) {
    return <EthicsGate onAgreed={() => setIsEthicsAgreed(true)} />;
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="chalk-text" style={{ fontSize: '2.5rem' }}>우리반 시간표</h1>
        <div className="time-display">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>

      {!isTeacherMode ? (
        <div className="content-wrapper">
          <div style={{ flex: 2 }}>
            <Timetable timetable={timetable} currentTime={currentTime} />
          </div>
          <div style={{ flex: 1 }}>
            <TodoList todos={todos} />
          </div>
        </div>
      ) : (
        <TeacherDashboard 
          timetable={timetable} 
          todos={todos} 
          onSave={handleSaveData}
          onExit={() => setIsTeacherMode(false)}
        />
      )}

      {/* 숨겨진 자물쇠 아이콘 */}
      {!isTeacherMode && (
        <Lock 
          className="lock-icon chalk-text" 
          size={32} 
          onClick={() => setShowTeacherModal(true)} 
        />
      )}

      {/* 교사 모드 진입 모달 */}
      {showTeacherModal && (
        <TeacherModeModal 
          onClose={() => setShowTeacherModal(false)}
          onSuccess={() => {
            setShowTeacherModal(false);
            setIsTeacherMode(true);
          }}
        />
      )}

      {/* 3분 전 알림 모달 */}
      {showNotification && (
        <NotificationModal 
          message={notificationMsg}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* 푸터 (약관 및 저작권 정보) */}
      <footer className="app-footer">
        © 2026 우리반 시간표. All rights reserved. | 
        <button onClick={() => setActivePolicy('terms')} className="footer-link">이용약관</button> | 
        <button onClick={() => setActivePolicy('privacy')} className="footer-link">개인정보처리방침</button> | 
        정보관리책임자: 김혜선 교사 (서울송례초등학교)
      </footer>

      {/* 정책 모달 */}
      {activePolicy === 'terms' && (
        <PolicyModal 
          title="이용약관"
          markdownContent={termsOfServiceRaw}
          onClose={() => setActivePolicy(null)}
        />
      )}
      {activePolicy === 'privacy' && (
        <PolicyModal 
          title="개인정보처리방침"
          markdownContent={privacyPolicyRaw}
          onClose={() => setActivePolicy(null)}
        />
      )}
    </div>
  );
}

export default App;
