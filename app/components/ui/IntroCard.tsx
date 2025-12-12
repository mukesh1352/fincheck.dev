interface Props {
  onEnter: () => void;
}

export default function IntroCard({ onEnter }: Props) {
  return (
    <div className="content-card">
      <h1 className="main-title">Final Year Project</h1>

      <div className="info-section">
        <p className="group-label">Group 73</p>
        <div className="member-list">
          <p>CSE22363</p>
          <p>CSE22505</p>
          <p>CSE22526</p>
          <p>CSE22531</p>
        </div>
      </div>

      <button type="button" className="primary-button" onClick={onEnter}>
        Enter
      </button>
    </div>
  );
}
