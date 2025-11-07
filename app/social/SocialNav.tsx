'use client';

interface SocialNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SocialNav({ activeTab, setActiveTab }: SocialNavProps) {
  const tabs = [
    { key: 'feed', label: 'Activity Feed', icon: 'ri-timeline-line' },
    { key: 'pods', label: 'Trip Pods', icon: 'ri-group-line' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium cursor-pointer whitespace-nowrap ${
              activeTab === tab.key 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={`${tab.icon} text-sm`}></i>
            </div>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}