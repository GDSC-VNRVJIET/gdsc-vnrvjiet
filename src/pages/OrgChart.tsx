import React, { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { orgChartData, TeamMember } from "./orgChartData";

type OpenBy = "hover" | "click";

const TeamMemberCard: React.FC<{
  member: TeamMember;
  onEnter: (member: TeamMember, el: HTMLElement) => void;
  onLeave: () => void;
  onClickToggle: (member: TeamMember, el: HTMLElement) => void;
}> = ({ member, onEnter, onLeave, onClickToggle }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center cursor-pointer"
      onMouseEnter={(e) => onEnter(member, ref.current || (e.currentTarget as HTMLElement))}
      onMouseLeave={onLeave}
      onClick={(e) => onClickToggle(member, ref.current || (e.currentTarget as HTMLElement))}
    >
      <img
        src={member.img}
        alt={member.name}
        className="w-36 h-36 rounded-full object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{member.role}</h3>
      <p className="text-md text-gray-600">{member.name}</p>
    </div>
  );
};

const OrgChart: React.FC = () => {
  const [year, setYear] = useState<number>(2026);

  const dataToDisplay = useMemo(() => orgChartData[year], [year]);

  // Simplified popup state management
  const [popupMember, setPopupMember] = useState<TeamMember | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const hideTimer = useRef<number | null>(null);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const showPopup = (member: TeamMember, el: HTMLElement) => {
    clearHideTimer();
    const rect = el.getBoundingClientRect();
    // position popup directly adjacent (no gap) and center horizontally
    setPopupPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX + rect.width / 2 });
    setPopupMember(member);
  };

  const hidePopup = () => {
    setPopupMember(null);
    setPopupPos(null);
  };

  const hidePopupDelayed = (delay = 200) => {
    clearHideTimer();
    hideTimer.current = window.setTimeout(() => {
      hidePopup();
    }, delay);
  };

  useEffect(() => {
    return () => {
      clearHideTimer();
    };
  }, []);

  const handleCardEnter = (member: TeamMember, el: HTMLElement) => showPopup(member, el);
  const handleCardLeave = () => hidePopupDelayed();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Organizational Chart
      </h1>

      <div className="flex space-x-4 mb-8">
        {[2026, 2025, 2024].map((y) => (
          <button
            key={y}
            className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
              year === y
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-8">
        <TeamMemberCard member={dataToDisplay.facultyAdvisor} onEnter={handleCardEnter} onLeave={handleCardLeave} onClickToggle={handleCardEnter} />
        <TeamMemberCard member={dataToDisplay.lead} onEnter={handleCardEnter} onLeave={handleCardLeave} onClickToggle={handleCardEnter} />
      </div>

      <div className="mt-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {dataToDisplay.domainLeads.map((lead) => (
            <TeamMemberCard key={lead.name} member={lead} onEnter={handleCardEnter} onLeave={handleCardLeave} onClickToggle={handleCardEnter} />
          ))}
        </div>
      </div>
      {/* central popup overlay with improved event handling */}
      {popupMember && popupPos && createPortal(
        <div
          style={{ position: "absolute", top: popupPos.top, left: popupPos.left, transform: "translateX(-50%)" }}
          className="z-50 w-80"
          onMouseEnter={() => clearHideTimer()}
          onMouseLeave={() => hidePopupDelayed()}
          onClick={() => hidePopup()}
        >
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h4 className="text-md font-semibold text-blue-700 mb-2">{popupMember.role} — {popupMember.name}</h4>
            {popupMember.coordinators && popupMember.coordinators.length > 0 && (
              <div className="mt-2">
                <h5 className="text-sm font-semibold text-gray-800">Coordinators</h5>
                <div className="flex flex-wrap gap-3 mt-2">
                  {popupMember.coordinators.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <img src={c.img} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {popupMember.volunteers && popupMember.volunteers.length > 0 && (
              <div className="mt-3">
                <h5 className="text-sm font-semibold text-gray-800">Volunteers</h5>
                <div className="flex flex-wrap gap-3 mt-2">
                  {popupMember.volunteers.map((v) => (
                    <div key={v.name} className="flex items-center gap-2">
                      <img src={v.img} alt={v.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-sm font-medium">{v.name}</div>
                        <div className="text-xs text-gray-500">{v.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default OrgChart;
