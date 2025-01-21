'use client';

import { Plus, X, Edit2 } from 'lucide-react';
import { TabData } from '../types';
import { useState } from 'react';

interface TabsProps {
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabAdd: () => void;
  onTabRemove: (tabId: string) => void;
  onTabRename: (tabId: string, name: string) => void;
}

export function Tabs({ 
  tabs, 
  activeTabId, 
  onTabChange, 
  onTabAdd, 
  onTabRemove,
  onTabRename 
}: TabsProps) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);

  const handleEditClick = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    setEditingTabId(tabId);
  };

  const handleInputBlur = () => {
    setEditingTabId(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setEditingTabId(null);
    }
  };

  return (
    <div className="flex items-center gap-1 border-b border-light-border dark:border-dark-border mb-4">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`group relative flex items-center gap-2 px-4 py-2 cursor-pointer border-b-2 ${
            tab.id === activeTabId
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent hover:border-light-border dark:hover:border-dark-border'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {editingTabId === tab.id ? (
            <input
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 outline-none text-light-text dark:text-dark-text"
              value={tab.name}
              onChange={(e) => onTabRename(tab.id, e.target.value)}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-light-text dark:text-dark-text">{tab.name}</span>
          )}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="hover:text-blue-400 p-1"
              onClick={(e) => handleEditClick(e, tab.id)}
            >
              <Edit2 size={14} />
            </button>
            {tabs.length > 1 && (
              <button
                className="hover:text-red-400 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabRemove(tab.id);
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        className="p-2 hover:bg-light-surface dark:hover:bg-dark-surface rounded text-light-text dark:text-dark-text"
        onClick={onTabAdd}
      >
        <Plus size={18} />
      </button>
    </div>
  );
} 