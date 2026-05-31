import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

const AchievementsForm = ({ data = [], onChange }) => {
  const addAchievement = () => {
    const newAchievement = {
      title: "",
      description: ""
    };
    onChange([...data, newAchievement]);
  };

  const removeAchievement = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateAchievement = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Award className="size-5 text-indigo-600 dark:text-indigo-400" />
            Key Achievements
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add major accomplishments or recognition</p>
        </div>
        <button
          onClick={addAchievement}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Achievement
        </button>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <Award className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No achievements added yet.</p>
            <p className="text-xs text-gray-400">Click "Add Achievement" to add items like academic awards or project recognition.</p>
          </div>
        ) : (
          data.map((achievement, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Achievement #{index + 1}</h4>
                <button
                  onClick={() => removeAchievement(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  value={achievement.title || ""}
                  onChange={(e) => updateAchievement(index, "title", e.target.value)}
                  type="text"
                  placeholder="Achievement Title (e.g. GPA Excellence, Best Developer Award)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                />

                <textarea
                  rows={3}
                  value={achievement.description || ""}
                  onChange={(e) => updateAchievement(index, "description", e.target.value)}
                  placeholder="Describe your achievement (e.g. Maintained an 8.7 GPA over 4 years of B.Tech...)"
                  className="px-3 py-2 w-full text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100 resize-none"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AchievementsForm;
