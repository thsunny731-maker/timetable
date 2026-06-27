import React from 'react';
import { 
  Lightbulb, 
  Brain, 
  Search, 
  Rocket, 
  ShieldAlert, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

const guides = [
  {
    id: 1,
    title: "생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요.",
    description: "생성형 AI를 사용하기 전에 '지금 내가 왜 쓰려고 하지?'라고 스스로 물어보세요. 생성형 AI는 내 생각을 대신해주는 게 아니라, 내 생각을 도와주는 도구임을 기억하세요. 모든 공부에 생성형 AI가 필요한 것은 아니므로, 지금 하는 활동에 생성형 AI를 사용하는 것이 나의 학습에 정말 도움이 될지 먼저 고민해요.",
    icon: <Lightbulb className="guide-icon" size={28} />,
    color: "#f59e0b"
  },
  {
    id: 2,
    title: "생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요.",
    description: "막막할 때 바로 생성형 AI에게 묻고 싶은 마음이 들 수 있지만, 먼저 스스로 시도해 보아야 나의 성장에 도움이 돼요. 주제에 대해 내가 아는 것과 내 아이디어를 먼저 공책에 적거나 정리한 뒤에 생성형 AI를 활용하세요.",
    icon: <Brain className="guide-icon" size={28} />,
    color: "#f97316"
  },
  {
    id: 3,
    title: "생성형 AI가 틀릴 수 있다는 점을 알아요.",
    description: "생성형 AI는 틀린 정보를 마치 사실인 것처럼 제시하기도 하므로, 알려준 내용은 항상 '정말 맞을까?' 하고 한 번 더 확인하는 습관을 가져요. 중요한 내용일수록 책을 찾아보거나 선생님께 여쭤보는 등 다른 방법으로 꼭 다시 확인하세요.",
    icon: <Search className="guide-icon" size={28} />,
    color: "#ef4444"
  },
  {
    id: 4,
    title: "생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요.",
    description: "생성형 AI를 내 생각의 범위를 넓혀주는 도구로 사용해보세요. 생성형 AI의 결과물을 그대로 사용하지 않고, 나의 경험과 생각을 더하여 나만의 색깔을 담은 최종 결과물을 만들어요.",
    icon: <Rocket className="guide-icon" size={28} />,
    color: "#8b5cf6"
  },
  {
    id: 5,
    title: "나의 정보와 비밀을 말하지 않아요.",
    description: "내가 입력한 정보는 어디에서 어떻게 사용될지 모르기 때문에 이름, 주소, 학교, 전화번호 같은 개인정보는 생성형 AI에게 알려주면 안돼요. 생성형 AI는 계산된 답변을 내놓는 프로그램이라 감정이 없어요. 나의 고민을 털어놓으며 지나치게 의지하기보다, 친구나 부모님, 선생님과의 실제 대화를 통해 마음을 나누어요.",
    icon: <ShieldAlert className="guide-icon" size={28} />,
    color: "#3b82f6"
  },
  {
    id: 6,
    title: "생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요.",
    description: "어느 부분이 생성형 AI의 것이고 어느 부분이 나의 것인지 명확히 밝히는 것은 나 자신을 속이지 않는 정직한 태도예요. 생성형 AI를 쓴 사실을 정직하게 밝힐 때 나의 노력이 더 빛나고 가치 있게 인정받을 수 있어요.",
    icon: <HeartHandshake className="guide-icon" size={28} />,
    color: "#10b981"
  }
];

const EthicsGate = ({ onAgreed }) => {
  return (
    <div className="ethics-gate-container">
      <div className="ethics-gate-content">
        <h1 className="ethics-title chalk-text">초등 AI 윤리 핵심가이드</h1>
        <p className="ethics-subtitle">안전하고 올바른 AI 활용을 위해 아래 가이드를 꼭 읽어주세요.</p>
        
        <div className="guides-list">
          {guides.map((guide) => (
            <div key={guide.id} className="guide-card">
              <div className="guide-icon-wrapper" style={{ backgroundColor: guide.color }}>
                {guide.icon}
              </div>
              <div className="guide-text">
                <h3 className="guide-heading">
                  <span className="guide-number">가이드 {guide.id}</span>
                  {guide.title}
                </h3>
                <p className="guide-description">{guide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="ethics-gate-footer">
        <button className="agree-button" onClick={onAgreed}>
          <CheckCircle2 size={24} />
          나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
        </button>
      </div>
    </div>
  );
};

export default EthicsGate;
