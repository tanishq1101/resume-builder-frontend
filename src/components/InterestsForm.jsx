import React from 'react';
import { Plus, Trash2, Heart } from 'lucide-react';

const InterestsForm = ({ data = [], onChange }) => {
  const addInterest = () => {
    const newInterest = {
      name: "",
      description: ""
    };
    onChange([...data, newInterest]);
  };

  const removeInterest = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateInterest = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Heart className="size-5 text-indigo-600 dark:text-indigo-400" />
            Interests & Hobbies
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add personal interests or research areas</p>
        </div>
        <button
          onClick={addInterest}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Interest
        </button>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
            <Heart className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No interests added yet.</p>
            <p className="text-xs text-gray-400">Click "Add Interest" to list subjects you are passionate about, like AI, Open Source, etc.</p>
          </div>
        ) : (
          data.map((interest, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Interest #{index + 1}</h4>
                <button
                  onClick={() => removeInterest(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  value={interest.name || ""}
                  onChange={(e) => updateInterest(index, "name", e.target.value)}
                  type="text"
                  placeholder="Interest Name (e.g. Open Source, Artificial Intelligence)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-100"
                />

                <textarea
                  rows={2}
                  value={interest.description || ""}
                  onChange={(e) => updateInterest(index, "description", e.target.value)}
                  placeholder="Brief description (e.g. Enjoy contributing to open-source libraries and projects...)"
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

export default InterestsForm;
